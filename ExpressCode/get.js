var express = require('express');
var app = express();
app.set('port', process.env.PORT || 1234);

// must use the static middleware otherwises forms will not work. 
// because it does not know where to serve the html file for 
// the form. 

app.use(express.static(__dirname));

// specify the actual route
// process_get to process the get.html input
app.get('/process_get', function(req, res) {

    // GET /process_get?first_name="tarzan"&last_name="jane"
    // how to grab first_name and last_name 
    // Prepare output in JSON format

    // for GET we will use req.query  object has all the
    // variables I need 


    // rsposne is a JSON file 

    /*
    response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    */


    // if you want html to show up corerectly -- more than likely
    // you need to send at least the <html> surrounding tags
    
    response = { resp: '<html><i>'+req.query.comments+ '</i></html>'};
    console.log(response);

    // convert the JSON object response to a STRING
    // send it back

    // res.send(JSON.stringify(response));
    res.send(response);

})

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});