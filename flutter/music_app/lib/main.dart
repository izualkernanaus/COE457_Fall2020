import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:io';
import 'dart:convert';
import 'package:mqtt_client/mqtt_client.dart';
import 'package:mqtt_client/mqtt_server_client.dart';
import 'mqtt.dart';

// audio
import 'dart:async';
import 'package:assets_audio_player/assets_audio_player.dart';
import 'package:flutter/material.dart';
import 'package:rxdart/subjects.dart';


void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Music App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key}) : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  var _get_result = {};
  var _get_titles = '';
  var _title = 'none';
  var _picurl =
      'https://images.unsplash.com/photo-1547721064-da6cfb341d50?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80';
  var _musicurl = '';

  // music state
  final audios = <Audio>[
  Audio.network(
    "https://d14nt81hc5bide.cloudfront.net/U7ZRzzHfk8pvmW28sziKKPzK",
    metas: Metas(
      id: "Invalid",
     title: "Invalid",
     artist: "Florent Champigny",
     album: "OnlineAlbum",
     image: MetasImage.network(
         "https://image.shutterstock.com/image-vector/pop-music-text-art-colorful-600w-515538502.jpg"),
    ),
  ),];

  MQTTClient cl;

  void setUpMQTT() async {
    // create an MQTT client.
    cl = new MQTTClient('localhost', '1883', null);
    await cl.connect();
  }

  AssetsAudioPlayer get _assetsAudioPlayer => AssetsAudioPlayer.withId("music");

  void initState() {
    super.initState();
    // initialize MQTT
    setUpMQTT();
  }

  void dispose() {
    _assetsAudioPlayer.dispose();
    print("dispose");
    super.dispose();
  }


  void _upate_get() async {
    http.Response _get = await http.get(
        "http://api.deezer.com/search/track/autocomplete?limit=10&q=eminem");
    //print(_get.statusCode);
    //print(_get.headers);
    // print(_get.body);
    _get_result = jsonDecode(_get.body);
    List l = _get_result['data'] as List;

    // play the music
    try {
      await _assetsAudioPlayer.open(
        Audio.liveStream(l[0]['preview']),
      );
    } catch (t) {
      print(t.toString());
    }

    setState(() {
      _get_titles = '';
      /* get the whole list
      for(var i = 0; i<l.length; i++){
        _get_titles = _get_titles+l[i]['title']+'\n';
      }
      */

      /* get the first one only and show the picture */
      _title = l[0]['title'];
      _get_titles = _title; // single title only
      _picurl = l[0]['album']['cover'];
      _musicurl = l[0]['preview'];

      // publish it please
      cl.publish('coe457/hello', _get_titles, null);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Music App'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Container(
                height: 200,
                child: SingleChildScrollView(child: Text(_get_titles))),
            Container(
              child: Image.network(
                _picurl,
                fit: BoxFit.cover,
                width: 200,
                height: 200,
              ),
            ),
            FlatButton(
              onPressed: () {
                _assetsAudioPlayer.play();

              },
              child: Text('Play'),
            ),
            FlatButton(
              onPressed: () {
                _assetsAudioPlayer.pause();
              },
              child: Text('Pause'),
            ),
              FlatButton(
                onPressed: () {
                  _upate_get();
                },
                child: Text('Grab Track'),
              ),
        ],
        ),
      ),
    );
  }
}
