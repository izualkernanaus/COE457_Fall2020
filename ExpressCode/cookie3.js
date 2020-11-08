var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();

// need this to grab images etc. 
app.use(express.static(__dirname + '/public'));
// speficy the port to listen to. 
app.set('port', process.env.PORT || 1234);
app.use(cookieParser());

app.get('/', function(req, res){
   // expire the cookie in 15 seconds
   res.cookie('cheese', 'burrata').send('cookie set'); //Sets name = express
});

app.get('/no_cheese', function(req, res){
   // telling the browser to clear the cookie with name = cheese
   res.clearCookie('cheese');
   res.send('<html><hr>no more cheese for you my friend<hr><img src="img/burrata.jpg"></html>');   
 });

// launch 
app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
