
console.log("yo, I'm alive!");

var paper = new Raphael(document.getElementById("mySVGCanvas"));
// Find get paper dimensions
var dimX = paper.canvas.clientWidth;
var dimY = paper.canvas.clientHeight;

// set tick and tock locations
let ticklocation = {
	"x" : dimX / 4,
	"y" : dimY / 4
};

let tocklocation = {
	"x" : 3 * dimX / 4,
	"y" : dimY / 4
};

//Draw tick/tock text
paper.text(ticklocation.x, ticklocation.y - 25, "Tick").attr({
	'font-size' : "32px"
}); // x, y, text

paper.text(tocklocation.x, tocklocation.y - 25, "Tock").attr({
	'font-size' : "32px"
}); // x, y, text

 // Create the needle
let needlestring = `M ${dimX/2}, ${3*dimY/4} L ${ticklocation.x}, ${ticklocation.y}`;
console.log("your initial needle path is " + needlestring);

let needle = paper.path(needlestring);

//--------------------------------------------------
// function to draw needle pointing to a location
let moveneedle = function(pt){
	needle.animate({
		"path" : `M ${dimX/2}, ${3*dimY/4} L ${pt.x}, ${pt.y}`
	}, 500, "bounce");
}

moveneedle(tocklocation);

// Create a variable to keep track of the state of the needle
let needleState = "tick"; // can be either "tick" or "tock"

// switch state of needle on click
let canvasdiv = document.getElementById("mySVGCanvas");

canvasdiv.addEventListener('click', function(ev){
	console.log("we got a click");
	if (needleState === "tick") {
		moveneedle(tocklocation);
		needleState = "tock";
	} else {
		moveneedle(ticklocation);
		needleState = "tick";
	}
});
