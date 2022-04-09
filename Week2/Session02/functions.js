console.log("yo");

var greeting = function (name) {
	var myGreeting = "Hello " + name + ", glad to meet you!";
	return myGreeting;
}

var name1 = "Michelle";
var name2 = "Kelvin";

var response;

response = greeting(name1);

console.log(response);
console.log("ah, and is there anyone else?");

console.log(greeting(name2));