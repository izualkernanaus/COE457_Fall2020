var mqtt = require('mqtt')
var client  = mqtt.connect('ws://localhost:9001')

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