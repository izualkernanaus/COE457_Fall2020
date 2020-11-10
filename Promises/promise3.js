function timeout(time) {
    
    let p = new Promise((resolve, reject) => {
        
        // setup a timer -- has a call-back. 
        setTimeout(() => {
            c_time = new Date().getTime();
            resolve(c_time);
        }, time);
    })

    //return promise
    return p;
};

// Note that promises DO NOT BLOCK the event queue.
timeout(3000).then(function (x) { console.log("Timer Expired:"+x) });  // nothing happens
console.log("Now is:"+new Date().getTime());