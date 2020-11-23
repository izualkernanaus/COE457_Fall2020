var express = require('express');
const e = require('express');
var app = express();
app.set('port', process.env.PORT || 1234);
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
