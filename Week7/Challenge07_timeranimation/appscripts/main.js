
console.log("yo, I'm alive!");

let paper = new Raphael(document.getElementById("mySVGCanvas"));
// Find get paper dimensions
let dimX = paper.width;
let dimY = paper.height;

// maps x in  the interval [a,b] into the interval [m, n]
let map = function (x, a, b, m, n){
    let range = n-m;
    // x is 'proportion' of the way from a to b
    let proportion = (x-a)/(b-a);
    return (m + proportion*range);
}

//--------------------------------
// variables for controlling frame rate and speed of animated object

// Create a dot at the center of the paper
let circle = paper.circle(dimX/2, dimY/2, 20).attr({
	"fill" : 'pink'
});

// give it some attributes
//  Responsive user interfaces have a frame rate of 60 frames per second (fps)
let frameLength = 5;
let time = 0;

// function that does the animation, called at the framerate 
let draw = function() {
	time += frameLength;
	console.log("time: " + time);

	// when time = 1000, a = 2PI, sa = 0
	// time = 2000, a = 4PI, sa = 0
	// time = 3000, a = 6PI, sa = 0
	// one complete sin wave
	let xa = time * 2 * Math.PI / 1000 * xrate;
	let sa = Math.sin(xa);
	
	let ya = time * 2 * Math.PI / 1000 * yrate;
	let cs = Math.cos(ya);
	
	let newX = map(sa, -1, 1, 0, dimX);
	let newY = map(cs, -1, 1, 0, dimY);
	
	circle.attr({
		"cx" : newX,
		"cy" : newY
	});
}

let xrate = 1; // number of complete bounces per second
let yrate = 1.5;

// start the animation

// frame rate: the frequency at which frames are displayed
// the higher the framelength, the smoother it bounces
setInterval(draw, frameLength);
