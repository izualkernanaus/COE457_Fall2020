var express = require('express');
var app = express();
app.set('port', process.env.PORT || 1234);

app.get('/', function(req, res) {
    res.set('Content-Type', 'text/plain');
    var s = '';
    for (var name in req.headers)
        s += name + ': ' + req.headers[name] + '\n';
    res.send(s);
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});