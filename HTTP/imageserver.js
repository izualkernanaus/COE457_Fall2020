// simple HTTP server using TCP sockets

// cors fix in Express as well here: https://www.youtube.com/watch?v=Whgr8DKfs6U

var net = require('net');
var fs = require('fs');
var server = net.createServer(function (socket) {

    socket.on('data', function (data) {
        console.log('Received: ' + data);
        r = data.toString();

        // only cares about the first 100 because image.html may be 
        // repeated as a referrer 
        
        r = r.substring(0, 100);

        // handle favicon 
        if (r.includes('favicon.ico')) {
            console.log("favicon was asked for");
            socket.write("HTTP/1.1 200 OK\n");
            fs.readFile('yoda.ico', function (err, contents) {
                if (err) {
                    console.log(err.message);
                }
                else {
                    console.log("sending icon");
                    socket.write("Server: Imran/0.8.4\r\n");
                    socket.write("Content-Type': 'image/x-icon'\r\n");
                    socket.write("Content-Length:" + contents.length);
                    socket.write("\n\n"); // two carriage returns
                    socket.write(contents);
                    //socket.destroy();
                }
            })
        }
        else if (r.includes('image.html')) {
            console.log("image.html asked for");
            socket.write("HTTP/1.1 200 OK\n");
            fs.readFile('image.html', function (err, contents) {
                if (err) {
                    console.log(err.message);
                }
                else {
                    console.log("sending image.html");
                    socket.write("Server: Imran/0.8.4\r\n");
                    socket.write("Content-Type': 'text/html'\r\n");
                    socket.write("Content-Length:" + contents.length);
                    socket.write("\n\n"); // two carriage returns
                    socket.write(contents);
                    //socket.destroy();
                }
            })
        }
        else if (r.includes('image.js')) {
            console.log("image.js asked for");
            socket.write("HTTP/1.1 200 OK\n");
            fs.readFile('image.js', function (err, contents) {
                if (err) {
                    console.log(err.message);
                }
                else {
                    console.log("sending image.js");
                    socket.write("Server: Imran/0.8.4\r\n");
                    socket.write("Content-Type': 'text/javascript'\r\n");
                    socket.write("Content-Length:" + contents.length);
                    socket.write("\n\n"); // two carriage returns
                    socket.write(contents);
                    //socket.destroy();
                }
            })
        }
        else {
            
            console.log("else ............");

            console.log(r.substring(0, 3));

            if (r.substring(0, 3) == "GET") {
                // Server is not checking to make sure that the client 
                // actually sent a well-formed header.

                //socket.write("OK");
                socket.write("HTTP/1.1 200 OK\n");

                // remember to remove the utf8 from the readFile, 
                // otherwise this will not work. 

                fs.readFile('starwars.jpeg', function (err, contents) {
                    if (err) {
                        console.log(err.message);
                    }
                    else {
                        console.log("sending back starwars.jpeg");
                        socket.write("Server: Imran/0.8.4\r\n");
                        socket.write("Content-type:image/jpeg\r\n");
                        // socket.write("Access-Control-Allow-Origin: *\r\n");
                        // socket.write("Access-Control-Allow-Methods: GET, PUT, POST\r\n");
                        // socket.write("Access-Control-Allow-Headers : Origin, Content-Type, X-Requested-With, Accept\r\n");
                        socket.write("Content-Length:" + contents.length);
                        socket.write("\n\n"); // two carriage returns
                        socket.write(contents);
                        //socket.destroy();
                    }
                })
            }
        }
    }
    );

    socket.on('close', function () {
        console.log('Connection closed');
    });
    socket.on('end', function () {
        console.log('client disconnected');
    });

    socket.on('error', function () {
        console.log('client disconnected');
    });
});
server.listen(1234, function () {
    console.log('server is listening on port 1234');
});
