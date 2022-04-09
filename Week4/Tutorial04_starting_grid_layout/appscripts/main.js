// main.js

console.log(`yo`);

/* assign3: font family for article in RJavaScript */
document.getElementById("articleID").style.fontFamily = "cursive,Charcoal,sans-serif";

/* assign3: center header text using javascript */
document.getElementById("headerID").style.textAlign = "center";

var header = document.getElementById("headerID");
var counter = 0;

header.addEventListener("click", function(){
	counter += 100;
	console.log("clicked successfully");
	header.innerHTML = `OK, I have now received ${counter} clicks!`;
});

var mySlider = document.getElementById("mySlider");

// 'change' and 'click' track discrete change, 'input' tracks continuous change
mySlider.addEventListener("input", function() {
	console.log(`${mySlider.value}`);
	let color = Math.floor(mySlider.value * 255);
	console.log(color);
	header.style.backgroundColor = `rgb(${color}, ${color}, ${color})`;
});

let option1 = document.getElementById("option1");
let option2 = document.getElementById("option2");

option1.addEventListener("click", function(){
	console.log("option 1 selected!")
	document.getElementById("asideID").style.backgroundImage = "url('https://i.ytimg.com/vi/w3HScdqFHCQ/maxresdefault.jpg')";
	document.body.style.backgroundImage = "url('../resources/water1.jpg')";
});

option2.addEventListener("click", function(){
	console.log("option 2 selected!")
	document.getElementById("asideID").style.backgroundImage = "url('../resources/water1.jpg')";
	document.body.style.backgroundImage = "url('https://i.ytimg.com/vi/w3HScdqFHCQ/maxresdefault.jpg')";
});

//--------------------------------------------------------------

