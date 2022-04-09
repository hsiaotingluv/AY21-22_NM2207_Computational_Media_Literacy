// Code and Draw (review)

console.log("Yo, I am alive!");

// Grab the div where we will put our Raphael paper
var centerDiv = document.getElementById("centerDiv");

// Create the Raphael paper that we will use for drawing and creating graphical objects
var paper = new Raphael(centerDiv);
// paper.put(raphObj) - puts Raphel elements back ona paper after it has been paper.clear()'ed
paper.put=function(gobj){paper.canvas.appendChild(gobj.node)}

// put the width and heigth of the canvas into variables for our own convenience
var pWidth = paper.canvas.clientWidth;
var pHeight = paper.canvas.clientHeight;
console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);

//--------------------------------------------------------
// Task #1.1: get a rectangle equal to the size of the paper to raw on

// Create rectangle to fill the paper to use as a background 
var prect = paper.rect(0,0, pWidth, pHeight);
prect.attr({"fill": "#F1ECD6"}); 

// Task #1.2: draw a circle
// Create a small circle at the center of the paper
var circle = paper.circle(pWidth/2, pHeight/2, 15);
// call attr function with a object consisting of attribute:value pairs separated by commas
circle.attr({"fill": "#00FF00",      
             "stroke": "#000" } );   

// Task #1.3: make the circle draggable                          
//------------------------------------------------------------
//                      Drag an object 
//------------------------------------------------------------
//Add mousedown, mouseup, mousemove, listeners to control dragging

// Create variable to remember the mouse state between function callbacks
var mouseIsDown=false;

// When we get a 'mousedown' event, set the mouseIsDown variable to remember that mouse state for later.
circle.node.addEventListener('mousedown', function(ev){
        mouseIsDown=true; 
});

// When we get a 'mousemove' event, only move the object if the mouse is down
//circle.node.addEventListener('mousemove', function(ev){
prect.node.addEventListener('mousemove', function(ev){
        if (mouseIsDown) { 
                //console.log("mouse move while mouse pressed");   
                circle.attr({cx: ev.offsetX, 
                             cy: ev.offsetY});
        } // no need for an "else" action
});

// When we get a 'mouseup' event, set the mouseIsDown to remember its state.
circle.node.addEventListener('mouseup', function(ev){
      mouseIsDown = false;
});



var circleRadius = 52;

prect.node.addEventListener("click", function(ev) {
	paper.circle(ev.offsetX, ev.offsetY, circleRadius);
})

let slider = document.getElementById("slider");

slider.addEventListener("input", function(){
	circleRadius = 2 + 100 * slider.value;
	console.log(circleRadius);
})

let clearBtn = document.getElementById("clearbtn");
clearBtn.addEventListener("click", function(){
	paper.clear();
	paper.put(prect);
	paper.put(circle);
})
