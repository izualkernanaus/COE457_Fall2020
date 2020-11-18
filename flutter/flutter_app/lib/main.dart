import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'COE 457 Flutter Demo',
      theme: ThemeData(
          brightness: Brightness.dark,
          visualDensity: VisualDensity(vertical: 0.5, horizontal: 0.5),
          primarySwatch: MaterialColor(
            0xFFF5E0C3,
            <int, Color>{
              50: Color(0x1a5D4524),
              100: Color(0xa15D4524),
              200: Color(0xaa5D4524),
              300: Color(0xaf5D4524),
              400: Color(0x1a483112),
              500: Color(0xa1483112),
              600: Color(0xaa483112),
              700: Color(0xff483112),
              800: Color(0xaf2F1E06),
              900: Color(0xff2F1E06)
            },
          ),
          primaryColor: Color(0xff5D4524),
          primaryColorBrightness: Brightness.dark,
          primaryColorLight: Color(0x1a311F06),
          primaryColorDark: Color(0xff936F3E),
          canvasColor: Color(0xffE09E45),
          accentColor: Color(0xff457BE0),
          accentColorBrightness: Brightness.dark,
          scaffoldBackgroundColor: Color(0xffB5BFD3),
          bottomAppBarColor: Color(0xff6D42CE),
          cardColor: Color(0xaa311F06),
          dividerColor: Color(0x1f6D42CE),
          focusColor: Color(0x1a311F06)),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  //MyHomePage({Key key, this.title}) : super(key: key);
  //String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
      print(_counter);
    });
  }
  void _decrementCounter() {
    setState(() {
      _counter--;
      print(_counter);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
            Row(
                 mainAxisAlignment: MainAxisAlignment.center, //Center Row contents horizontally,
                // crossAxisAlignment: CrossAxisAlignment.center, //Center Row contents vertically,
                children: <Widget>[
                  RaisedButton(
                    onPressed: _incrementCounter,
                    child: const Text('Increment', style: TextStyle(fontSize: 20)),
                  ),
                  Text(
                    '    ',
                  ),
                  RaisedButton(
                    onPressed: _decrementCounter,
                    child: const Text('Decrement', style: TextStyle(fontSize: 20)),
                  )
                ]),
            RaisedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => SecondPage()),
                );
              },
              child: const Text('Go to Second Page', style: TextStyle(fontSize: 20)),
              ),
            RaisedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => ThirdPage()),
                );
              },
              child: const Text('Go to Third Page', style: TextStyle(fontSize: 20)),
            ),
          ],
        ),
      ),
      appBar: AppBar(
        title: Text("Home Page"),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
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