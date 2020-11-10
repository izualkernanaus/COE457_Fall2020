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
app.set('port', process.env.PORT || 1234);
app.use(express.static(__dirname + '/public'));

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

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});