var mqtt = require('mqtt')

// to connect using MQTT/WebSocketss use ws://ws://localhost:9001
// var client  = mqtt.connect('ws://localhost:9001')

// to connect directly using MQTT only -- use mqtt://localhost:1883
var client  = mqtt.connect('mqtt://localhost:1883')


client.on('connect', function () {
  client.subscribe('coe457/hello', function (err) {
    if (!err) {
      client.publish('coe457/hello', 'Hello COE457 from node.js')
    }
  })
})
 
client.on('message', function (topic, message) 
{
  // message is Buffer
  console.log(message.toString())
  client.end()
})