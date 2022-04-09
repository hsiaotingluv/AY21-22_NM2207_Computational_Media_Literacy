/* Coding Color */

console.log("yo");

// very useful DOM method: getElementById  - works for any element to which you gave an id
let box = document.getElementById("colorSpec");
let colorBox = document.getElementById("colorDisplay");

// What all can we do with an HTML element object? See: http://www.w3schools.com/jsref/dom_obj_all.asp
box.innerHTML="Yeehaw!";
colorBox.style.backgroundColor = "green";
colorBox.style.backgroundColor = "#FF0000"; // red
colorBox.style.backgroundColor = "rgb(100, 0, 200)"; // purple
colorBox.style.backgroundColor = "rgb(100, 0, 200, 0.5)"; // translucent purple
// hsl -> hue & saturation & light
colorBox.style.backgroundColor = "hsl(40, 50%, 50%)"; 
colorBox.style.backgroundColor = "rgb(" + 0 + "," + 50 + "," + 100 + ")";


let makeColorString = function(ir, ig, ib) {
	let colorstring = "rgb(" + ir + "," + ig + "," + ib + ")";
	console.log("Your new colorstring is " + colorstring);
	return colorstring;
}

colorBox.style.backgroundColor = makeColorString(25, 50, 120);

/*
// addEventListener
var myButton = document.getElementById("buttonID");

var function = function(ev) {
	alert("got a button press!");
}

myButton.addEventListener("click", myFunction);

// html input type
type = "selector"
type = "checkbox"
type = "radio"
type = "text"
type = "button"
e.g. <input type="range" min="100" max="1000" step="50">
*/