var os = require('os');
cpus = new Array();
cpustring = ""
function return_string(item){
    total = item.times.user+item.times.nice+item.times.sys+item.times.idle+item.times.irq;
    var idle = (item.times.idle/total)*100
    cpustring = cpustring + idle.toString()
}
os.cpus().forEach(return_string); 
console.log(cpustring)
    

