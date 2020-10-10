// returns an array of attribute, values.
function get_attributes(node){
  avpairs = new Array();
for (var att, i = 0, atts = node.attributes, n = atts.length; i < n; i++){
    console.log(atts[i].nodeName);
    console.log(atts[i].nodeValue);

    //avpairs[att[i].nodeName] = atts[i].nodeValue;
}
}