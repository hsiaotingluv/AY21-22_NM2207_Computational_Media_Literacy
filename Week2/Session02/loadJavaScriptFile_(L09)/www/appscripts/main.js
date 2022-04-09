// main.js
// Q: why style in js when we can style in css?
// A: js is running, can respond to user interaction / input / animation, while css is static 

console.log("yo");

let colorSpecBox = document.getElementById("colorSpec");
colorSpecBox.innerHTML = "YeeHaw!!"

let colorDisplayBox = document.getElementById("colorDisplay");
colorDisplayBox.style.backgroundColor = "green";