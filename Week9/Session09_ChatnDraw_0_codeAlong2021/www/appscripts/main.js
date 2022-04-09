var iosocket = io.connect();

let chatBox = document.getElementById("chatBox");
let typingBox = document.getElementById("typingBox");

let uname = prompt("Please enter your name");
uname = uname || "anon";
// equivalent to
//if (uname){
//} else {
//	uname = "anon"
//}

let svgdiv = document.getElementById("svgcanvas");
var paper = new Raphael(svgcanvas);
var raphaelPath; // for holding the raphael path 
var pathString; // for holding the path string 
var mousePushed = false; // for remembering the state of the mouse. 

let clearBtn = document.getElementById("clearbtn");
let hue = document.getElementById("hue");
let saturation = document.getElementById("saturation");
let lightness = document.getElementById("lightness");
let mySliders = document.querySelectorAll(".mySlider");
var hslString = "pink";
var strokeSize = 5;

iosocket.on('connect', function () {
	console.log("Yo.........connected!");

	// MESSAGE PROCESSING HERE --------------
	iosocket.on('message', function(m) {
		if (m.datatype == "chatText") {
			console.log("You received a message: " + m.data);
			chatBox.value += m.username + "> " + m.data + "\n";
		}
		if (m.datatype == "drawPath") {
			console.log("You received a drawing: " + m.data);
			paper.path(m.data).attr({
				"stroke" : m.hsl,
				"stroke-width" : m.strokeSize
			});
		}
	});
	
	//---------------------------------------

	iosocket.on('disconnect', function() {
		console.log("Disconnected")
	});
});


// When the user is typing and hits 'return', add the 
// message to the chat window and send the text to the server (and thus to others)
typingBox.addEventListener('keypress', function(event){
	var mymessage; // holds tet from the typingBox
	if(event.which == 13) {  // 'return' key
		event.preventDefault();

		//-----------get text, construct message object and send ------------------------------
		mymessage = typingBox.value;
		// update chatbox on own screen
		chatBox.value += uname + "> " + mymessage + "\n";
		typingBox.value = "";
		
		//-------------------------------------------------------------
		// update chatbox on others' screens
		iosocket.send({
			"username" : uname,
			"data" : mymessage,
			"datatype" : "chatText"
		});
	}
});


//---------------------------------------------
// Drawing chat 
//---------------------------------------------
svgdiv.addEventListener("mousedown", function(e) {
	mousePushed = true;
	pathString = `M${e.offsetX}, ${e.offsetY}`;
	raphaelPath = paper.path(pathString).attr({
		"stroke" : hslString,
		"stroke-width" : strokeSize
	});
});

svgdiv.addEventListener("mousemove", function(e) {
	if (mousePushed) {
		pathString += `L${e.offsetX}, ${e.offsetY}`;
		raphaelPath.attr("path", pathString);
	}
});

svgdiv.addEventListener("mouseup", function(e) {
	if (mousePushed) {
		pathString += `L${e.offsetX}, ${e.offsetY}`;
		raphaelPath.attr("path", pathString);
		mousePushed = false;
	}
	
	iosocket.send({
		"data" : pathString,
		"datatype" : "drawPath",
		"hsl" : hslString,
		"strokeSize" : strokeSize
	});
});

clearBtn.addEventListener("click", function() {
	paper.clear();
});

mySliders.forEach(function(slider) {
	slider.addEventListener("change", function(){
		hslString = `hsl(${hue.value}, ${saturation.value}, ${lightness.value})`
		console.log("hsl: " + hslString);
	});
});

let strokeBtn = document.getElementById("stroke");
strokeBtn.addEventListener("click", function(){
	strokeSize = strokeBtn.value;
	console.log("")
})

