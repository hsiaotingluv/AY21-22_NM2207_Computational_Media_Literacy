// Game on! No timer game

console.log("yo, I'm alive!");
let paper = new Raphael(document.getElementById("mySVGCanvas"));
// Find get paper dimensions
let pWidth=paper.width;
let pHeight=paper.height;

const maxClicks = 10;

// Start button with text on top
let startButton = paper.circle(pWidth/2, pHeight/2, 40);
let startText = paper.text(pWidth/2, pHeight/2, 'START');

// always declare global variables at the top, not above the function
let counter = 0;
let startTime;

let clickText = paper.text(pWidth/2, 30, `Number of clicks: ${counter}`).attr({
	"font-size": 20
});

startButton.attr({
	"stroke" : 'pink',
	"stroke-width" : 2,
	"fill" : 'pink'
});

// hide/show start button

let hideStartButton = function() {
	startButton.hide();
	startText.hide();
};

let showStartButton = function() {
	startButton.show();
	startText.show();
};

//-----------------------------------------
// Create the target rect

let rectWidth = 100;
let rectHeight = 100;

// rect draw off the canvas
let rect1 = paper.rect(-rectWidth, -rectHeight, rectWidth, rectHeight);

rect1.attr({
	"fill" : "hsl(240, 50, 50)",
	"stroke" : '#3b4449',
	"stroke-width" : 10,
	"stroke-linejoin" : 'round',
	"opacity" : .75
});

//-----------------------------------------
// Return a random integer between m and n inclusive
 
var ranInt = function(m, n) {
	var range = n - m + 1;
	var frand = Math.random() * range;
	return m + Math.floor(frand);
}

//-----------------------------------------
// move the square to a random position inside the canvas play area

let moveSquareRandom = function() {
	let posX = ranInt(0, pWidth - rectWidth);
	let posY = ranInt(0, pHeight - rectHeight);
	
	rect1.attr({
		"x" : posX,
		"y" : posY
	});
};

//-----------------------------------------
// start the game, function to use as callback on button click

let start = function() {
	console.log("starting game!");
	hideStartButton();
	
	counter = 0;
	startTime = Date.now();
	console.log("The start time of our game is " + startTime);
	moveSquareRandom();
}

startButton.node.addEventListener('click', start);

//---------------------------
// end game, call when user click reaches goal

let endGame = function() {
	let totalTime = (Date.now() - startTime) / 1000; // convert to seconds
	alert("You completed the task in " + totalTime + " seconds!");
	clickText.attr({
		"text" : "Number of clicks: 0"
	})

	rect1.attr({
		"x" : -rectWidth,
		"y" : -rectHeight
	});
	showStartButton();
}

//-----------------------------------------
// callback on square clicks. Check for end of game condition

let gotcha = function(ev) {
	counter++;
	clickText.attr({
		"text" : `Number of clicks: ${counter}`
	})
	console.log("counter is " + counter);
	if (counter >= maxClicks) {
		endGame();
	} else {
		moveSquareRandom();
	}
}

rect1.node.addEventListener('click', gotcha);

/*
Date (time)
var then_in_ms = Date.now();
var now_in_ms = Date.now();
var duration = now_in_ms - then_in_ms;

Timer events (one-off)
setTimeout(function, milliseconds);
setTimeout(function(e){ alert("Yo time!");}, 1000);

Timer events (periodic)
// repeatedly call the function
var myTicker = setInterval(function, milliseconds); 
clearInterval(myTicker); // stop the periodic callbacks

Timer counting example
var tcounter = 0;
var myTicker = setInterval(function() {
		tcounter++;
		console.log("Ticker count is " + tcounter);
		if (tcounter >= 10) { clearInterval(myTicker); }
	}, 1000);

Math Object
Math.PI
Math.SQRT2
Math.abs(x) - |x|
Math.pow(x, y) - x^y
Math.cos(x)
Math.sin(x)
Math.ceil(x) - Returns the smallest integer >= x
Math.floor(x) - Returns the integer <= x
Math.round(x) - Returns the value of x rounded to nearest integer
Math.max(x, y...) - Returns the largest of zero or more numbers
Math.min(x, y...) - Returns the smallest of zero or more numbers
Math.random() - Returns a pseudo-random number between 0 and 1

Random Number Generator
var ranInt = dunction(m, n) {
	var range = n-m;
	var frand = Math.random() * range;
	return m + Math.floor(frand);
}
*/
