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
bgRect.attr({"fill": "black"});

// A dot for us to play with
var dot = paper.circle(pWidth/2, pHeight/2, 20);
dot.attr({"fill": "green"});

//-------------------
// load time
//-------------------
var loadTime=Date.now()
console.log("load time is " + loadTime/1000);

//Lets display a clock for the user in the footer.
var myFooter=document.getElementById("myFooter");

// Start / Stop interval with button
var timer;
var button = document.getElementById("btn");
var bgSound = new Audio("./resources/start_234555__electroviolence__swoosh-explosion.wav");
//var hitSound1 = new Audio("../resources/hit_67408__noisecollector__vibrabonk.wav");
var sound1 = new Audio("./resources/Audio1.wav");
var sound2 = new Audio("./resources/Audio2.wav");
var sound3 = new Audio("./resources/Audio3.wav");
var sound4 = new Audio("./resources/Audio4.wav");

const hitSound = [sound1, sound2, sound3, sound4];

//-------------------
// Add some properties to dot just to keep track of it's "state"
dot.xpos=pWidth/2;     
dot.ypos=pHeight/2;
dot.xrate=5;
dot.yrate=5;

// our drawing routine, will use as a callback for the interval timer
var draw = function(){
	myFooter.innerHTML="Time: " + (Date.now()-loadTime)/1000

	// Update the position where we want our dot to be
	dot.xpos += dot.xrate;
	dot.ypos += dot.yrate;

	// Now actually move the dot using our 'state' variables
	dot.attr({'cx': dot.xpos, 'cy': dot.ypos});

	//---------------------------------------------
	// When dots hit the wall, reverse direction 
	if (dot.xpos > pWidth) {
		dot.xrate = -dot.xrate;
		hitSound[0].currentTime = 0;
		hitSound[0].play();
	}
	if (dot.ypos > pHeight) {
		dot.yrate = - dot.yrate;
		hitSound[1].currentTime = 0;
		hitSound[1].play();
	};
	if (dot.xpos < 0) {
		dot.xrate = -dot.xrate;
		hitSound[2].currentTime = 0;
		hitSound[2].play();
	}
	if (dot.ypos < 0) {
		dot.yrate = - dot.yrate;
		hitSound[3].currentTime = 0;
		hitSound[3].play();
	};
}


// call draw() periodically - save the timer in a variable so we can stop it if we want!

var updateButton = function() {
	if (button.value === 'Start') {
		timer = setInterval(draw, 20);
		bgSound.play();
		button.value = "Stop";
	} else {
		clearInterval(timer);
		bgSound.pause();
		button.value = "Start";
	}
}

button.addEventListener('click', updateButton);




