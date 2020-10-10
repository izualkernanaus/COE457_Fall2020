// can do either

// Similar to Java/C++ except brackets are 
// different. 

var cars1 = new Array("Saab", "Volvo", "BMW");
var cars2 = ["Saab", "Volvo", "BMW"];

console.log(cars1[0]);
console.log(cars2[1]);

// Arrays are heterogeneous and can hold anything.
// Different than C++
// Somewhat similar to Java but different 

// Untyped -- so array of anything

strange = new Array();  // must be allocated first
strange[0] = 10;
// lambda funciton -- unnamed function
strange[1] = function add(x, y) {return x+y;};
// or could be an object
strange[2] = {x: 10, y:20};

console.log(strange);
console.log(strange[1](2, 3)); // impress your friends

// There is no such thing as multi-dim arrays
// Really we have arrays of arrays
// Here we have an array of three arrays


differentsize = new Array();  // must be allocated first
differentsize[0]=2;
differentsize[1]=3;

strangers = [strange, differentsize, strange];
console.log(strangers[0][1](3,5));
console.log(strangers);

// can have objects and functions inside arrays
function add1(x) { return ++x;};

// we can combine things infinitely until 
// our finges are sore.

strange[3] = {first: "hello", second: ["kitty", add1]};
console.log(strange[3].second[1](10));

//Adding and deleting elements from arrays
var fruits = ["Banana", "Orange", "Apple", "Mango"];

// adds a new element (Lemon) to end of fruits
fruits.push("Lemon");    
console.log(fruits);

fruits[8] = "Grapes";    // be careful what you wish for.
console.log(fruits);     // now we have holes in the array

// removing elements from an array 
// https://love2dev.com/blog/javascript-remove-from-array/

// using delete can make existing ones holes
delete fruits[0];           
console.log(fruits);

// splice will remove holes and anything else
fruits.splice(0,1);
console.log(fruits);

fruits.splice(4,3);
console.log(fruits); // all the holes are gone. 

// Pop will remove the last element (kind of inverse of push)
fruits.pop();
console.log(fruits); 


// We will cover map/reduce later in the Semester.
