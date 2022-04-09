// Code and Draw (review)

console.log("Yo, I am alive!");

// Grab the div where we will put our Raphael paper
var centerDiv = document.getElementById("centerDiv");

// Create the Raphael paper that we will use for drawing and creating graphical objects
var paper = new Raphael(centerDiv);
// paper.put(raphObj) - puts Raphel elements back on a paper after it has been paper.clear()'ed
paper.put=function(gobj){paper.canvas.appendChild(gobj.node)}


// put the width and heigth of the canvas into variables for our own convenience
var pWidth = paper.canvas.clientWidth;
var pHeight = paper.canvas.clientHeight;
console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);

//------------------------------------//

// create a rectangle equal to the size of the paper to draw on
let bg = paper.rect(0, 0, pWidth, pHeight).attr({
	"fill" : "yellow"
}); 

// create a small circle at the center of the paper
// cx, cy, r
let circle = paper.circle(pWidth/2, pHeight/2, 10).attr({
	"fill" : "blue",
	"stoke" : "black"
});

var isClicked = false;

circle.node.addEventListener("mousedown", function() {
	isClicked = true;
	console.log(isClicked);
});

circle.node.addEventListener("mouseup", function() {
	isClicked = false;
	console.log(isClicked);
});

// bg needs to be filled
bg.node.addEventListener("mousemove", function(ev) {
	if (isClicked) {
		circle.attr({
			"cx" : ev.offsetX,
			"cy" : ev.offsetY});
	}
});
