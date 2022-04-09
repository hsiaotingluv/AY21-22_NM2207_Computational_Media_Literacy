
console.log("yo, I'm alive!");

let paper = new Raphael(document.getElementById("mySVGCanvas"));
// Find get paper dimensions
let pWidth=paper.width;
let pHeight=paper.height;


let counter = 0;    // counts clicks on target object   
let maxCount = 10;  // game ends when this number is reached    
let starttime;      // keeps track of when the game starts  

// Start button with text on top
let startButton = paper.circle(pWidth/2, pHeight/2, 40);
let startText = paper.text(pWidth/2, pHeight/2, 'START');
startButton.attr({
    stroke: "black",
    fill: "green"
});

let hideStartButton = function(){
    startButton.hide();
    startText.hide();
}

let showStartButton = function(){
    startButton.show();
    startText.show();
}

//-----------------------------------------
// Create the target rect and put it "off screen" where it can't be seen until the game starts
rectWidth=100;
rectHeight=100;
let rect1 = paper.rect(-rectWidth,-rectHeight,rectWidth, rectHeight);
rect1.attr({
    'fill': "hsl(240, 50, 50)",
    'stroke': '#3b4449',
    'stroke-width': 10,
    'stroke-linejoin': 'round',
    'opacity': .75
});


// Return a random integer between m and n inclusive
 let randInt = function( m, n ) {
    let range = n-m+1;
    let frand = Math.random()*range;
    return m+Math.floor(frand);
}

// move the square to a random position inside the canvas play area
let moveSquareRandom = function(){
    // temp vars to hold the new square position indexes
    let posX = randInt(0,pWidth-rectWidth);  // get the (random) positions
    let posY = randInt(0,pHeight-rectHeight);
    // Use the positions to move the target square
    rect1.attr({
        x: posX,    
        y: posY
    });  
}

// Called when the start button is clicked to hide the startButton and begin the game
let start = function (){
    console.log("game is starting");
    hideStartButton();

    counter = 0;
    starttime = Date.now();
    console.log("time = " + starttime);

    moveSquareRandom();
}

startButton.node.addEventListener('click', start);


// If the game isn't over, move the square to a new random location
let gotcha = function(){
    // Counts the number of moves we've made so far
    counter++;
    console.log("your square move count is now " + counter);

    if (counter>maxCount) { // if true, then the game is over
        endGame();
    } else {  // the game continues, so just move the square
        moveSquareRandom();
    }
}

//-----------------
let endGame=function(){
    // Compute the duration of the game and convert from ms to secs
    let totaltime = (Date.now()-starttime)/1000;
    // Let the user know how they fared
    confirm("You completed the task in " + totaltime + " seconds");
    // move the square off screen
    rect1.attr({
        x: -rectWidth,
        y: -rectHeight
    });
    // Show the start button for another new session
    showStartButton();
}


rect1.node.addEventListener('click', gotcha);


