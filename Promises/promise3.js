function timeout(time) {
    
    // promiise do do something in the future (Futures)

    let p = new Promise((resolve, reject) => {
        
        // setup a timer -- has a call-back. 
        setTimeout(() => {
            c_time = new Date().getTime();
            resolve(c_time); // like return with the correct value.
        }, time);
    })

    //return promise -- the value of c_time is embedded in the promise. 
    return p;
};

// Note that promises DO NOT BLOCK the event queue.
// x gets bound to whatever wat resolved (c_time)
timeout(3000).then(function (x) { console.log("Timer Expired:"+x) });  // nothing happens
console.log("Now is:"+new Date().getTime());