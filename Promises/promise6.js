function inc(x) {
    p = new Promise((resolve, reject) => {
        resolve(x + 1);
    });
    return p;
}
/* can use either return or create a new promise to propagage 
/* the values through a chain */
inc(10)
    .then(function (x) {
        console.log(x);
        return x;
    })
    .then(function (x) {
        console.log(x);
        return x;
    })  // x is used up so cannot propagate.
    .then(function (x) { console.log(x) })
