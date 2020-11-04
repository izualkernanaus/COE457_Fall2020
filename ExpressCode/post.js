var express = require('express');
var app = express();
app.set('port', process.env.PORT || 1234);

// still need the static to serve the html
app.use(express.static(__dirname));

// need the middleware to parse HTTP header 
// to extract parameters from the nody of the HTTP 
// request.

var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// process_get to process the post.html input
// pass the route process_post through the urlencodedParser
// first and then give me the req, res  object

app.post('/process_post', urlencodedParser, function(req, res) {

    // unlike GET, where we used the query to extract variables
    // now we will body 
    
    // Prepare output in JSON format
    var response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };
    console.log(response);
    res.send(JSON.stringify(response));
})

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});