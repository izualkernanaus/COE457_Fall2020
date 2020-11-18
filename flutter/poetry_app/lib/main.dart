import 'dart:math';
import 'package:flutter/material.dart';
import 'try.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Poetry App',
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  String currentVerse = '';
  Color _v_color = Colors.redAccent;
  Random r = Random();

  gVerses _verses = new gVerses();

  void nextVerse(){
    setState(() {
      currentVerse = _verses.nextVerse();
    });
  }

  // return a list of random colors
  final List<Color> colors = <Color>[Colors.red, Colors.blue,Colors.purpleAccent, Colors.lightBlueAccent];

  Color nextColor(){
    return colors[r.nextInt(colors.length)];
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Row(
                children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(15),
              child: Text('Khalil Gibran', style: TextStyle(fontStyle: FontStyle.italic, color: Colors.redAccent.withOpacity(0.6)),textAlign: TextAlign.center),
            ),
            GestureDetector(
              onTap: () {
                nextVerse();
              },
              onLongPress: (){
                setState(() {
                  _v_color = nextColor();
                });
              },
              child: Container(
              margin: EdgeInsets.fromLTRB(20, 20, 20, 20),
              width: 200,
              height: 200,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                image: DecorationImage(
                  // image: NetworkImage('https://i.pinimg.com/originals/f5/94/12/f59412c97043ebc9b18a0e8d1789123d.jpg'),
                  image: AssetImage('images/gibran.jpg'),
                ),
              ),
            ),
            )]),
          Row(
          children: <Widget>[
            Container(
              margin: EdgeInsets.fromLTRB(30, 10, 30, 10),
              width: 300,
              height: 150,
              child: Directionality(
                   textDirection: TextDirection.rtl,
                  child: Text('$currentVerse', style: TextStyle(fontStyle: FontStyle.italic, color: _v_color)),
              ),
            )]),
          ],
        ),
      ),
      appBar: AppBar(
        title: Text("Home Page"),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: (){},
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer
    );
  }
}

class SecondPage extends StatelessWidget {
  //SecondPage({Key key, this.title}) : super(key: key);
  //final String title;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Second Page'),
      ),
      body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            RaisedButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text('Go Back', style: TextStyle(fontSize: 20)),
            ),
            RaisedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => ThirdPage()),
                );
              },
              child: const Text(
                  'Go to Third Page', style: TextStyle(fontSize: 20)),
            ),
          ]),
    ); // Pop from stack
  }
}

class ThirdPage extends StatelessWidget {
  ThirdPage({Key key, this.title}) : super(key: key);
  final String title;
  @override
  Widget build (BuildContext context) {
    print(title);
    return  Scaffold(
        appBar:  AppBar(
          title: Text('Third Page'),
        ),
        body: RaisedButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) =>  MyHomePage()),
            );
          },
          child: const Text('Go Back', style: TextStyle(fontSize: 20)),
        )
    );// Pop from stack
  }
}