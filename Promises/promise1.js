var myPromise = new Promise( ( resolve, reject ) => {
    rand = Math.floor(Math.random()*10);
    if(rand%2==0){
        resolve(rand);
    } else {
        reject(-1);
    }
  } );
  
  myPromise
  .then(function(x)  { console.log("Good one mate!"+x)})
  .catch(function(x) { console.log("Something went wrong with "+x)} )