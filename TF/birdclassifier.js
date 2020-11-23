/**
 * Modified from:
 * Tensorflow.js Examples for Node.js
 * Script adatapted from
 * https://github.com/tensorflow/tfjs-examples
 * https://groups.google.com/a/tensorflow.org/forum/#!forum/tfjs
 * https://developer.ibm.com/technologies/artificial-intelligence/tutorials/coding-a-deep-learning-model-using-tensorflow-javascript/
 * 
 * @author Imran Zualkernan (izualkernan@aus.eedu)
 * @copyright 2020 Imran Zualkernan
 * 
 * Only works with .jpg files, use gm library to convert other files to jpg in future.
 */

labels = [
    'sparrow',
    'robin'
];

// global variables. 

classification = 'dont know yet';
file_original_name = 'img.jpg';

// ArgMax function for JavaScript

function argMax(array) {
    return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

// this will resize the image to 224 x 224
function resize() {
    return new Promise(function (resolve, reject) {
        // print the attributes of the image 
        im.identify(['-format', '%wx%h', './public/images/img' + path.extname(file_original_name)], function (err, output) {
            if (err) reject(err);
            console.log('dimensions of original image (w x h): ' + output);
            // resize to 200 x 200 and save it 
            im.resize({
                srcPath: './public/images/img' + path.extname(file_original_name),
                dstPath: './public/images/img224' + path.extname(file_original_name),
                width: 224,
                height: 224
            }, function (err, stdout, stderr) {
                if (err) reject(error);
                console.log('./public/images/img' + path.extname(file_original_name)+' resized image to 224x224px');
                resolve(true);
            });

        })

    })
}

// helper for multer
const helper = './helper.js';
const tf = require('@tensorflow/tfjs-node')
const im = require('imagemagick'); // also do 'brew install imagemagick' may need gm later.
const multer = require('multer');
const path = require('path');
const normalize = require('array-normalize')
var express = require('express');

var app = express();
app.set('port', process.env.PORT || 1234);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/');
    },
    // By default, multer removes file extensions so let's add them back
    // but the file name will be fixed to img.
    filename: function (req, file, cb) {
        file_original_name = file.originalname;
        cb(null, 'img' + path.extname(file.originalname));
    }
});

// must call these paths upload due to silly multer. 
app.get('/upload', (req, res) => {
    res.send(classification);
});

app.post('/upload', (req, res, next) => {
    // 'pic' is the name of our file input field in the HTML form
    // imageFilter will only allow image type files to be uploaded

    let upload = multer({ storage: storage, fileFilter: helper.imageFilter }).single('pic');

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        filepath = `${req.file.filename}`;
        filepath = "images/" + filepath;

        // classify after uploading 

        classify() // the answer is in resp = [result, time]
            .then(function (resp) {

                time = resp[1];
                result = resp[0];
                // find the label with the highest score
                console.log(labels[argMax(result)]);

                answer = 'The image is a <b>' + labels[argMax(result)] + '</b> with probability ' + result[argMax(result)].toFixed(2)
                    + ', and it took <i>' + time.toFixed(3) + ' seconds </i> to do the inference.';

                // not the funny quote marks to make the $ work 
                classification = `<html><hr/><img src="${filepath}" width="300"><hr/><p>${answer}</p><hr/></html>`;
                console.log(classification)
                // Display uploaded image for user validation
                res.send(classification); // just to return from the post.

            });
    });
});

async function classify() {

    return new Promise(function (resolve, reject) {

        var model, image
        // change the model path to where you extracted the SavedModel
        // please make sure it is the SavedModel

        const model_path = './public/converted_savedmodel/model.savedmodel'
        console.log(model_path);
        // const labels = require('./model/model.savedmodel/assets/labels.json');

        // First read the model from the SavedModel Directory
        tf.node
            .loadSavedModel(model_path, ['serve'], 'serving_default')
            .then(res => {
                model = res // LP: loaded TFSavedModel
                console.log(model)
                return tf.node.getMetaGraphsFromSavedModel(model_path)
            })
            .then(modelInfo => {

                console.log(modelInfo)

                // resize to 224 x 224 and save it 
                resize().
                    then(function (result) {

                        // Sample input to read. Please make sure that the
                        // dimensions are the same as specified in the model
                        // typically 200x200 with 3 color channels by default
                        image = require('fs').readFileSync('./public/images/img224' + path.extname(file_original_name));
                        uint8array = new Uint8Array(image)

                        // normalize the array?
                        // Decode the image into a tensor. Will read jpeg, png etc.
                        console.log(tf.cast(tf.node.decodeImage(uint8array), 'float32'))

                        // Since decodeImage returns 'int32' it must be
                        // converted to 'float32' for the model to run.

                        return tf.cast(tf.node.decodeImage(uint8array), 'float32')
                    })
                    .then(imageTensor => {
                        inputTensor = imageTensor.expandDims(0)
                        
                        // normalize and divide by 255 (very important)
                        inputTensor = inputTensor.div(255);

                        console.log('inputTensor' + inputTensor);
                        console.log('inputTensor.shape'+inputTensor.shape);

                        const startTime = tf.util.now();

                        // Feed the image tensor into the model for inference.
                        let outputTensor = model.predict(inputTensor);

                        console.log('outputTensor\n' + outputTensor);

                        // grab the output and convert it into an array
                        const scores = outputTensor.arraySync()[0];
                        console.log(scores);

                        const endTime = tf.util.now();
                        deltaTime = (endTime - startTime) / 1000;
                        console.log("inference time:" + deltaTime + " seconds")
                        resolve([scores, deltaTime]);
                    })
            });


    })
};

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
