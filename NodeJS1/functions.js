
// functions are defined as any other language
// note that functions are not TYPED

function add(p1, p2) {
    return p1 * p2;   // The function returns the product of p1 and p2
  }

console.log(add(2, 3));

// Lexically usual rules for scoping apply 
function cars() {
    var carName = "Volvo";
    // code here CAN use carName
  }

console.log(cars.carName);  // cannot access this from outside





