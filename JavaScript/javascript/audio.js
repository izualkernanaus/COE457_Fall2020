
function startaudio(){
    
    let shouldStop = false
    let stopped = false

    // grab the ndes for download link and stop button
    const downloadLink = document.getElementById('download')
    const stopButton = document.getElementById('stop')
    console.log(downloadLink);
    console.log(stopButton);

    // if pressbutton then stop. 
    stopButton.addEventListener('click', function () {
      shouldStop = true;
      console.log("shouldStop");
    })


    const handleSuccess = function (stream) {
      console.log(stream)
      const options = { mimeType: 'audio/webm' }
      const recordedChunks = []
      const mediaRecorder = new MediaRecorder(stream, options)

      navigator.mediaDevices.enumerateDevices().then((devices) => {
        devices = devices.filter((d) => d.kind === 'audioinput');
        console.log(devices)
      });

      mediaRecorder.onstart = function(){
         console.log('recorder started')
      }

      mediaRecorder.ondataavailable = function (e) {
          
        console.log('data available');

        if (e.data.size > 0) {
          recordedChunks.push(e.data)
        }

        if (shouldStop === true && stopped === false) {
          mediaRecorder.stop()
          stopped = true
          console.log("stopped");
        }
      }

      mediaRecorder.onstop = function () {
        downloadLink.href = URL.createObjectURL(new Blob(recordedChunks))
        downloadLink.download = 'acetest.wav'
        console.log(downloadLink.download);
      }

      mediaRecorder.start()
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(handleSuccess)
}