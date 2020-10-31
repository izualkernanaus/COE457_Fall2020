var http = require('http');

// server has a call back function 

// request, response 

// req has the http request from the browsser
// response has the respnse you will send back
// takes care of headers etc. 

http.createServer(function(req, res) {

    console.log(req);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("<i>Hi -- This is much much better than using raw sockets!<i>");
}).listen(5678);
console.log('Server started on localhost:5678; press Ctrl-C to terminate....');