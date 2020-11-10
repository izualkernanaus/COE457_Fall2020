function even_rand(){
    
    // put promise inside the function
    myPromise = new Promise( ( resolve, reject ) => {
        rand = Math.floor(Math.random()*10);
        if(rand%2==0){
            resolve(rand);
        } else {
            reject(-1);
        }
    } );
  
// important -- return the Promise 

  return myPromise;
}

// event_rand returns a promise 

  even_rand()
  .then(function(x)  { console.log("Good one mate!"+x)}) // x is what resolved returned
  .catch(function(x) { console.log("Something went wrong with "+x)} ) // x is what reject returned
  