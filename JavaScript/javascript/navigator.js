function show(){

    let showme= document.querySelector("#show");
    showme.innerHTML = "<ul>"+
    '<ui>'+ "<p>appName  :"+navigator.appName + '</p></ui>'+
    '<ui>'+"<p>appVersion :"+navigator.appVersion+ '</p></ui>'+
    '<ui>'+"<p>geolocation  :"+navigator.geolocation+ '</p></ui>'+
    '<ui>'+"<p>platform  :"+navigator.platform+ '</p></ui>'+
    '<ui>'+"<p>mediaDevices :"+navigator.mediaDevices+ '</p></ui>'+
    "</ul>";

}