app.get('/', function(req, res) {
    //I want to acccess 'req' and get info whether it's an AJAX call
    if (req.xhr) {
        //the request is ajax call
    }
})