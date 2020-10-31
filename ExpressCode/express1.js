// use the express module 

var express = require('express');

// create an app 
var app = express();

app.get('/', function(req, res) {
    res.type('text/plain');
    res.send('This is the response to nothing and nothing');
});


app.get('/about', function(req, res) {
    res.type('text/plain');
    res.send('This is the response to about');
});

// custom 404 page 
app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - I do not understand what you mean');
});

// custom 500 page 
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

// speficy the port to listen to. 
app.set('port', process.env.PORT || 1234);


// launch 

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});