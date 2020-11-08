var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();

// speficy the port to listen to. 
app.set('port', process.env.PORT || 1234);

// use the cookieParser middleware
app.use(cookieParser());

app.get('/', function(req, res){
   res.cookie('beef', "pepper");
   res.cookie('cheese', 'burrata').send('<html> <p> cheese cookie </p> </html>'); //Sets name = express
});

// launch 

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
