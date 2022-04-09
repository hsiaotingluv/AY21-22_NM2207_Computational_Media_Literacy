// main.js

console.log(`yo`);

/* assign3: font family for article in JavaScript */
var art = document.getElementById("article").style.fontFamily = "cursive,Charcoal,sans-serif";

/* assign3: center header text using javascript */
var art = document.getElementById("header").style.textAlign = "center";

let article = document.getElementById("article");
let hue = document.getElementById("hue");
let saturation = document.getElementById("saturation");
let lightness = document.getElementById("lightness");
let mySliders = document.querySelectorAll(".mySlider");
let opacity = document.getElementById("opacity");

function hslString(hue, saturation, lightness) {
	let hsl = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	return hsl;
};

mySliders.forEach(function(slider) {
	slider.addEventListener("change", function(){
		let hueValue = hue.value * 360;
		let saturationValue = saturation.value * 100;
		let lightnessValue = lightness.value * 100;
		let hsl = hslString(hueValue, saturationValue, lightnessValue);
		document.getElementById("article").style.backgroundColor = hsl;
		document.getElementById("article").style.opacity = opacity.value;
	});
});

/*
// suggested correct answer
hSlider.addEventListener("input", function(ev){
	article.stye.backgroundColor = hslString(hue.value, saturation.value, lightness.value);
})
*/

// Make the article completely opaque while the mouse is down, and set it back to the opacity slider setting when the mouse is up.

article.addEventListener('mousedown', function(){
	document.getElementById("article").style.opacity = 1;
});

article.addEventListener('mouseup', function(){
	document.getElementById("article").style.opacity = opacity.value;
});
