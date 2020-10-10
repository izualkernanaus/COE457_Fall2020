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
      //convert data to a JSON object
      // convert from buffer to string 
      // and then from string to Javascript OBJECT
      // because we want to be able to do .
      
      acc = JSON.parse(data.toString());
      console.log(acc.accelerometerAccelerationX);
    } catch(err){
        console.log(err.message);
    }
});
// -- when closing connection
client.on('close', function() {
	console.log('Connection closed');
});