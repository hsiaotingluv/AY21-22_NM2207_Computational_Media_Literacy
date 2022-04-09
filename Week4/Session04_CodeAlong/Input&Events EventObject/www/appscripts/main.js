console.log("yo");

let colorBox = document.getElementById("colorDisplay");

colorBox.addEventListener('mousedown', function(ev){
	console.log("--OK, got a mousedown event in colorBox");
	console.log("The target is " + ev.target);
	console.log("The id of our target element is " + ev.target.id);
	
	// The offsetX property returns the x-coordinate of the mouse pointer, relative to the target element.
	ev.target.innerHTML = "mouseX is " + ev.offsetX + ", and mouseY is " + ev.offsetY;
})