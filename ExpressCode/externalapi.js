// how to do a GET from inside Express
// coe457 -- Imran Zualkernan 2020
// using the https://www.npmjs.com/package/got module

require('express');
const got = require('got');

async function  url(){
    try{
    // please go to https://dev.elsevier.com/ to get an API key and try this query again
    const response = await got('https://api.elsevier.com/content/abstract/citation-count?doi=10.1016/S0014-5793(01)03313-0&httpAccept=text/html&apiKey=');
    return response.body;
    } catch(error){
        return error.response.body;
    }
}

const express = require('express')
const app = express()
const port = 2345

app.get('/', (req, res) => {  
 
// make a URL call to an external API. 
 url()
 .then(function(result){
      console.log(result);
      res.send(result)
  })
  .catch(function(result){
      console.log(result);
  });
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
