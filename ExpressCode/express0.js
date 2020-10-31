// use the express module 

var express = require('express');

// create an app 
var app = express();

// speficy the port to listen to. 
app.set('port', process.env.PORT || 1234);


// launch 

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});