
console.log("yo, I'm alive!");

var paper = new Raphael(document.getElementById("mySVGCanvas"));
// Find get paper dimensions
var dimX = paper.width;
var dimY = paper.height;


//--------------------------------

var bg = paper.rect(0, 0, dimX, dimY);

bg.attr({
        "stroke": "#444444",
        "stroke-width": 20,
        "fill" : "#CCAAFF"        // must be filled to get mouse clicks        
});

//bg.node.addEventListener("mousedown", function(ev){
//	console.log(ev);
//});

//
//let myRect = paper.rect(100, 100, 100, 100);
//myRect.attr({
//	"fill": "blue",
//	"x" : 0
//});

let myLine = paper.path(`M ${dimX/2},${dimY/2} L 100, 100`);

myLine.attr({
	"stroke-width": 10,
	"stroke": "red",
});

let circle1 = paper.circle(`${dimX/2}`, `${dimY/2}`, 10).attr({ // cx, cy, r
	"fill" : "yellow",
});


let circle2 = paper.circle(100, 100, 10).attr({ // cx, cy, r
	"fill" : "blue",
});

let isClicked = false;

// mouse down on circle
circle2.node.addEventListener("mousedown", function(event){
	if (!isClicked) isClicked = true;
});

// mouse up anywhere on canvas
//document.getElementById("mySVGCanvas").addEventListener("mouseup", function(event){
//	if (isClicked) isClicked = false;
//});

bg.node.addEventListener("mouseup", function(event){
	if (isClicked) isClicked = false;
});

circle1.node.addEventListener("mouseup", function(event){
	if (isClicked) isClicked = false;
});

circle2.node.addEventListener("mouseup", function(event){
	if (isClicked) isClicked = false;
});

const move = function(event){
//	console.log("x coordinate: " + event.offsetX + ", y coordinate: " + event.offsetY);
	if (isClicked) {
		circle2.animate({
			"cx" : event.offsetX,
			"cy" : event.offsetY
		}, 1, "linear");
		myLine.animate({
			"path" : `M ${dimX/2},${dimY/2} L ${event.offsetX}, ${event.offsetY}`
		});
	}
}

bg.node.addEventListener("mousemove", move);
circle1.node.addEventListener("mousemove", move);

const enlarge = function() {
	circle1.animate({
		"r" : 40,
		"fill-opacity" : 0.5
	}, 2000, "linear", shrink);
}

const shrink = function() {
	circle1.animate({
		"r" : 5,
		"fill-opacity" : 1
	}, 2000, "linear", enlarge);
}

enlarge();
