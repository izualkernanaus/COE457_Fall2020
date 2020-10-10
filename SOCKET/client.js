var net = require('net');

var client = new net.Socket();
client.connect(1337, '127.0.0.1', function() {
	client.write('Hello from the the other side ..');
});

// call backs to process events
// -- when receiving data
client.on('data', function(data) {
    try{
      console.log('Received: ' + data);
    } catch(err){
        console.log(err.message);
    }
	  client.destroy(); // kill client after server's response
});

// -- when closing connection
client.on('close', function() {
	console.log('Connection closed');
});