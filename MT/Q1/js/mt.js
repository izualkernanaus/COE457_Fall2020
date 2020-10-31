$(document).ready(function() {

    $("#flip").click(function() {

        // move the card from one container to another
        $("#basho_container").append($("#yosa"))
        $("#yosa_container").append($("#basho"))

        // things are in the wrong container 
        // so swap them.

        $("#yosa").attr("id", "tmp")
        $("#basho").attr("id", "yosa")
        $("#tmp").attr("id", "basho")
    });
})