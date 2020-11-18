const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wifi1', { useNewUrlParser: true, useUnifiedTopology: true });
// we create a scheme first 
const wifiSchema = new mongoose.Schema({
    date: Date,
    ssid: String,
    quality: Number
})

// we create a collection called WifiQ with the wifiSchema
const WifiQuality = mongoose.model("WifiQ", wifiSchema);

WifiQuality.updateOne({ _id: "5fab9bc465994fe8eb17b695" }, { quality: -100 },
    function (err) {
        if (err) {
            console.log("error  reading wifi q's");
        } else {
            console.log("updated successfully");
        }
    }
)
