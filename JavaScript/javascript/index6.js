function changeColor(className) {
    // grab all the tags with the className
    // in our example, this is two tags

    var elems = document.querySelectorAll(className);
    
    var index = 0, length = elems.length;
    
    // go through each node and change the style
    // use node.style.color to change style
    
    for ( ; index < length; index++) {
        elems[index].style.color = "red";
    }
}
