
console.log("yo, I'm alive!");

var paper = new Raphael(document.getElementById("mySVGCanvas"));
// Find get paper dimensions
var dimX = paper.width;
var dimY = paper.height;


//------------------------------------------
// Careate a rectangle with the same dimensions as the canvas and save it in the variable bg
var bg = paper.rect(0, 0, dimX, dimY);

// Set some background rectangle attributes
bg.attr({
"stroke": "#444444",
"stroke-width": 20,
"fill" : "#CCAAFF"        // must be filled to get mouse clicks        
})

// add mousedown listener that prints to console (but only if the rectangle was filled)
bg.node.addEventListener("mousedown", function(ev){
console.log("mouse down on paper")
});

//------------------------------------------

mybigheart="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4z"

// Create myHeart1 with attributes
//============================================================
//create some kind of transforation

let myHeart1 = paper.path(mybigheart);

myHeart1.attr({
	"stroke-width" : 5,
	"fill" : 'red',
	"transform" : 'S0.5T10,20'
});

//============================================================
//Animate myHeart1 in stages

const enlarge = function() {
//	console.log('enlarged!');
	myHeart1.animate({
		"transform" : 'S0.4T100,-20R90'
	}, 1000, 'linear', shrink);
}

const shrink = function() {
//	console.log('shrinked!');
	myHeart1.animate({
		"transform" : 'S0.2T10,20'
	}, 1000, 'linear', enlarge);
}

enlarge();

// Raphael.transformPath takes 2 arguments: a path string, and a transform string
// alters the path attribute in myHeart1
let _transformedPath2 = Raphael.transformPath(mybigheart, 'S0.2T-50,-60');
let _transformedPath3 = Raphael.transformPath(mybigheart, 'S0.2T-50,20R180');
let _transformedPath4 = Raphael.transformPath(mybigheart, 'S0.2T-100,-20R270');

//============================================================
// Create other hearts strating from transforming the path for the first one
// give it some attributes

let myHeart2 = paper.path(_transformedPath2).attr({
	"fill" : 'pink',
	"stroke-width" : 3
});

let myHeart3 = paper.path(_transformedPath3).attr({
	"fill" : 'blue',
	"stroke-width" : 3
});

let myHeart4 = paper.path(_transformedPath4).attr({
	"fill" : 'orange',
	"stroke-width" : 3
});


//============================================================
// animate them, too 

// why foo and bar cannot take in parameters?
//const foo = function(scale, transform, rotation) {
//	console.log("foo");
//	let newPath = `S${scale}T${transform}R${rotation}`;
//	var anim = Raphael.animation({
//		"transform" : newPath
//	}, 1000);
//	
//	var anim2 = Raphael.animation({
//		"transform" : "S1T$10,10R90"
//	}, 1000, bar(scale, transform, rotation));
//	
//	myHeart2.animate(anim);
//	myHeart3.animate(anim);
//	myHeart4.animate(anim2);
//};
//
//const bar = function(scale, transform, rotation) {
//	console.log("bar");
//	let newPath = `S${scale}T${transform}R${4 * rotation}`;
//	var anim = Raphael.animation({
//		"transform" : newPath
//	}, 1000);
//	
//	var anim2 = Raphael.animation({
//		"transform" : "S1T$-10,-10R0"
//	}, 1000, foo(scale, transform, rotation));
//	
//	myHeart2.animate(anim);
//	myHeart3.animate(anim);
//	myHeart4.animate(anim2);
//};
//
//foo("1", "10,10", "90");

var newPath = "";
var originalPath = "S1T0,0";
var speed = 1000;

var setAnimate = function(scale, transform, rotation){
	newPath = `S${scale}T${transform}R${rotation}`;
	foo();
};

const foo = function() {
	var anim = Raphael.animation({
		"transform" : newPath
	}, speed);
	
	var anim2 = Raphael.animation({
		"transform" : newPath
	}, speed, bar);
	
	myHeart2.animate(anim);
	myHeart3.animate(anim);
	myHeart4.animate(anim2);
};

const bar = function() {
	var anim = Raphael.animation({
		"transform" : originalPath
	}, speed);
	
	var anim2 = Raphael.animation({
		"transform" : originalPath
	}, speed, foo);
	
	myHeart2.animate(anim);
	myHeart3.animate(anim);
	myHeart4.animate(anim2);
};

setAnimate("1", "0, 0", "90");

//============================================================
// use the slider to control the speed of animation

let slider = document.getElementById("mySlider");

slider.addEventListener("click", function(){
	speed =  1/slider.value * 400;
})

//============================================================
// use the mouse location to control the animation through the transformation strings 

bg.node.addEventListener('mousedown', function(ev){
	// get the 'center' of the path object 
	let bbox = myHeart1.getBBox(true);
	let boxCenterX = bbox.x + bbox.width/2;
	let boxCenterY = bbox.y + bbox.height/2;
	
	//Compute the transfrom from the center of the object to the mouse click
	let newX = ev.offsetX - boxCenterX;
	let newY = ev.offsetY - boxCenterY;
//	console.log(newX, newY);
	let newPath = Raphael.transformPath(myHeart1.attr('path'), `T${newX}, ${newY}`);
	
	myHeart1.stop();
	myHeart1.attr({
		'path' : newPath
	});
	enlarge();
});


