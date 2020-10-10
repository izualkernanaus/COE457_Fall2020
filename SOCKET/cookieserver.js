//Application server implmenting a chinese cookie protocol
var net = require('net');

// make up the cookies
quotes = new Array();
quotes[0]="Your future is whatever you make it";
quotes[1]="You will meet a strange person";
quotes[2]="Luck is on your side today";
quotes[3]="Do NOT go in there.";

var server = net.createServer(function(socket) {
    
    // use call-back to repsond to client.
    socket.on('data', function(data) {
        /* calculate a random index */
        index = Math.floor(Math.random() * quotes.length);
        socket.write(quotes[index]+"\n\n"); //send to client
        socket.destroy(); // close the socket
    });

});

server.listen(1337, '127.0.0.1');