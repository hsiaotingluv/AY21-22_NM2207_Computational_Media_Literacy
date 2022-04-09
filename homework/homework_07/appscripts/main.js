
console.log("Yo, I am alive!");

// Grab the div where we will put our Raphael paper
var centerDiv = document.getElementById("centerDiv");

// Create the Raphael paper that we will use for drawing and creating graphical objects
var paper = new Raphael(centerDiv);

// put the width and heigth of the canvas into variables for our own convenience
var pWidth = paper.width;
var pHeight = paper.height;
console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);

var number = 100;
var id = 0;
var diskArr = [];

//---------------------------------------------------------------------

// Just create a nice black background
var bgRect = paper.rect(0,0,pWidth, pHeight);
bgRect.attr({"fill": "pink"});

// our drawing routine, will use as a callback for the interval timer
var draw = function(){
	id = 0;
	while (id < number) {
		// Update the position where we want our disk to be
		diskArr[id].xpos += diskArr[id].xrate;
		diskArr[id].ypos += diskArr[id].yrate;

		// Now actually move the disk using our 'state' variables
		diskArr[id].attr({'cx': diskArr[id].xpos, 'cy': diskArr[id].ypos});

		// keep the object on the paper
		if (diskArr[id].xpos > pWidth) {diskArr[id].xrate = -diskArr[id].xrate;}
		if (diskArr[id].ypos > pHeight) {diskArr[id].yrate = - diskArr[id].yrate};
		if (diskArr[id].xpos < 0) {diskArr[id].xrate = -diskArr[id].xrate;}
		if (diskArr[id].ypos < 0) (diskArr[id].yrate = - diskArr[id].yrate);
		
		id++;
	}
}

//---------------------------------------------------------------------

// Generate a random number in [m, n-1]
let randInt = function( m, n ) {
		let range = n-m;
		let frand = Math.random()*range;
		return m+Math.floor(frand);
}

// create x number of circles
while (id < number) {
	// A disk for us to play with
	let x = randInt(0, pWidth);
	let y = randInt(0, pHeight);
	let hsl = `hsl(${randInt(0,360)}, 100%, 50%)`;
	let rgb = Raphael.hsl2rgb(randInt(0,360), 100, 50);
	
	diskArr[id] = paper.circle(x, y, 20);
	diskArr[id].attr({"fill": rgb});

	// Add some properties to disk just to keep track of it's "state"
	diskArr[id].xpos=x;
	diskArr[id].ypos=y;
	// Add properties to keep track of the rate the disk is moving
	diskArr[id].xrate=randInt(1, 8);
	diskArr[id].yrate=randInt(1, 8);
	diskArr[id].color = rgb;
	
	id++;
}

setInterval(draw, 20);

//---------------------------------------------------------------------

// Detech mouse click
var transparentRect = paper.rect(0,0,pWidth, pHeight);
transparentRect.attr({"fill": "black", "fill-opacity": "0%"});

var mouseState = {
	"pushed" : false,
	"x" : 0,
	"y" : 0
}
var changeColor;

transparentRect.node.addEventListener('mousedown', function(event){
	mouseState.pushed = true;
	mouseState.x = event.clientX;
	mouseState.y = event.clientY;
	console.log(mouseState);
	
	changeColor = setInterval(function(){
		id = 0;
		while (id < number) {
			let rect = event.target.getBoundingClientRect();
			let x1 = event.clientX - rect.left;
			let y1 = event.clientY - rect.top;
			let x2 = diskArr[id].xpos;
			let y2 = diskArr[id].ypos;
			let dist = distance(x1, y1, x2, y2);
			if (dist < 100) {
				diskArr[id].attr({"fill" : "white"});
			} else {
				diskArr[id].attr({"fill" : diskArr[id].color});
			}
			id++;
		}
	}, 20);
});

transparentRect.node.addEventListener('mouseup', function(event){
	mouseState.pushed = false;
	console.log(mouseState);
	clearInterval(changeColor);
	id = 0;
	while (id < number) {
		diskArr[id].attr({"fill" : diskArr[id].color});
		id++;
	}
});

var distance = function(x1, y1, x2, y2) {
	let y = x2 - x1;
	let x = y2 - y1;
	return Math.sqrt(x * x + y * y);
}


