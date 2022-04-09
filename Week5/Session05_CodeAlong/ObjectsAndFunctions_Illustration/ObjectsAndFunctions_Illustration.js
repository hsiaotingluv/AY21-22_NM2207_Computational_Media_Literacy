
// Create an object as a variable with a name that we can refer to
var myObj = {
	"name": "myPoint",
	"cx": 3,
	"cy:": 100,
	"anotherObj" : {'att': value, ...},
	"foofunc" : function() {...}
}

// Use it by name
foo = myObj.x;
myObj.cx=999999999999999;
myObj.newProp = 42;   // note: can add poperties to an object any time
someObject.f(myObj);

// Create an object "literal" with no name right were we need it
someObj.attr( { 'cx': 3, 'cy': 100} );

//-------------------------------------------------------

// Create a function that we can refer to by name
var myFunc = function(arg1, arg2){  // we can define a function to take "arguments" or "parameters" 
									//(they can be anything: numbers, strings, objects, functions)
	var foo = arg1 +1;      // we can use the function args inside the function
	var bar = arg2(foo);    // as long as the right kind of objects were passed in.
	statement1;
	statement2;
	...
	return something;
}

// Use it:
// by calling it so that it "executes", the returned value gets assign to variable myVar
myVar = myFunc(a,b);
// or by referring to it by name when we, for example, pass a function as an argument 
someObj.foo(arg1, arg2, arg3, myFunc);  //often referred to as a "callback" since the function will 
										//      get called back later (not evaluated now)

//Create a function "anonymously" with no name where we need it
someObj.foo(arg1, arg2, function(){   // we could define it to take input arguments if we wished. 
	statement1;
	statement2;
	...
	return something;
});

// We often do this for event listeners.
someObj.addEventListener( 'event', function(ev) { // note: event callback funcs almost always 
													//        take an event as an argument
	var x = event.offsetX; // for example
	...
	});

//-----------------------------------
// functions can also be attached as attributes to objects

var myObj = {
	'foo': 3,
	'bar' : "Yo, man!",
	'myFunc' : function( printString ){
				alert(myObj.bar + printString);
				} // note this function happens to refer to one of this objects properties (bar)
}

// Use it:
myObj.myFunc(" What's up?");


