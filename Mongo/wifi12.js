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

const wifid1 = new WifiQuality({
    date: new Date(),
    ssid: "mamma",
    quality: 78.2
})

wifid1.save();