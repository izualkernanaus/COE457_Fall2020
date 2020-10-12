// returns an array of attribute, values based on searching
// for a class 

function get_attributes(query){
  avpairs = new Array();
  node = document.querySelector(query);
for (var att, i = 0, atts = node.attributes, n = atts.length; i < n; i++){
    console.log(atts[i].name);
    console.log(atts[i].value);

    avpairs[atts[i].name] = atts[i].value;
}
return avpairs;
}

function show_them(){
    attribs = get_attributes(".special");
    
    for (var key in attribs) {
        console.log(attribs[key]);
    }
}

function show_nicely(){
    attribs = get_attributes(".special");
   
    // string to create list for innerHTML

    to_display = "<ul>";  
    
    // go through the list of attributes <att, value>
    // create list elements for each attribute

    for (var key in attribs) {
        to_display = to_display + "<li>" + key + "=" +attribs[key]+ "</li>";
    }
    to_display = to_display+"</ul>";
    //console.log(to_display);

    // find the node to update 
    // 
    node = document.querySelector("#show_attributes");

    // innerHTML to add it 
    
    node.innerHTML = to_display;
}

