// Objects are defined using name:value pairs

var car1 = {type:"Fiat", model:"500", color:"white"};
var car2 = {type:"Mercedes", model:"200SLC", color:"red"};

console.log(car2);  // Will not print a pointer but the actual obj.


// can access propeties using the usual . notation
console.log(car2.type);
console.log(car1["type"]);  // very goofy dont use

console.log(car1==car2);

// Object methods can use the this. function
// to refer to themselves

var car2 = {
  type: 'Mercedes',
  model: '200SLC',
  color: 'red',
  fullName: function () {
    return this.type + ' ' + this.model;
  }
}

console.log(car2.fullName()); // will call the function.



