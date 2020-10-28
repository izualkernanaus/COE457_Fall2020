var express = require('express');
var app = express();
app.set('port', process.env.PORT || 1234);

app.use(express.static(__dirname));


app.get('/', function(req, res) {
    res.send('<ul>' +
        '<li>Download <a href="data.csv">data</a></li>' +
        '</ul>');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});