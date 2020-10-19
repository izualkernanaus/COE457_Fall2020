function show () {
  let showme = document.querySelector('#show')

  // grab mediaDevices

  var media_device = '<ul>'

  navigator.mediaDevices.enumerateDevices().then(function (devices) {
    devices.forEach(function (device) {
      console.log(
        device.kind + ': ' + device.label + ' id = ' + device.deviceId
      )
      media_device =
        media_device +
        '<li>'+
        device.kind +
        ': ' +
        device.label +
        ' id = ' +
        device.deviceId+
        '</li>'
    })

    media_device = media_device + '</u>';

    console.log('media device:' + media_device)

  
    showme.innerHTML =
      '<ul>' +
      '<ui>' +
      '<p>appName  :' +
      navigator.appName +
      '</p></ui>' +
      '<ui>' +
      '<p>appVersion :' +
      navigator.appVersion +
      '</p></ui>' +
      '<ui>' +
      '<p>geolocation  :' +
      navigator.geolocation +
      '</p></ui>' +
      '<ui>' +
      '<p>platform  :' +
      navigator.platform +
      '</p></ui>' +
      '<ui>' +
      '<p>mediaDevices :' +
      media_device +
      '</p></ui>' +
      '</ul>'
  })
}
