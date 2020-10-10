// a number of nice functions for numbers

var x = 123;
console.log(typeof x);

y = x.toString();          //convert to string "123"
console.log(y.indexOf("3")); //is it really a string?

// or we can check the type
// kind of alike instanceof in Java
console.log(typeof y);

// converting forms
// faking type conversion 
var x = 9.656;
console.log(x.toExponential(2));
console.log(x.toFixed(2));

// Number is a nice function that converts things into 
// numbers

console.log(Number(true));          // returns 1
console.log(Number(false));         // returns 0
console.log(Number("10"));          // returns 10
console.log(Number("  10"));        // returns 10

// Similar function
console.log(parseInt("10"));         // returns 10
console.log(parseFloat("10.33"));     // returns 10.33

// NaN is special meaning not a number
var x = Number.NaN;
console.log(x);
console.log(10/"grand ma");
