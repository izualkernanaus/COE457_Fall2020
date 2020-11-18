import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
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

  void _upate_get() async {
    http.Response _get = await http.get(
        "http://api.deezer.com/search/track/autocomplete?limit=10&q=eminem");
    //print(_get.statusCode);
    //print(_get.headers);
    // print(_get.body);

    setState(() {
      _get_result = json.decode(_get.body);
      List l = _get_result['data'] as List;
      _get_titles = '';
      for(var i = 0; i<l.length; i++){
        _get_titles = _get_titles+l[i]['title']+'\n';
      }
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
                child:
                    SingleChildScrollView(child: Text(_get_titles))),
            FlatButton(
              onPressed: () {
                _upate_get();
              },
              child: Text('press me'),
            ),
          ],
        ),
      ),
    );
  }
}
