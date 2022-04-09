/* Input and Events */

let yo = function() {
	console.log("yo");
}

yo();

let doitButton = document.getElementById("doitButton");
let colorBox = document.getElementById("colorDisplay");
let mySlider = document.getElementById("mySlider");

// anonymous function - when you don't need the function anywhere else
// addEventListener(event, function)
doitButton.addEventListener("click", function(ev) {
	// pop up alert message
	// alert("OK, button was clicked");
	
	// get text input from text box
	let textElement = document.getElementById("userColor");
	// get value of user input 
	let hColor = textElement.value;
	
	console.log("your hex color string is " + hColor);
	
	// get colorbox
	colorBox.style.backgroundColor = hColor;
});

mySlider.addEventListener("input", function(ev) {
	colorBox.style.opacity = mySlider.value;
})
