function change_color() {
    document.querySelector(".p1").style.color = 'red'
}

function change_color_jq() {
    $(".p1").css("color", "blue");
}

function change_style() {
    $(".p2").addClass("fancy");
}

function change_styles() {
    $(".p2").addClass("fancy wide-margin");
}

function change_text() {
    $("#p11").text($("#p23").text());
}

function change_html() {
    $("#p11").html("<b>" + $("#p12").text() + "</b>");
}

function flip() {
    // if sm then ww
    if ($(".pic").attr("src") == "img/sm.jpg") {
        // set the .pic src to img/ww.jpg
        $(".pic").attr("src", "img/ww.jpg");
    } else {
        // ow sm 
        // set the .pic src to img/sm.jpg
        $(".pic").attr("src", "img/sm.jpg");
    }
}

// this function adds the call-back flip 
// on the click event of the element 
// with class "pic"

function add_listener() {
    $(".pic").click(flip);
}

function add_keypress() {
    $("#which").keydown(
        function(event) {
            console.log(event.keyCode);
            // is it 's'
            if (event.keyCode == 83) {
                // set the .pic src to img/sm.jpg
                $(".pic").attr("src", "img/sm.jpg");
            } else {
                // set the .pic src to img/ww.jpg
                $(".pic").attr("src", "img/ww.jpg");
            }

        })
}


function add_keypress_document() {
    $(document).keydown(
        function(event) {
            console.log(event.keyCode);
            if (event.keyCode == 83) {
                // set the .pic src to img/sm.jpg
                $(".pic").attr("src", "img/sm.jpg");
            } else {
                // set the .pic src to img/ww.jpg
                $(".pic").attr("src", "img/ww.jpg");
            }

        })
}

function add_mouseover() {
    $(".pic").on("mouseover", flip);
}

function add_b4() {
    $("#sm").dblclick(function() {
        $("#sm").before("<img src ='img/bg.jpg' class='pic'></img>");
    })
}

function add_after() {
    $("#sm").dblclick(function() {
        $("#sm").after("<img src ='img/bg.jpg' class='pic'></img>");
    })
}

function add_append() {
    $("#sm").dblclick(function() {
        $("#sm").append("<img src ='img/bg.jpg' class='pic'></img>");
    })
}

function add_remove() {
    $("#sm").dblclick(function() {
        $("#sm").remove();
    })
}