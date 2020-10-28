var express = require('express');
var app = express();
app.set('port', process.env.PORT || 1234);

var fortune = require('./fort_module');

app.get('/', function(req, res) {
    res.type('text/plain');
    console.log(fortune.getFortune());
    res.send(fortune.getFortune());
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});