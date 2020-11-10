var myPromise = new Promise( ( resolve, reject ) => {
    
    // create a random number 

    rand = Math.floor(Math.random()*10);
    if(rand%2==0){
        resolve(rand); // even resolve with the ansser and NOT return 
    } else {
        reject(-1);  // reject NOT return
    }
  } );
  

  myPromise
  .then(function(x)  { console.log("Good one mate!"+x)}) // norrmal return or resolve
  .catch(function(x) { console.log("Something went wrong with "+x)} )  // error condition reject