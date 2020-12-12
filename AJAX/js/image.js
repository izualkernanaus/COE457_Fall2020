function showtracks() {

    // need to use a cors proxy 
    var cors_proxy = "https://cors-anywhere.herokuapp.com/";

    // use AJAX 
    $.ajax({
        type: "GET",
        dataType: 'JSON',
        url: cors_proxy + "http://api.deezer.com/search/track/autocomplete?limit=10&q=eminem",
    }).done(function(response) {
        console.log("success");
        console.log(response.data.length);
        for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i].title);
        }
    })
}