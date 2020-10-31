// simple HTTP server using TCP sockets
var net = require('net');
var fs = require('fs');
var os = require('os');

// return a number with precision
function precise(x) {
    return Number.parseFloat(x).toPrecision(6);
}

cpus = new Array();
cpustring = ""
function return_string(item){
    total = item.times.user+item.times.nice+item.times.sys+item.times.idle+item.times.irq;
    var idle = (item.times.idle/total)*100;
    cpustring = cpustring +"<li>" + precise(idle)+ "%</li>";
}

var server = net.createServer(function(socket) {
    
    socket.on('data', function(data) {
        r = data.toString();
        console.log(r);
        // find the get
        getpos = r.indexOf("GET");
        get = r.slice(getpos,getpos+3);
        console.log("GET=",get);
        if(get=="GET"){
            console.log("first GET");
            socket.write("HTTP/1.1 200 OK\n");

            // grab the cpus the answer is in cpustring
            cpustring = "";
            os.cpus().forEach(return_string);
            contents = "<html><body><ol><div style='color: #6a097d; text-align: center;font-family: Arial; background-color: #f1d4d4; margin:33%; border-style: solid;'><p style='color:#c060a1'>CPU % IDLE</p>";
            contents = contents + cpustring;
            contents = contents+"<ol></body></html>"
        
            socket.write("Content-Length:"+contents.length);
            socket.write("\n\n"); // two carriage returns
            socket.write(contents); 
        }
        else{
            console.log("else else else");
            socket.write("HTTP/1.1 200 OK\n");
            socket.write("\n\n");
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
server.listen(1234, function() { 
    console.log('server is listening on port 1234');
});
