/**
 * 
 * Tensorflow.js Examples for Node.js
 * Script adatapted from:
 * https://github.com/tensorflow/tfjs-examples
 * https://groups.google.com/a/tensorflow.org/forum/#!forum/tfjs
 * https://github.com/loretoparisi/tensorflow-node-examples/blob/master/object_detection/index.js
 * @author Imran Zualkernan (izualkenan@aus.edu)
 * @copyright 2020 Imran Zualkernan
 */

// load the tensorflow library for running the NN
// load the canvas for converting the image into 
// 
const tf = require('@tensorflow/tfjs-node')
const { createCanvas, Image } = require('canvas')

var model, image
// location of SavedModel downloaded from the 
// google learning machine.

const model_path = './model/model.savedmodel'

// First read the model from the SavedModel Directory
tf.node
  .loadSavedModel(model_path, ['serve'], 'serving_default')
  .then(res => {
    model = res 
    console.log(model)
    return tf.node.getMetaGraphsFromSavedModel(model_path)
  })
  .then(modelInfo => {
    // We need to know the Input and the Output Names
    console.log(modelInfo)

    // Sample input to read. Please make sure that the
    // dimensions are the same as specified in the model
    // typically 200x200 with 3 color channels by default

    image = require('fs').readFileSync('./happy_dog_200.jpg')
    
    // Convert the file into an image and then
    // a float32 tensor.

    const uint8array = new Uint8Array(image)
    // Decode the image into a tensor. Will read jpeg, png etc.
    console.log(tf.cast(tf.node.decodeImage(uint8array), 'float32'))
    
    // Since decodeImage returns 'int32' it must be
    // converted to 'float32' for the model to run.
    return tf.cast(tf.node.decodeImage(uint8array), 'float32')
  })
  .then(imageTensor => {
    const input = imageTensor.expandDims(0)

    const startTime = tf.util.now()

    // Feed the image tensor into the model for inference.
    // Please note that inputNodeNames contains
    // the name of your input (e.g.,sequential_1_input )
    let outputTensor = model.predict({ sequential_1_input: input })

    console.log(outputTensor)

    // grab the output and convert it into an array
    // note that the name sequential_3 is derived
    // from the TFSavedmodel field outputNodeNames

    outputTensor.sequential_3.array()
     .then(array => {
         console.log(array)
         const endTime = tf.util.now()
        console.log("inference time:"+(endTime-startTime)/1000+" seconds")})
  
})
