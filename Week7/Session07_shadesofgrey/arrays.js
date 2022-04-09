var movie_a = "Everest";
var movie_b = "Pan";
var movie_c = "Batman";

var movies = []; // initialising array
var movies = new Array(); // not the best way of initialising array

movies[0] = "Everest";
movies[1] = "Pan";
movies[2] = "Batman";

// The movie list is Everest,Pan,Batman
console.log("My movie list is " + movies);
// My favourite movie is Pan
console.log("My favourite movie is " + movies[1]);

console.log("The number of movies on my list is " + movies.length);

movies.sort();
// My movie list is Batman,Everest,Pan
console.log("My movie list is " + movies);

var randInt = function(max) {
	return Math.floor(max*Math.random());
}

var numbers = [];
numbers[0] = randInt(10);
numbers[1] = randInt(10);
numbers[2] = randInt(10);
numbers[3] = randInt(10);
numbers[4] = randInt(10);

console.log("my random numbers are ", numbers);
numbers.sort();
console.log("my random numbers SORTED are ", numbers);

