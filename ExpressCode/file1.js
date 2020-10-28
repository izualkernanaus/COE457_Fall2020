var express = require('express');
var app = express();
app.set('port', process.env.PORT || 1234);

app.get('/download', function(req, res) {
    var file = __dirname + '/data.csv';
    res.download(file); // Set disposition and send it.
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});