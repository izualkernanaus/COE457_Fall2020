function fetch() {
    // use AJAX 
    console.log("fetch");
    $.ajax({
        type: "GET",
        dataType:"image/jpg",
        // crossDomain: true,
        url: "http://localhost:1234",
        // headers: {
        //     "accept": "image/jpeg",
        //     "Access-Control-Allow-Origin":"*",
        //     "Access-Control-Allow-Headers" : "Origin, Content-Type, X-Requested-With, Accept",
        //     "Access-Control-Allow-Methods" : "GET, PUT, POST",
        // }
    }).done(function(response) {
        console.log("success");
        $('#grab').attr('src', response);
    })
}

$(document ).ready(function() {
    console.log( "ready!" );
    $("#grab").click(fetch);
});
