// simple socket server using TCP sockets
// load the 'net' module/library
var net = require('net');

// create a server with a call-back function
// this function is called when a client 
// request to form a connection. 
// socket is the socket between the client 
// and the server. 
var server = net.createServer(function(socket) {
	socket.write('Hello from the server\r\n');

	// just echo back
	socket.pipe(socket);
});
// IP and PORT
server.listen(1337, '127.0.0.1');