function inc(x) {
    p = new Promise((resolve, reject) => {
        resolve(x + 1);
    });
    return p;
}


inc(10)
.then(function(x){console.log(x);
    return inc(x)})
.then(function(x){console.log(x)})  
.then(function(x){console.log(x)})