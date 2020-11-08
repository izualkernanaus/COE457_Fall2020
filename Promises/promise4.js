function inc(x) {
    p = new Promise((resolve, reject) => {
        resolve(x + 1);
    });
    return p;
}

inc(10).then(function(x){console.log(x)})
inc(10).then().then().then(function(x){console.log(x)})