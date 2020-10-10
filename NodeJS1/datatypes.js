// Javascript has three common type of variables
// Numbers/Strings/Arrays and Objects
// kind of typeless - we dont say int

length = 16;                               // Number
var lastName = "Johnson";                      // String
var x = {firstName:"John", lastName:"Doe"};    // Object
cat = {weight: 10, color:"white"};  // created 
var cars = ["Saab", "Volvo", "BMW"];

// Silly type conversion 

length = length+lastName;  // length == 16Johnson
console.log(length);
length++;                     // note that there is no error
console.log(length);
// what is NaN -- means not a number 

// Objects kind of look like objects

console.log(x.firstName);
console.log(cat.color);

// Booleans return True or False
// Bo0leans are like C++ (Not like Java)
var x = 5;
var y = 5;
var z = 6;
console.log((x == y));    // Returns true
console.log((x == z));
var flag = x ==x;
console.log(flag+1);  // internally a flag is '1'

// Arrays act like Arrays
console.log(cars[0]);
console.log(cars.length); // more on arrays later
