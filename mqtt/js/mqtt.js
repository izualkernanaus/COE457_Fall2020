
//var wsbroker = "localhost";  //mqtt websocket enabled broker
// var wsport = 9001 // port for above
var wsbroker = "broker.hivemq.com";  //mqtt websocket enabled broker
var wsport = 8000 // port for above
// create client using the Paho library
var client = new Paho.MQTT.Client(wsbroker, wsport,
    "myclientid_" + parseInt(Math.random() * 100, 10));
    client.onConnectionLost = function (responseObject) {
    console.log("connection lost: " + responseObject.errorMessage);
};
client.onMessageArrived = function (message) {
    console.log(message.destinationName, ' -- ', message.payloadString);
};
var options = {
    timeout: 3,
    onSuccess: function () {
        console.log("mqtt connected");
        // Connection succeeded; subscribe to our topic, you can add multile lines of these
        client.subscribe("coe457/hello", { qos: 1 });

        //use the below if you want to publish to a topic on connect
        message = new Paho.MQTT.Message("Hello from the browser");
        message.destinationName = "coe457/hello";
        client.send(message);

    },
    onFailure: function (message) {
        console.log("Connection failed: " + message.errorMessage);
    }
};

function init() {
    client.connect(options);
}
