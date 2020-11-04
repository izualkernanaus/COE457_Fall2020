var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();

// speficy the port to listen to. 
app.set('port', process.env.PORT || 1234);
app.use(cookieParser());

app.get('/', function(req, res){
   res.cookie('cheese', 'burrata').send('cookie set'); //Sets name = express
});

// launch 

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
