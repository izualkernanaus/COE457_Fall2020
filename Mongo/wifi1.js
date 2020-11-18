// need the mongoose module
const mongoose = require('mongoose');

// localhost:27017 is where mongo servixe is running 
// wifi is the name of the database 
// if not there, it will create it
// ow. it will open the data base

mongoose.connect('mongodb://localhost:27017/wifi1', {useNewUrlParser: true, useUnifiedTopology: true});

// we create a scheme first 
const wifiSchema = new mongoose.Schema({
    date: Date,
    ssid: String,
    quality: Number
})

// we create a collection called WifiQ with the wifiSchema
const WifiQuality = mongoose.model("WifiQ",wifiSchema);

// create an instance of a document 
const wifid1 = new WifiQuality({
    date: new Date(),
    ssid: "mamma",
    quality: 78.2
})

wifid1.save();