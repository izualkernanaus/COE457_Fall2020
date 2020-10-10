// show_color

function show_color(){
   console.log(document.querySelector("#color").value);
}

function change_color(){
    color = document.querySelector("#color").value;

    // grab all the ui elements in a list
    alluis = document.querySelectorAll("ui");

    // go through and change everyone's color
    for(i=0; i<alluis.length;i++) {
        console.log(alluis[i]);
        alluis[i].style.color = color;
    }
 }

