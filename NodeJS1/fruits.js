//Adding and deleting elements from arrays
//Please note that fruits is a pointer. 

var fruits = ["Banana", "Orange", "Apple", "Mango"];

// adds a new element (Lemon) to end of fruits

// push will add to the end
fruits.push("Lemon");    
console.log(fruits);

// pop will remove from the end
element = fruits.pop();
console.log(element);
console.log(fruits);

fruits[8] = "Grapes";    // be careful what you wish for.
console.log(fruits);     // now we have holes in the array

// using delete can make existing ones holes
// does not REMOVE the position only the element
delete fruits[0];           
console.log(fruits);

// splice will remove holes and anything else
// from where to start splicing (0), how many to splice (1)
// splice == item and position
fruits.splice(0,2);
console.log(fruits);

// splice can start at any index
fruits.splice(4,3);
console.log(fruits); // all the holes are gone.


// restart
fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits);
console.log(fruits.reverse());
console.log(fruits.sort());
