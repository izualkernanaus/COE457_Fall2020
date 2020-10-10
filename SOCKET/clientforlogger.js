var net = require('net');
var client = new net.Socket();
// add your phone's IP and port
client.connect(2000, '192.168.0.178', function() {
	console.log("connected to the logger");
});
// call backs to process events
// -- when receiving data
client.on('data', function(data) {
    try{
      //data is actually a buffer
      console.log('Received: ' + data);
    } catch(err){
        console.log(err.message);
    }
});
// -- when closing connection
client.on('close', function() {
	console.log('Connection closed');
});