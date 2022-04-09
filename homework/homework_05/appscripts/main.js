/* Smile/ Frown with Raphael Graphics */

console.log("yo, I'm alive!");

var paper = new Raphael(document.getElementById("mySVGCanvas"));
// Find get paper dimensions
var dimX = paper.width;
var dimY = paper.height;

var bg = paper.rect(0, 0, dimX, dimY);

let face = paper.circle(dimX/2-3, dimY/2+20, 100).attr({
	"fill": "#ffcc4d",
	"stroke": "#c98917",
	"stroke-width": 5
});

let leftBlush = paper.ellipse(dimX/2-52, dimY/2+20, 20, 10).attr({
	"fill": "#ea596e",
	"stroke": "#ea596e",
	"opacity": 0.5
});

let rightBlush = paper.ellipse(dimX/2+50, dimY/2+20, 20, 10).attr({
	"fill": "#ea596e",
	"stroke": "#ea596e",
	"opacity": 0.5
});

let mouth = paper.path("M250,250 Q300,300 350,250").attr({
	"stroke-width": 8,
	"stroke": "#c98917"
});

let isSmiling = true;

let leftEye = paper.ellipse(270, 200, 10, 20).attr({
	"fill" : "#c98917",
	"stroke": "#c98917",
	"stroke-width": 2
}); // cx, cy, rx, ry

let rightEye = paper.ellipse(330, 200, 10, 20).attr({
	"fill" : "#c98917",
	"stroke": "#c98917",
	"stroke-width": 2
});;

let button = document.getElementById("button");
button.addEventListener("click", function(ev){
	if (isSmiling) {
		button.innerHTML = "Smile";
		button.style.background = "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkElxpaAqLxpKQ7-2ncmerZlI_sM6wmuh3lQ&usqp=CAU)";
		
		mouth.animate({
			"path" : "M250,250 Q300,200 350,250"
		}, 500, "linear");
		
		circle.animate({
			"cx": 300,
			"cy": 210,
		}, 500, "linear");
		
		leftEye.animate({
			"rx": 20,
			"ry": 1,
		}, 500, "linear");
		
		rightEye.animate({
			"rx": 20,
			"ry": 1,
		}, 500, "linear");
		
		isSmiling = false;
	} else {
		button.innerHTML = "Frown";
		button.style.background = "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK5iKPmogBQxpXnp9SBddZciXi7neBdkOyNA&usqp=CAU)";
		
		mouth.animate({
			"path" : "M250,250 Q300,300 350,250"
		}, 500, "linear");
		
		circle.animate({
			"cx": 300,
			"cy": 290,
		}, 500, "linear");
		
		leftEye.animate({
			"rx": 10,
			"ry": 20,
		}, 500, "linear");
		
		rightEye.animate({
			"rx": 10,
			"ry": 20,
		}, 500, "linear");
		
		isSmiling = true;
	}
})

let circle = paper.circle(300, 290, 8).attr({ // cx, cy, r
	"fill" : "grey",
});
let canvas = document.getElementById("mySVGCanvas");
let isClicked = false;

circle.node.addEventListener("mousedown", function(ev){
	isClicked = true;
});

canvas.addEventListener("mouseup", function(ev){
	isClicked = false;
});

let drawMouth = function(bx, by){
	return `M 250,250 Q ${bx},${by} 350,250`;
}

const move = function(event){
	if (isClicked) {
		circle.animate({
			"cx" : event.offsetX,
			"cy" : event.offsetY
		}, 1, "linear");
		mouth.animate({
			"path" : drawMouth(event.offsetX, event.offsetY)
		});
	}
}

canvas.addEventListener("mousemove", move);


