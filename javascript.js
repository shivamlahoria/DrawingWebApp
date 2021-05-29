$(function(){
  $("#slider").slider({
      min: 3, 
      max:30,
      slide: function(event,ui){
          $("#circle").height(ui.value);
          $("#circle").width(ui.value);
      }
  }) ; 
    
/* Learning HTML Canvas    
    var canvas = document.getElementById("paint");
    var context = canvas.getContext('2d');
    
    //draw a line
    //declare new path
    context.beginPath();
   
    //set line width
    context.lineWidth = 40;
    
    //set line color
    context.strokeStyle = "#42e565";
    
    //set cap to the line (round, butt, square)
    context.lineCap ="round";
    
    //set line join(bevel, round, miter)
    context.lineJoin = "round";
    
    //position the context point
    context.moveTo(50,50);
    
    //draw a straight line from starting point to a new position
    context.lineTo(200,200);
    
    //draw another line
    context.lineTo(400,100);
    
    //make line visible
    context.stroke();
*/  
    


//declare variables
//painting-erasing or not
var paint = false; 

//painting or earsing
var paint_erase = "paint"; 

//get the canvas and context
var canvas = document.getElementById("paint");  
var ctx = canvas.getContext("2d");

  //get the canvas container
var container = $("#container");

  //mouse position
var mouse = {x: 0, y: 0};

//onload load saved work from localStorage
if(localStorage.getItem("imgCanvas") != null){
   var img = new Image();
   img.onload = function(){
       ctx.drawImage(img, 0, 0);
   }
   img.src = localStorage.getItem("imgCanvas"); 
};


//set drawing parameters (lineWidth, lineJoin, lineCap)
ctx.lineWidth = 3;
ctx.lineJoin = "round";
ctx.lineCap = "round";

//click inside container
container.mousedown(function(e){
paint = true;
//  window.alert(paint);
ctx.beginPath();
mouse.x = e.pageX - this.offsetLeft;
mouse.y = e.pageY - this.offsetTop;
ctx.moveTo(mouse.x,mouse.y);
});

//move the mouse while holding mouse key
container.mousemove(function(e){
   mouse.x = e.pageX - this.offsetLeft;
   mouse.y = e.pageY - this.offsetTop;
   if(paint == true){
       if(paint_erase == "paint"){
           //get coloe input
           ctx.strokeStyle = $("#paintColor").val();
       }else {
           // white color
           ctx.strokeStyle = "white";
       }
       ctx.lineTo(mouse.x, mouse.y);
       ctx.stroke();
   }
 
});

//mouse up-> we are not painting-earasing anymore
container.mouseup(function(){
        paint = false;               
 });

//if we leave the container we are not painting-erasing anymore
container.mouseleave(function(){
        paint = false;               
 });

//click on the reset button
$("#reset").click(function(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    paint_erase = "paint";
    $("#erase").removeClass("eraseMode");
});

//click on the save button
$("#save").click(function(){
    if(typeof(localStorage) != null){ //we do not use sessionStorage here
    localStorage.setItem("imgCanvas", canvas.toDataURL());
//        window.alert(localStorage.getItem("imgCanvas"));
    }else{
    window.alert("Your browser does not support local storage!");
  }  
    
});

//click on the erase button
$("#erase").click(function(){
    if(paint_erase == "paint"){
        paint_erase = "erase";
    }else{
        paint_erase = "paint";
    }
    $(this).toggleClass("eraseMode");
});
    
//change color input
$("#paintColor").change(function(){
  $("#circle").css("background-color",$(this).val()); 
});    
    

//change lineWidth using slider
  $("#slider").slider({
      min: 3, 
      max:30,
      slide: function(event,ui){
          $("#circle").height(ui.value);
          $("#circle").width(ui.value);
          ctx.lineWidth = ui.value;
      }
  }) ; 
    
//functions

});

