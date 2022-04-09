console.log("Yo, I am alive!");

// Grab the div where we will put our Raphael paper
var centerDiv = document.getElementById("centerDiv");

// Create the Raphael paper that we will use for drawing and creating graphical objects
var paper = new Raphael(centerDiv);

// put the width and heigth of the canvas into variables for our own convenience
var pWidth = paper.width;
var pHeight = paper.height;
console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);

// Just create a nice black background
var bgRect = paper.rect(0,0,pWidth, pHeight);

// A dot for us to play with
var dot = paper.circle(pWidth/2, pHeight/2, 50);
bgRect.attr({"fill": "black"});
dot.attr({"fill": "pink"});

var clicks = 0;
var toggle="off";
var timer;

document.getElementById('easy').addEventListener('click', function() {
	bgRect.attr({"fill": "black"});
	dot.attr({"fill": "pink"});
})

document.getElementById('difficult').addEventListener('click', function() {
	bgRect.attr({"fill": "pink"});
	dot.attr({"fill": "black"});
})

//-------------------
// load time
//-------------------
// You probalby
var loadTime=Date.now()
console.log("load time is " + loadTime/1000);
var duration = 0;

//HTML5 audio elements
var myFooter=document.getElementById("myFooter");

//HTML5 audio element
var aBackgroundSnd = new Audio ("resources/342566__inspectorj__sewer-soundscape-a.wav");

var aBumpSnd = new Audio ("resources/67408__noisecollector__vibrabonk.wav");

//-------------------
// Add some properties to dot just to keep track of it's "state"
dot.xpos=pWidth/2;
dot.ypos=pHeight/2;
dot.xrate=2;
dot.yrate=2;

// our drawing routine, will use as a callback for the interval timer
var draw = function(){
	duration = (Date.now()-loadTime)/1000;
	myFooter.innerHTML= `Time since loading program: ${duration}`;

	// Update the position where we want our dot to be
	dot.xpos += dot.xrate;
	dot.ypos += dot.yrate;

	// Now actually move the dot using our 'state' variables
	dot.attr({'cx': dot.xpos, 'cy': dot.ypos});

	//---------------------------------------------
	// Set sound parameters based on the position of the moving dots
	// When dots hit the wall, reverse direction 
	if (dot.xpos > pWidth) {
		dot.xrate = -dot.xrate;
		aBumpSnd.pause();
		aBumpSnd.currentTime=0;
		aBumpSnd.play();
	};
	if (dot.ypos > pHeight) {
		dot.yrate = - dot.yrate;
		aBumpSnd.pause();
		aBumpSnd.currentTime=0;
		aBumpSnd.play();
	};
	if (dot.xpos < 0) {
		dot.xrate = -dot.xrate;
		aBumpSnd.pause();
		aBumpSnd.currentTime=0;
		aBumpSnd.play();
	};
	if (dot.ypos < 0) {
		dot.yrate = - dot.yrate;
		aBumpSnd.pause();
		aBumpSnd.currentTime=0;
		aBumpSnd.play();
	};
	if (duration >= 10) {
		endgame();
	};
}

// call draw() periodically
// Start the timer with a button (instead of as program loads) so that sound models have time to load before we try play or set their parameters in the draw() function.
document.getElementById("startButtonID").addEventListener('click', function(ev){
	if (toggle=="off"){
		startgame();
	} else {
		endgame();
	}
});

function startgame() {
	timer=setInterval(draw, 20);
	toggle="on";
	clicks = 0;
	aBackgroundSnd.play();
	aBackgroundSnd.volume=.2;
	aBackgroundSnd.loop=true;
	loadTime=Date.now();
}

function endgame() {
	alert("number of clicks: " + clicks);
	clearInterval(timer);
	toggle="off"
	aBackgroundSnd.pause();
	dot.xpos = pWidth/2;
	dot.ypos = pHeight/2;
	dot.attr({'cx': dot.xpos, 'cy': dot.ypos});
}

dot.node.addEventListener('click', function(ev) {
	console.log("number of clicks: " + clicks);
	clicks += 1;
});



