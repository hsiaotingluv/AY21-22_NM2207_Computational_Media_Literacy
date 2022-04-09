
console.log("yo, I'm alive!");

var paper = new Raphael(document.getElementById("mySVGCanvas"));
// Find get paper dimensions
var dimX = paper.width;
var dimY = paper.height;


//------------------------------------------
// Careate a rectangle with the same dimensions as the canvas and save it in the variable bg
var bg = paper.rect(0, 0, dimX, dimY);

// Set some background rectangle attributes
bg.attr({
"stroke": "#444444",
"stroke-width": 20,
"fill" : "#CCAAFF"        // must be filled to get mouse clicks        
})

// add mousedown listener that prints to console (but only if the rectangle was filled)
bg.node.addEventListener("mousedown", function(ev){
console.log("mouse down on paper")
});

//------------------------------------------

mybigheart="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4z"

// Create myHeart1 with attributes

//============================================================
//create some kind of transforation

//============================================================
//Animate myHeart1 in stages

//============================================================
// Create other hearts strating from transforming the path for the first one
// give it some attributes


//============================================================
// animate them, too 

//============================================================
// use the mouse location to control the animation through the transformation strings 

