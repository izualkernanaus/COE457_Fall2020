/**
 * Modified from:
 * Tensorflow.js Examples for Node.js
 * Script adatapted from
 * https://github.com/tensorflow/tfjs-examples
 * https://groups.google.com/a/tensorflow.org/forum/#!forum/tfjs
 * 
 * @author Imran Zualkernan (izualkernan@aus.eedu)
 * @copyright 2020 Imran Zualkernan
 */

// this will resize the image to 224x224 because this is required
// by the teachable machine.

function resize() {
  return new Promise(function (resolve, reject) {
    // print the attributes of the image 
    im.identify(['-format', '%wx%h', './sample_images/11.jpg'], function (err, output) {
      if (err) reject(err);
      console.log('dimensions of original image (w x h): ' + output);
    });

    // resize to 224 x 224 and save it 
    im.resize({
      srcPath: './sample_images/11.jpg',
      dstPath: './img.jpg',
      width: 224,
      height: 224
    }, function (err, stdout, stderr) {
      if (err) reject(error);
      console.log('resized to 224x224px');
      resolve(true);
    });
  })
}

// // mapping of class labels
 const labels = [
  'sparrow',
  'robin'];

// npm install these two modules into your project directory
const tf = require('@tensorflow/tfjs-node')
const { createCanvas, Image } = require('canvas')
// also do brew install imagemagick
var im = require('imagemagick');

var model, image
// change the model path to where you extracted the SavedModel
// please make sure it is the SavedModel

const model_path = './public/converted_savedmodel/model.savedmodel'
console.log(model_path);

// First read the model from the SavedModel Directory
tf.node
  .loadSavedModel(model_path, ['serve'], 'serving_default')
  .then(res => {
    model = res // LP: loaded TFSavedModel
    console.log(model)
    return tf.node.getMetaGraphsFromSavedModel(model_path)
  })
  .then(modelInfo => {
    // We need to know the Input and the Output Names
    // we will need these to figure out what the input and 
    // output names are for later in this code. 

    console.log(modelInfo)


    resize().
      then(function (result) {

        // Sample input to read. Please make sure that the
        // dimensions are the same as specified in the model
        // typically 224x224 with 3 color channels by default

        image = require('fs').readFileSync('./img.jpg')
        const uint8array = new Uint8Array(image)
        // Decode the image into a tensor. Will read jpeg, png etc.
        console.log(tf.cast(tf.node.decodeImage(uint8array), 'float32'))

        // Since decodeImage returns 'int32' it must be
        // converted to 'float32' for the model to run

        return tf.cast(tf.node.decodeImage(uint8array), 'float32')


      })
      .then(imageTensor => {
        inputTensor = imageTensor.expandDims(0)
        console.log('inputTensor\n'+inputTensor);

        // normalize and divide by 255 (very important)
        inputTensor = inputTensor.div(255);

        const startTime = tf.util.now();

        // Feed the image tensor into the model for inference.
        let outputTensor = model.predict(inputTensor);

        console.log('outputTensor\n'+outputTensor);

        // grab the output and convert it into an array

        const scores = outputTensor.arraySync()[0];
        console.log(scores);
        
        const endTime = tf.util.now()
        console.log("inference time:" + (endTime - startTime) / 1000 + " seconds")

      })
  });
