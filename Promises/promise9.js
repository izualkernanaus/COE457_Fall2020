function inc(x) {
    p = new Promise((resolve, reject) => {
        resolve(x + 1);
    });
    return p;
}


function inc_twice(x){
    p = inc(x);

    // conceptuall these are parallel
    p.then(console.log(x));
    p.then(console.log(x+1));
    p.then(console.log(x+2));
}

inc_twice(10);

