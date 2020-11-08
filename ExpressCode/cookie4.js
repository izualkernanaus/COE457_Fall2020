var cookieParser = require('cookie-parser');
var express = require('express');

// need this module for session cookies 
var session = require('express-session');
var app = express();

// how we setup our seesion library -- just once 
app.use(session({
    name : 'goofycookie',
    secret : 'we all love coe457',
    resave :true, // have to do with saving session under various conditions
    saveUninitialized: true, // just leave them as is
    cookie : {
            maxAge:(1000 * 60 * 100)
    }      
}));
// need this to grab images etc. 
app.use(express.static(__dirname + '/public'));
// speficy the port to listen to. 
app.set('port', process.env.PORT || 1234);
app.use(cookieParser());

app.get('/', function(req, res){

    // subsequent time when page_views are NOT defined.

    if(req.session.page_views){
       req.session.page_views++;
       res.send("You visited this page " + req.session.page_views + " times");
    } else {

    // first HTTP when page_views is not defined. 
       req.session.page_views = 1;
       res.send("Welcome to this page for the first time!");
    }
 });


// launch 
app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
