var http = require('http');

http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Hi -- This is much much better than using raw sockets!");
}).listen(5678);
console.log('Server started on localhost:5678; press Ctrl-C to terminate....');