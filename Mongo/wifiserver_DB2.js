const si = require('systeminformation');

function get_wifi(){
    return new Promise(function(resolve, reject){
       
        si.wifiNetworks(function(data){
            
            wifi=new Array();
            ssid_tmp = new Array(); // to fix a bug in library
            
            for(var i = 0; i< data.length; i++){
                // fix bug when some ssids show up twice
                if(!ssid_tmp.includes(data[i].ssid)){
                ssid = data[i].ssid;
                ssid_tmp[i] = ssid; // to fix the bug of multiple ssids
                quality = data[i].quality;
                wifi[i] ={"date":new Date(),"ssid":ssid, "quality":quality};
                }
            };
            // remove all the null elements which occurred due to fixign teh bug
            var wifi = wifi.filter(function (el) {
                return el != null;
            });
            resolve(wifi);
        });
    })
}

// add the database 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wifi', { useNewUrlParser: true, useUnifiedTopology: true });
// we create a scheme first 
const wifiSchema = new mongoose.Schema({
    date: Date,
    ssid: String,
    quality: Number
})

// we create a collection called WifiQ with the wifiSchema
const WifiQuality = mongoose.model("WifiQ", wifiSchema);

var express = require('express');
const e = require('express');
var app = express();
app.set('port', process.env.PORT || 5555);
app.use(express.static(__dirname + '/public'));

// grabing the data in real time and saving it to the DB

app.get('/', function(req, res) {
    res.type('application/json');
    get_wifi().then(function(msg){    
        // save each to the DB
        msg.forEach(function(el) {
            console.log(el);
            new WifiQuality({
            date: el.date,
            ssid: el.ssid,
            quality: el.quality
            }).save()
        });
        //send back the response
        res.send(msg)});
});


// using route paramters 
app.get('/past/:time_min', function(req, res) {
        res.type('application/json'); 
        
        // localhost:/past/60
        // time_min (60 minutes) it will show up in 
        // req.params.time_min

        time_ms = req.params.time_min*60000; // in milli-seconds. 

        // now 
        now = new Date();

        // how far was 60 minutes from now 

        past = now - time_ms;
        console.log(past);

        // grab all the wifi/qualituy pair where 
        // date >= past

        WifiQuality.find({date: {$gte: past}},function(err, result){
            if(err){
                console.log("error + "+err);
                res.status(404).send("nothing found");
            } else {
                console.log(result);
                res.send(result);
            }
        });
      
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});