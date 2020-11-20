var express = require('express');
var app = express();
app.set('port', process.env.PORT || 1234);

// must use the static middleware otherwises forms will not work. 
// because it does not know where to serve the html file for 
// the form. 

app.use(express.static(__dirname));

// specify the actual route
// process_get to process the get.html input
app.get('/', function(req, res) {

    response = req.query.hello;

    // res.send(JSON.stringify(response));
    res.send(response);

})

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});