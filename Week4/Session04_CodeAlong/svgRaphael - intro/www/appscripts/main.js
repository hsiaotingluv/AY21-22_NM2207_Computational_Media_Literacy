/*
Two types of graphics
Raster/Bitmaps => Image stores as array of pixels
Scalable Vector Graphics (SVG) => Image stores as objects, instructions for drawing (e.g. path)

Raster/Bitmaps (advantages & disadvantages)
- collection of pixels, may have very huge size
+ stored locally in storage, do not require CPU to create images on the fly

SVG (advantages & disadvantages)
+ collection of instructions, may have very small size
- browser has to execute the instructions on CPU i.e. images created on the fly rather than stored in memory
+ scales better
+ SVG Document Object Model
	+ objects can be styled, moved, grouped, animated
	+ objects can be event generators, i.e. listen for "clicks" etc
*/

console.log("yo, I'm alive!");

// initialise Raphael as paper
var paper = new Raphael(document.getElementById("mySVGCanvas"));

// Set Attributes
// common attributes: cx (x coord of center of circle or elipse), cy, fill, height, opacity, path, r (radius), stroke, width, x, y, fill-opacity, font, font-family, font-size, font-weight
//var rect1 = paper.rect(100, 100, 100, 100); // (x, y, width, height)
//rect1.attr({fill: '#9cf', stroke: '#ddd', 'stroke-width': 5});

// SVG Path
// m => move without drawing
// l => draw a line to
// z => close path / draw line from start point to end point
// other paths: m (move to), l (line to), h (horizontal line to), v (vertical line to), c (curve to), s (smooth curve to), q (quadratic bezier curve), t (smooth quadratic bezier curve to), a (elliptical arc), z (close path)
//var path1 = paper.path("m 200, 200 l 280, 200 l 290, 290 z")

let line1 = paper.path("M 0,0 L 600, 400");

line1.attr({
	"stroke" : "blue",
	"stroke-width" : 10
});

let rect1 = paper.rect(100, 100, 150, 100); // x, y, width, height

rect1.attr({
	"fill" : "hsl(.75, .5, .5)",
	"stroke" : "#3b444f",
	"stroke-width" : 5,
	"stroke-linejoin" : "round",
	"opacity" : .75
});


let circle1 = paper.circle(450, 205, 25).attr({ // cx, cy, r
	"fill" : "#f0f",
	"stroke-width" : 5,
	"stroke" : 'blue'
});

// x, y, text
let text = paper.text("250px", "50px", "A little text experiment"); // x, y, text

text.attr({
	"font-size" : "32px",
	"font-weight" : 800,
	"fill" : "yellow",
	"stroke" : "brown",
	"stroke-width" : "3px"
});

rect1.node.addEventListener("click", function(ev){
	console.log("got a click on our square");
});

document.getElementById("mySVGCanvas").addEventListener("click", function(event){
	console.log("click on the canvas, x = " + event.offsetX + ", y = " + event.offsetY);
	
	rect1.animate({
		"x" : event.offsetX,
		"y" : event.offsetY
	}, 100, "linear");  
});
