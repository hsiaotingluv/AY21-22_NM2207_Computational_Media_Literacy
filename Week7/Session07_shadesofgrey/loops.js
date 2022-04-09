/*
var counter = 0;
while(counter <= 10) {
	console.log("counter is now " + counter);
	counter++;
}
*/

var randInt = function(max) {
	return Math.floor(max*Math.random());
}

var numbers = [];
var counter = 0;

while (counter < 100) {
	numbers[counter] = randInt(1000);
	counter++;
}

console.log("my long number list is " + numbers);
