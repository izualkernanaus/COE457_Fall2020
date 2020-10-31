$( document ).ready(function() {
    console.log( "ready!" );
    $("#btn1").click(function(){
        $.get("localhost:1234", function(data, status){
          alert("Data: " + data + "\nStatus: " + status);
        });
      });

});




function grab_cpu(){
    
}
