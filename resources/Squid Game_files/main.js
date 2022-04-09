const svg = document.getElementById("mySVGCanvas");
const paper = new Raphael(svg);
const dimX = paper.width;
const dimY = paper.height;
const playerStartingPosition = dimX * 0.05; // player position at the start of game
const fixGameTime = 60; // fix time given for game

var countdownInterval;
var playerPosition = playerStartingPosition; // player position throughout the game
var timeLeft = fixGameTime; // time left throughout the game
//const gameSong = new Audio('./audio/red-light-green-light-bg.mp3');
//const killSong = new Audio('./audio/red-light-green-light-end.mp3');
//const winSong = new Audio('./audio/red-light-green-light-win.mp3');
var isDrawing = false;
var prevX, prevY;
var startingX, startingY;
var raphaelPath; // for holding the raphael path 
var pathString; // for holding the path string 

//============================================================
// Declare the variables needed for the game
const GameStateEnum = {
  "START" : 1,
  "GREEN" : 2,
  "RED" : 3,
  "WIN" : 4,
  "LOSE" : 5
};
const colorTheme = {
	"textColor" : "#ffffff",
	"brown" : "#8F6541",
	"honey" : "#e5ac3f",
	"grey" : "#7d7d7d",
	"red" : "#ed1b76",
	"green" : "#249f9c",
	"circle" : "#3d6040",
	"triangle" : "#c13228",
	"star" : "#fb9c01",
	"umbrella" : "#1770c2"
};
const shapeEnum = {
	"CIRCLE" : 1,
	"TRIANGLE" : 2,
	"STAR" : 3,
	"UMBRELLA" : 4
};
Object.freeze(GameStateEnum);
var gameState = GameStateEnum.START;
var shape;
var canvas = paper.rect(0, 0, dimX, dimY).attr({
  "fill" : "white"
});
var bg = paper.image("./resources/sugar-honeycombs-bg.jpeg", 0, 0, dimX, dimY);

//============================================================
// Shapes for sugar honeycombs
const circleButton = paper.rect(dimX/2*0.38, dimY/2-300, 150, 80).attr({
  "fill" : colorTheme.circle,
  "r" : 20,
  "stroke-width" : 0
});
const circleText = paper.text(dimX/2*0.38+75, dimY/2-260, 'Circle').attr({
  "font-size" : 20,
	"fill" : colorTheme.textColor,
});
const triangleButton = paper.rect(dimX/2*0.78, dimY/2-300, 150, 80).attr({
  "fill" : colorTheme.triangle,
  "r" : 20,
  "stroke-width" : 0
});
const triangleText = paper.text(dimX/2*0.78+75, dimY/2-260, 'Triangle').attr({
  "font-size" : 20,
	"fill" : colorTheme.textColor,
});
const starButton = paper.rect(dimX/2*1.17, dimY/2-300, 150, 80).attr({
  "fill" : colorTheme.star,
  "r" : 20,
  "stroke-width" : 0
});
const starText = paper.text(dimX/2*1.17+75, dimY/2-260, 'Star').attr({
  "font-size" : 20,
	"fill" : colorTheme.textColor,
});
const umbrellaButton = paper.rect(dimX/2*1.55, dimY/2-300, 150, 80).attr({
  "fill" : colorTheme.umbrella,
  "r" : 20,
  "stroke-width" : 0
});
const umbrellaText = paper.text(dimX/2*1.55+75, dimY/2-260, 'Umbrella').attr({
  "font-size" : 20,
	"fill" : colorTheme.textColor,
});

circleButton.node.addEventListener('click', function(){
	shape = shapeEnum.CIRCLE;
	startGame();
});
circleText.node.addEventListener('click', function(){
	shape = shapeEnum.CIRCLE;
	startGame();
});
triangleButton.node.addEventListener('click', function(){
	shape = shapeEnum.TRIANGLE;
	startGame();
});
triangleText.node.addEventListener('click', function(){
	shape = shapeEnum.TRIANGLE;
	startGame();
});
starButton.node.addEventListener('click', function(){
	shape = shapeEnum.STAR;
	startGame();
});
starText.node.addEventListener('click', function(){
	shape = shapeEnum.STAR;
	startGame();
});
umbrellaButton.node.addEventListener('click', function(){
	shape = shapeEnum.UMBRELLA;
	startGame();
});
umbrellaText.node.addEventListener('click', function(){
	shape = shapeEnum.UMBRELLA;
	startGame();
});


//============================================================
var timerText = paper.text(250, 100, `${timeLeft} seconds remaining`).attr({
  "font" : "Arial",
  "font-size" : 30
}); // cx, cy, text

var lefthand = paper.image("./resources/sugar-honeycombs-lh.png", -220, 290, 1600, 900);
var bottomLayer = paper.circle(dimX/2, dimY/2, 200).attr({
	"fill" : colorTheme.honey,
	"stroke" : colorTheme.grey,
	"stroke-width" : 10
}); // circular plate at the bottom
var tracingLayer;
var topLayer;
var startLine = paper.path(`M${dimX/2},${dimY/2-130}L${dimX/2},${dimY/2-115}`).attr({
	"stroke" : colorTheme.red,
  "stroke-width" : 5
});
// image of hand and needle
var needle = paper.image("./resources/sugar-honeycombs-rh.png", 190, 110, 1440, 810);
startingX = needle.attr("x");
startingY = needle.attr("y") + needle.attr("height");

const startButton = paper.rect(dimX/2-100, dimY/2+300, 200, 100).attr({
  "fill" : colorTheme.green,
  "r" : 20,
  "stroke-width" : 0
});
const startText = paper.text(dimX/2, dimY/2+350, 'START').attr({
  "font-size" : 20,
	"fill" : colorTheme.textColor,
//	"font" : "Game-of-Squids"
});
const quitButton = paper.rect(dimX/2-250, dimY/2+200, 200, 100).attr({
  "fill" : colorTheme.red,
  "r" : 20,
  "stroke-width" : 0
});
const quitText = paper.text(dimX/2-150, dimY/2+250, 'Quit').attr({
  "font-size" : 20,
	"fill" : colorTheme.textColor,
});
const replayButton = paper.rect(dimX/2+50, dimY/2+200, 200, 100).attr({
  "fill" : colorTheme.green,
  "r" : 20,
  "stroke-width" : 0
});
const replayText = paper.text(dimX/2+150, dimY/2+250, 'Play Again').attr({
  "font-size" : 20,
	"fill" : colorTheme.textColor,
});

//============================================================
let chooseShape = function() {
	
}

let init = function() {
	bg.attr({
  	"src" : "./resources/sugar-honeycombs-bg.jpeg"
	});
  timeLeft = fixGameTime; // reset time left
	pathString = null;
	raphaelPath = null;
	isDrawing = false;
  timerText.attr({
    "text" : `${timeLeft} seconds remaining`
  });
	needle.attr({
		"x" : 190,
		"y" : 110
	});
	createHoneycombs();
	
  startButton.hide();
  startText.hide();
  timerText.hide();
	quitText.hide();
	quitButton.hide();
	replayText.hide();
	replayButton.hide();
	needle.hide();
	lefthand.hide();
	topLayer.hide();
	tracingLayer.hide();
	bottomLayer.hide();
	startLine.hide();
}

// Initialise the game
let startGame = function() {
	bg.attr({
  	"src" : "./resources/sugar-honeycombs-bg.jpeg"
	});
  timeLeft = fixGameTime; // reset time left
	pathString = null;
	raphaelPath = null;
	isDrawing = false;
  timerText.attr({
    "text" : `${timeLeft} seconds remaining`
  });
	needle.attr({
		"x" : dimX/5,
		"y" : 110
	});
	createHoneycombs();
	
  startButton.show();
  startText.show();
  timerText.hide();
	quitText.hide();
	quitButton.hide();
	replayText.hide();
	replayButton.hide();
	needle.hide();
	lefthand.hide();
	topLayer.hide();
	tracingLayer.hide();
	bottomLayer.hide();
	startLine.hide();
	circleButton.hide();
	circleText.hide();
	triangleButton.hide();
	triangleText.hide();
	starButton.hide();
	starText.hide();
	umbrellaButton.hide();
	umbrellaText.hide();
};

let createHoneycombs = function() {
	if (shape == shapeEnum.CIRCLE) {
		tracingLayer = paper.circle(dimX/2, dimY/2, 130).attr({
			"fill" : colorTheme.brown,
			"stroke-width" : 0
		});
		topLayer = paper.circle(dimX/2, dimY/2, 115).attr({
			"fill" : colorTheme.honey,
			"stroke-width" : 0
		});
	} else if (shape == shapeEnum.TRIANGLE) {
		tracingLayer = paper.path(`M${dimX/2},${dimY/2-135}L${dimX/2-130},${dimY/2+60}L${dimX/2+130},${dimY/2+60}`).attr({
			"fill" : colorTheme.brown,
			"stroke-width" : 0
		});
		topLayer = paper.path(`M${dimX/2},${dimY/2-115}L${dimX/2-110},${dimY/2+50}L${dimX/2+110},${dimY/2+50}`).attr({
			"fill" : colorTheme.honey,
			"stroke-width" : 0
		});
	} else if (shape == shapeEnum.STAR) {
		tracingLayer = paper.path(`${star(dimX/2, dimY/2, 140)}`).attr({
			"fill" : colorTheme.brown,
			"stroke-width" : 0
		});
		topLayer = paper.path(`${star(dimX/2, dimY/2, 110)}`).attr({
			"fill" : colorTheme.honey,
			"stroke-width" : 0
		});
	} else {
		// umbrella
		tracingLayer = paper.path(`M${dimX/2-140},${dimY/2+20}, Q${dimX/2} ${dimY/3-100} ${dimX/2+140} ${dimY/2+20}, 		Q${dimX/2+85} ${dimY/3+170} ${dimX/2+65} ${dimY/2+15}, Q${dimX/2+35} ${dimY/3+170} ${dimX/2+23} ${dimY/2}, L${dimX/2+23}, ${dimY/2+120}, Q${dimX/2} ${dimY/2+175} ${dimX/2-40} ${dimY/2+125}, Q${dimX/2-55} ${dimY/2+100} ${dimX/2-23} ${dimY/2+80}, L${dimX/2-23}, ${dimY/2}, Q${dimX/2-35} ${dimY/3+175} ${dimX/2-65} ${dimY/2+15}, Q${dimX/2-75} ${dimY/3+180} ${dimX/2-90} ${dimY/2}`).attr({
			"fill" : colorTheme.brown,
			"stroke-width" : 0
		});
		topLayer = paper.path(`M${dimX/2-115},${dimY/2}, Q${dimX/2} ${dimY/3-45} ${dimX/2+115} ${dimY/2}, Q${dimX/2+85} ${dimY/3+150} ${dimX/2+65} ${dimY/2}, Q${dimX/2+35} ${dimY/3+150} ${dimX/2+10} ${dimY/2}, L${dimX/2+10}, ${dimY/2+115}, Q${dimX/2} ${dimY/2+150} ${dimX/2-30} ${dimY/2+120}, Q${dimX/2-30} ${dimY/2+90} ${dimX/2-20} ${dimY/2+100} T ${dimX/2-10} ${dimY/2+110}, L${dimX/2-10}, ${dimY/2}, Q${dimX/2-35} ${dimY/3+150} ${dimX/2-65} ${dimY/2}, Q${dimX/2-85} ${dimY/3+150} ${dimX/2-115} ${dimY/2}`).attr({
			"fill" : colorTheme.honey,
			"stroke-width" : 0
		});
	}
};

let star = function(x, y, r) {
  // start at the top point
	var path = "M" + x + "," + (y - r);
	// let's draw this the way we might by hand, by connecting each point the one two-fifths of the way around the clock
	for (var c = 0; c < 6; c += 1) {
		var angle = 270 + c * 144,
			rx = x + r * Math.cos(angle * Math.PI / 180),
			ry = y + r * Math.sin(angle * Math.PI / 180);
		path += "L" + rx + "," + ry;
	}    
	return path;
}

//============================================================
// Start the game
let start = function() {
	bg.attr({
  	"src" : "./resources/sugar-honeycombs-bg.jpeg"
	});
  gameState = GameStateEnum.GREEN;
  timeLeft = fixGameTime; //Reset timer
	
  startButton.hide();
  startText.hide();
	quitText.hide();
	quitButton.hide();
	replayText.hide();
	replayButton.hide();
	
	needle.show();
	lefthand.show();
	topLayer.show();
	tracingLayer.show();
	bottomLayer.show();
  timerText.show();
	startLine.show();

	needle.toFront();
	startLine.toFront();
  startTimer();
};

startButton.node.addEventListener('click', start);
startText.node.addEventListener('click', start);

let startTimer = function() {
  countdownInterval = setInterval(function () {
    if (timeLeft == -1) {
      gameState = GameStateEnum.LOSE;
      showEndScreen();
    } else {
      timerText.attr({
        'text' : `${timeLeft} seconds remaining`
      })
      timeLeft--;
    }
  }, 1000);
};

//============================================================
// Show end screen
let showEndScreen = function() {
//  player.pause(); // stop any animation of player
//  gameSong.pause(); // stop any gameSong that is still playing
  clearInterval(countdownInterval);
	isDrawing = false;
	
	// hide 
	needle.hide();
	lefthand.hide();
	topLayer.hide();
	tracingLayer.hide();
	bottomLayer.hide();
  timerText.hide();
	startLine.hide();
	if (raphaelPath != null) {
		raphaelPath.hide();
	}
  if (gameState == GameStateEnum.WIN) {
		bg.attr({
  		"src" : "./resources/sugar-honeycombs-win-screen.png"
		});
//    winSong.play();
//    winText.show();
  } else if (gameState == GameStateEnum.LOSE) {
		bg.attr({
  		"src" : "./resources/sugar-honeycombs-lose-screen.png"
		});
//    killSong.play();
		quitText.show();
		quitButton.show();
		replayText.show();
		replayButton.show();
  }
};

replayButton.node.addEventListener('click', init);
replayText.node.addEventListener('click', init);

////============================================================
needle.node.addEventListener("mousedown", function(ev) {
	if (gameState == GameStateEnum.GREEN) {
		isDrawing = true;
		prevX = ev.offsetX;
		prevY = ev.offsetY;

		// draw green path
		pathString = `M${ev.offsetX}, ${ev.offsetY}`;
		raphaelPath = paper.path(pathString).attr({
			"stroke" : colorTheme.green,
			"stroke-width" : 2
		});
	}
});

needle.node.addEventListener("mousemove", function(ev) {
	if (isDrawing && gameState == GameStateEnum.GREEN) {
		topLayer.hover(function(){
			if (isDrawing) {
				gameState = GameStateEnum.LOSE;
				console.log("YOU LOST!")
				showEndScreen();
			}
		}, function(){});
	
		needle.toFront();
		startLine.toFront();
		//Compute the transfrom from the center of the object to the mouse click
		needle.attr({
			"x" : ev.offsetX - prevX + needle.attr("x"),
			"y" : ev.offsetY - prevY + needle.attr("y")
		});
		prevX = ev.offsetX;
		prevY = ev.offsetY;
		
		// draw green path
		pathString += `L${ev.offsetX}, ${ev.offsetY}`;
		raphaelPath.attr("path", pathString);
		
		console.log("startX: " + startingX + " startY: " + startingY);
		console.log("curX: " + ev.offsetX + " curY: " + ev.offsetY);
		
		if (ev.offsetX == startingX && ev.offsetY == startingY) {
			gameState = GameStateEnum.WIN;
			console.log("YOU WON!")
			showEndScreen();
		}
	}
});

document.addEventListener("mouseup", function(ev) {
	if (isDrawing && gameState == GameStateEnum.GREEN) {
		// draw green path
		pathString += `L${ev.offsetX}, ${ev.offsetY}`;
		raphaelPath.attr("path", pathString);
		isDrawing = false;
	}
});

init();
















