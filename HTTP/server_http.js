// simple HTTP server using TCP sockets

var net = require('net');
var server = net.createServer(function(socket) {
    
    socket.on('data', function(data) {
        console.log('Received: ' + data);
        r = data.toString();
        console.log(r.substring(0,3));
        if(r.substring(0,3)=="GET") socket.write("OK");
    });
    
    socket.on('close', function() {
        console.log('Connection closed');
    });

    socket.on('end', function() {
        console.log('client disconnected');
     });

    socket.on('error', function() {
        console.log('client disconnected');
     });

    // for echoing back if you need to debug.
	// socket.pipe(socket);
});
server.listen(8080, function() { 
    console.log('server is listening on port 8080');
});