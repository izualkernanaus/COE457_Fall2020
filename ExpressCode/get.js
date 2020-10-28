var express = require('express');
var app = express();
app.set('port', process.env.PORT || 1234);

app.use(express.static(__dirname));

// process_get to process the get.html input
app.get('/process_get', function(req, res) {

    // Prepare output in JSON format
    response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});