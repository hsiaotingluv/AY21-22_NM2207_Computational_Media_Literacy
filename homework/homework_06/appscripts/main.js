// main.js

console.log(`yo`);

var paper = new Raphael(document.getElementById("mySVGCanvas"));

let count = 0;

const radius = 20;
const velocity = 5;
const interval = 15;
const animation_speed = 500;

// Find get paper dimensions
var dimX = paper.width;
var dimY = paper.height;

var bg = paper.rect(0, 0, dimX, dimY).attr({
	"fill" : '#523'
});

var disk = paper.circle(dimX/2, dimY/2, radius).attr({
	"fill" : 'pink',
});

// disk.property to define / access custom property
// disk.attr('property') to access property value
disk.xpos = dimX/2;
disk.ypos = dimX/2;
disk.xrate = velocity;
disk.yrate = velocity;

function draw() {
	// a copy of nd is created and initialised every time draw() is called
	let nd = paper.circle(disk.xpos, disk.ypos, radius).attr({
		"fill" : 'pink',
	});
	
	// if goes out x bound
  if (disk.xpos >= dimX - radius  || disk.xpos - radius <= 0) {
    disk.xrate *= -1;
  }
	// if goes out y bound
	if (disk.ypos >= dimY - radius  || disk.ypos - radius <= 0) {
    disk.yrate *= -1;
  }
	
  disk.xpos += disk.xrate;
	disk.ypos += disk.yrate;
	
	nd.animate({
    'cx': disk.xpos,
    'cy': disk.ypos,
    'fill-opacity': 0,
    'fill': "#071630",
  }, animation_speed, "linear", nd.remove);
	
	count++;
	
};

setInterval(draw, 10);












