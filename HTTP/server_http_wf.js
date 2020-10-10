// simple HTTP server using TCP sockets
var net = require('net');
var fs = require('fs');
var server = net.createServer(function(socket) {
    
    socket.on('data', function(data) {
        console.log('Received: ' + data);
        r = data.toString();
        console.log(r.substring(0,3));
        
        if(r.substring(0,3)=="GET"){
            // Server is not checking to make sure that the client 
            // actually sent a well-formed header.

            //socket.write("OK");
            socket.write("HTTP/1.1 200 OK\n");
            
            // this is what a proxy will do. 
            // not clean it / filter it -
            // then do another socket to the acutal server
            // result back from teh actual server 
            // send it back to the cline

            fs.readFile('index.html', 'utf8', function(err, contents) {
                console.log(contents);
                socket.write("Content-Length:"+contents.length);
                socket.write("\n\n"); // two carriage returns
                socket.write(contents);
            })
            
        };
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
});
server.listen(8080, function() { 
    console.log('server is listening on port 8080');
});
