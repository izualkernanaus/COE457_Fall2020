var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();

// need this to grab images etc. 
app.use(express.static(__dirname + '/public'));
// speficy the port to listen to. 
app.set('port', process.env.PORT || 1234);
app.use(cookieParser());

app.get('/echo_cookies', function(req, res){
    res.send(req.cookies)
 });

// launch 
app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
