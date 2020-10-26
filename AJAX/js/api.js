// See https://zinoui.com/blog/cross-domain-ajax-request
// for cross-domain issues


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


function showtracksnicely() {
    var cors_proxy = "https://cors-anywhere.herokuapp.com/";
    $.ajax({
        type: "GET",
        dataType: 'JSON',
        url: cors_proxy + "http://api.deezer.com/search/track/autocomplete?limit=10&q=eminem",
    }).done(function(response) {
        console.log("success");
        console.log(response.data.length);
        for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i].title);
            // find show tag and add p tag
            $(".show").append("<p class='song_title'>" + response.data[i].title + "</p>");
        }
    })
}

function showtrackwithaudio() {
    var cors_proxy = "https://cors-anywhere.herokuapp.com/";
    $.ajax({
        type: "GET",
        dataType: 'JSON',
        url: cors_proxy + "http://api.deezer.com/search/track/autocomplete?limit=10&q=eminem",
    }).done(function(response) {
        console.log("success");
        console.log(response.data.length);
        for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i].title);
            $(".show").append("<p class='song_title'>" + response.data[i].title + "</p>");
            $(".show").append("<audio controls><source src=" + response.data[i].preview + "> </audio>");
        }
    })
}

function showall() {
    var cors_proxy = "https://cors-anywhere.herokuapp.com/";
    $.ajax({
        type: "GET",
        dataType: 'JSON',
        url: cors_proxy + "http://api.deezer.com/search/track/autocomplete?limit=10&q=eminem",
    }).done(function(response) {
        console.log("success");
        console.log(response.data.length);
        for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i].title);
            $(".show").append("<p class='song_title'>" + response.data[i].title + "</p>");
            $(".show").append("<audio controls><source src=" + response.data[i].preview + "> </audio>");
            $(".show").append("<p><img src=" + response.data[i].album.cover + ">" + "</img></p>");
            $(".show").append("<p class = 'album_title'>" + response.data[i].album.title + "</p>");
        }
    })
}