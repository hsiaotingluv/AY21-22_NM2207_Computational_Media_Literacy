console.log("Yo, I am alive!");

// Grab the div where we will put our Raphael paper
var centerDiv = document.getElementById("centerDiv");

// Create the Raphael paper that we will use for drawing and creating graphical objects
var paper = new Raphael(centerDiv);
// A "convenience" method for putting graphical objects back on a paper after they have been removed or "cleared"
paper.put=function(gobj){paper.canvas.appendChild(gobj.node)}

// put the width and heigth of the canvas into variables for our own convenience
var pWidth = paper.canvas.clientWidth;
var pHeight = paper.canvas.clientHeight;
console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);


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
//circle.addEventListener('mousemove', function(ev){
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

// Task #2.1  Draw circles where mouse is clicked
//----------------------------------------------------------
//                CREATE NEW OBJECT ON CLICK
//----------------------------------------------------------

let circleRadius = 12;

prect.node.addEventListener('click', function(ev){
	paper.circle(ev.offsetX, ev.offsetY, circleRadius);
	sketchMan.connect(ev.offsetX, ev.offsetY);
});

// Task 2.2 slider on aside panel
//  first add slider to index.html with id="slider1"
// HTML range slider to set size of circles to draw when we click
let slider1 = document.getElementById("slider1");

slider1.addEventListener('input', function(ev){
	circleRadius = 2 + 20*slider1.value; 
});

// HTML button to clear canvas of (some) drawings
let clearButton=document.getElementById("clearButton"); 

clearButton.addEventListener('click', function(ev){
	paper.clear();
	paper.put(prect);
	paper.put(circle);
	sketchMan.init();
});

// group related function methods inside the object, do not declare them everywhere else in other methods
var sketchMan = {
	"oldX" : pWidth/2,
	"oldY" : pHeight/2,
	
	"connect" : function(newX, newY) {
		let pathString = `M ${sketchMan.oldX}, ${sketchMan.oldY} L ${newX}, ${newY}`;
		paper.path(pathString);
		
		sketchMan.oldX = newX;
		sketchMan.oldY = newY;
	},
	
	"init" : function() {
		sketchMan.oldX = pWidth/2;
		sketchMan.oldY = pHeight/2;
	}
}
