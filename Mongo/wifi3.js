const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wifi', {useNewUrlParser: true, useUnifiedTopology: true});

// we create a scheme first 
const wifiSchema = new mongoose.Schema({
    date: Date,
    ssid: String,
    quality: Number
})

// we create a collection called WifiQ with the wifiSchema
const WifiQuality = mongoose.model("WifiQ",wifiSchema);

WifiQuality.find(function(err, wifiqs)
    {
        if(err){
            console.log("error  reading wifi q's");
        } else
        {
            wifiqs.forEach(function(element){
                console.log(element._id);
            });
        }

    }
)
