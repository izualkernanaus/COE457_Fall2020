var express = require('express');
var app = express();
app.set('port', process.env.PORT || 1234);

app.get('/', function(req, res) {
    res.type('application/json');
    res.status(200).json({ "AUS": "Happy Place" });
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});