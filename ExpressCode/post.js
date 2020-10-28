var express = require('express');
var app = express();
app.set('port', process.env.PORT || 1234);

app.use(express.static(__dirname));

var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// process_get to process the post.html input
app.post('/process_post', urlencodedParser, function(req, res) {

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