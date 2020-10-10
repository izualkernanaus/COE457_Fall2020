// modified from
// https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder#Event_handlers

var c = 0;
function myCounter() {
  document.getElementById("timer").innerHTML = ++c;
}

function startaudio(){

if (navigator.mediaDevices) {
  console.log('getUserMedia supported.');
  
  // grab the ndes for download link and stop button
  const downloadLink = document.getElementById('download');
  const stopButton = document.getElementById('stop');
  stopButton.setAttribute("style","visibility: hidden");
  const startButton = document.getElementById('start');
  const timeDisplay = document.getElementById('timer');
  timeDisplay.setAttribute("style","visibility: hidden");
  console.log(downloadLink);
  console.log(stopButton);
  
  var constraints = { audio: true};
  var chunks = [];

  navigator.mediaDevices.getUserMedia(constraints)
  .then(function(stream) {
    
    // create an instance of media recorder
    var mediaRecorder = new MediaRecorder(stream);
    console.log(stream);
    
    startButton.onclick = function() {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log("recorder started");

      // change style to start blinking
      startButton.style.backgroundColor = "red";
      savedsb = startButton.getAttribute("class");
      startButton.setAttribute("class","blink_me "+savedsb);
      stopButton.setAttribute("style","visibility: visible");
      timeDisplay.setAttribute("style","visibility: visible");
      
      // start a timer for time of clip
      myTimer = setInterval(myCounter, 1000)
    }

    stopButton.onclick = function() {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("recorder stopped");

      // stop blinking the start button
      startButton.style.backgroundColor = "#66bfbf";
      startButton.setAttribute("class",savedsb);
      stopButton.setAttribute("style","visibility: hidden");
      timeDisplay.setAttribute("style","visibility: hidden");
      
      // clear timer 
      clearInterval(myTimer);
      c = 0;
    }

    mediaRecorder.onstop = function(e) {
      console.log("data available after MediaRecorder.stop() called.");

      // create a clip name from date stamp
      var clipName = "C"+Date.now();

      // create <article> tag
      var clipContainer = document.createElement('article');
      clipContainer.setAttribute('id', clipName);
      clipContainer.setAttribute('style', "bottom-margin: 2%; left-margin:20%; right-margin:20%; text-align: center; background-color:#eaf6f6");
      
      // create <div> tag from the delete/download buttons
      var buttonContainer = document.createElement('div');
      buttonContainer.setAttribute('id', 'buttons');
      buttonContainer.setAttribute('class', 'db');

      // create <p> tag clip title
      var clipLabel = document.createElement('p');
      clipLabel.setAttribute('class', 'title');
      clipLabel.setAttribute('style', "color:#f76b8a");
      clipLabel.innerHTML = clipName;
      
      // create audio playback tag
      var audio = document.createElement('audio');
      audio.setAttribute('controls', '');
      audio.setAttribute('style', "color:#f76b8a");
      
      // create tag for downloading
      var download = document.createElement('A');
      download.innerHTML = "<div class='db'><i class='fas fa-download'></i></div>";
      download.setAttribute('style', "color:#f76b8a");
      
      // create delete button
      var deleteButton = document.createElement('button');
      deleteButton.innerHTML = "<div class='db'><i class='far fa-trash-alt'></i></div>";
      deleteButton.setAttribute('id', clipName);
      deleteButton.setAttribute('style', "color:#f76b8a; border: none;background-color:#eaf6f6")
      
      var hr = document.createElement('hr');
      hr.setAttribute('style', "color:#f76b8a; border:none");

      // create button div. 
      buttonContainer.appendChild(clipLabel);
      buttonContainer.appendChild(deleteButton);
      buttonContainer.appendChild(download);

      // create article button with two div & audio
      clipContainer.classList.add('clip');
      clipContainer.appendChild(buttonContainer);
      clipContainer.appendChild(audio);
      clipContainer.appendChild(hr);
      document.getElementById("clip").appendChild(clipContainer);
      console.log(clipContainer)

     // add audio controls
      audio.controls = true;

      // save audio in a block
      var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
      chunks = [];
      var audioURL = URL.createObjectURL(blob);
      audio.src = audioURL;
      console.log("recorder stopped");
      
      // save blob to a wave file 
      download.href = audioURL;
      download.setAttribute("id", "download");
      download.download = clipName+'.wav'
      console.log(download.download);

      deleteButton.onclick = function(e) {
        // id of the article 
        article_id = deleteButton.attributes[0].nodeValue;
        console.log(deleteButton.attributes[0].nodeValue);
        // find the article with the id and remove it
        var element = document.getElementById(article_id);
        element.parentNode.removeChild(element);
      }
    }

    mediaRecorder.ondataavailable = function(e) {
      // add chunks of audio when available
      console.log('data arrived')
      chunks.push(e.data);
    }
  })
  .catch(function(err) {
    console.log('The following error occurred: ' + err);
  })
}

}