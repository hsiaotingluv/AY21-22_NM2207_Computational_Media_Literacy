// main.js

let article = document.getElementById("article");
article.innerHTML = "<em>Welcome to Week 3 Challenge!<em>";

// Returns the difference between two input numbers
function foo(num1, num2) {
	console.log("you are in the foo function!");
	let result = Math.abs(num1 - num2);
	return result;
}

// use var rather than let or const so that it can be redeclared again
var num1 = 7;
var num2 = 100;
var difference = foo(num1, num2);

article.innerHTML += "<br><br>The difference between " + num1 + " and " + num2 + " is " + difference;

// Returns an object with 3 properties, "sum", "difference" and "product"
function multi(num1, num2) {
	console.log("you are in the multi function!");
	let result = {
		"sum" : num1 + num2,
		"difference" : Math.abs(num1 - num2),
		"product" : num1 * num2
	} 
	return result;
}

var num1 = 7;
var num2 = 100;
var multiply = multi(num1, num2);

const sum = `The sum of ${num1} and ${num2} is ${multiply.sum}`;
const diff = `The difference of ${num1} and ${num2} is ${multiply.difference}`; 
const product = `The product of ${num1} and ${num2} is ${multiply.product}`;

article.innerHTML += "<br><br>" + sum + "<br>" + diff + "<br>" + product;

var point1 = {
	"x" : 10,
	"y" : 20
}

var point2 = {
	"x" : 10,
	"y" : 20
}

// Returns the sum of two input points
function pointSum(point1, point2) {
	let sum = {
		"x" : point1.x + point2.y,
		"y" : point1.y + point2.y
	}
	
	return sum;
}

var pointSum = pointSum(point1, point2);

const pointSumString = "The sum of " + JSON.stringify(point1) + " and " + JSON.stringify(point2) + " is " + JSON.stringify(pointSum);

article.innerHTML += "<br><br>" + pointSumString;

// Bonus Round 2: create a dynamic paragraph element in article

// create paragraph element
let pElement = document.createElement('p');

// create text node
let pElementText = document.createTextNode('Bonus 2: This is a dynamically created paragraph element!');

// append text node to paragraph
pElement.appendChild(pElementText);

// get handle of article element where we need to insert dynamic element
let parent = document.querySelector('#article');

// append div element to document
parent.appendChild(pElement);
