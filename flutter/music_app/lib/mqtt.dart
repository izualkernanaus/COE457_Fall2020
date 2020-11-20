/// modified from https://github.com/shamblett/mqtt_client/blob/master/example/mqtt_server_client.dart
/// Imran Zualkernan, 2020
///
import 'dart:async';
import 'dart:io';
import 'package:mqtt_client/mqtt_client.dart';
import 'package:mqtt_client/mqtt_server_client.dart';

typedef onMsgType = void Function(String topic, String payload);

class MQTTClient {

  MqttServerClient client;
  String broker;
  String port;
  onMsgType onMessage;

  // non-default constructor
  MQTTClient(broker, port,onMsgType customFn) {
    print('trying to connect to broker'+broker);
    print('on port'+'port');
    this.port = port;
    this.broker = broker;
    if (customFn==null) {
      this.onMessage= (topic, payload) =>
      {
        print('default onMessage: '+topic+':'+payload)
      };
    } else this.onMessage = customFn;
  }

  /// The subscribed callback
  void onSubscribed(String topic) {
    print('Subscription confirmed for topic $topic');
  }

  /// The unsolicited disconnect callback
  void onDisconnected() {
    print('OnDisconnected client callback - Client disconnection');
    if (client.connectionStatus.disconnectionOrigin ==
        MqttDisconnectionOrigin.solicited) {
      print('EXAMPLE::OnDisconnected callback is solicited, this is correct');
    }
    exit(-1);
  }

  /// The successful connect callback
  void onConnected() {
    print('OnConnected client callback - Client connection was successful');
  }

  Future connect() async {
    client = MqttServerClient(broker, port);
    client.logging(on: false);
    client.keepAlivePeriod = 20;
    client.onDisconnected = onDisconnected;
    client.onConnected = onConnected;
    client.onSubscribed = onSubscribed;
    final connMess = MqttConnectMessage()
        .withClientIdentifier('Mqtt_MyClientUniqueId')
        .keepAliveFor(20) // Must agree with the keep alive set above or not set
        .withWillTopic('willtopic') // If you set this you must set a will message
        .withWillMessage('My Will message')
        .startClean() // Non persistent session for testing
        .withWillQos(MqttQos.atLeastOnce);
    print('client connecting....');
    client.connectionMessage = connMess;

    try {
      await client.connect();
    } on NoConnectionException catch (e) {
      // Raised by the client when connection fails.
      print('client exception - $e');
      client.disconnect();
    } on SocketException catch (e) {
      // Raised by the socket layer
      print('socket exception - $e');
      client.disconnect();
    }

    if (client.connectionStatus.state == MqttConnectionState.connected) {
      print('client connected');
    } else {
      print('ERROR client connection failed - disconnecting, status is ${client
              .connectionStatus}');
      client.disconnect();
      throw('client connection failed - disconnecting, status is ${client
          .connectionStatus}');
    }

    /// The client has a change notifier object(see the Observable class) which we then listen to to get
    /// notifications of published updates to each subscribed topic.
    client.updates.listen((List<MqttReceivedMessage<MqttMessage>> c) {
      final MqttPublishMessage recMess = c[0].payload;
      final pt =
      MqttPublishPayload.bytesToStringAsString(recMess.payload.message);
      //print('Change notification:: topic is <${c[0].topic}>, payload is <-- $pt -->');
      //print('');
      onMessage('${c[0].topic}','$pt');
    });
  }

  void disconnect() async {
    /// Wait for the unsubscribe message from the broker if you wish.
    await MqttUtilities.asyncSleep(2);
    print('Disconnecting ....');
    client.disconnect();
  }

  void subscribe(topic, Qos) {
    print('Subscribing to '+topic+' topic.');
    if (Qos == null) Qos = MqttQos.atMostOnce;
    client.subscribe(topic, Qos);
  }

  void unsubscribe(topic) {
    print('Unsubscribing from topic '+topic);
    client.unsubscribe(topic);
  }

  void publish(topic, payload, Qos) {
    final builder = MqttClientPayloadBuilder();
    builder.addString(payload);
    print('Publishing the topic '+topic+' with payload '+payload);
    if (Qos == null) Qos = MqttQos.exactlyOnce;
    client.publishMessage(topic, Qos, builder.payload);
  }

}

/* Sample Program to use the class */

void _onMessage(String topic, String payload){
  print('my own onMessage'+topic+':'+payload);
}
// Sample Program
void main() async {
  // MQTTClient cl = new MQTTClient('broker.mqttdashboard.com', '8000',_onMessage);
  MQTTClient cl = new MQTTClient('localhost', '1883',_onMessage);
  await cl.connect();

  // can specify Qos using
  // MqttQos.atLeastOnce
  // MqttQos.atMostOnce
  // MqttQos.exactlyOnce

  // topic and Qos
  cl.subscribe('coe457/hello', null);
  // topic, payload, and Qos
  cl.publish('coe457/hello','hello from flutter',null);
}

/* */
