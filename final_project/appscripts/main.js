//=========================================================================================
//=================================== GAME VARIABLES ======================================
//=========================================================================================

const svg = document.getElementById("mySVGCanvas");
const paper = new Raphael(svg);
const dimX = paper.width;
const dimY = paper.height;

const beginSong = new Audio('./audio/Let’s-Go-Out-Tonight-Squid-Game-OST.mp3');
const wakeupSong = new Audio('./audio/Franz-Joseph-Haydn-Trumpet-Concerto-in-E-Flat-Major,Hob.VII-e_1_ III.Finale_Squid-Game-OST.mp3');
const pinkSoldierSong = new Audio('./audio/Pink-Soldiers_Squid-Game-OST.mp3');
const piggyBankSong = new Audio('./audio/The-Fat-and-the-Rats-Squid-Game-OST.mp3');
const winTextSong = new Audio('./audio/Pyotr-Ilyich-Tchaikovsky-Serenade-for-Strings,Op.48-Waltzer-Squid-Game-OST.mp3');

const joinButton = paper.rect(dimX/2-100, dimY/2+300, 200, 100).attr({
  "fill" : "#249f9c",
  "r" : 20,
  "stroke-width" : 0
});
const joinText = paper.text(dimX/2, dimY/2+350, 'ENTER GAME').attr({
  "font-size" : 20,
	"fill" : "white",
});
const clickText = paper.text(dimX/2, dimY/2, 'click anywhere to begin...').attr({
  "font-size" : 30,
	"fill" : "white",
	"font-family" : 'Grape Nuts'
});

const TextStateEnum = {
  "INTRO" : 1,
  "MAN" : 2,
  "INVITATION" : 3,
  "SQUID_GAME_LOGO" : 4,
  "ROOM" : 5,
	"WAKEUP" : 6,
	"PINK_SOLDIER" : 7,
	"PIGGY_BANK" : 8,
	"START_GAME" : 9,
	"WIN_1" : 10,
	"WIN_2" : 11,
	"WIN_3" : 12
};

var isStory = true;
var textState = TextStateEnum.INTRO;
var introText =	'UGH!! I can’t believe it!' + '\n \n' +
	'I just got fired!' + '\n \n' +
	'Nevermind, who cares about that crazy old man, I don’t want to work under him anyways!' + '\n \n' +
	'Well, I used to dream about starting a business and make big money...' + '\n \n' +
	'I tried' + '\n \n' +
	'twice' + '\n \n' +
	'Both failed badly' + '\n \n' +
	'Now I’m left with a debt of 160 million won to loan sharks, and 255 million won to the bank…' + '\n \n' +
	'I need to return those money, if not I won’t be able to survive till next month!' + '\n \n' +
	'And I need money to pay my overdue bills too, that landlady is really losing all her patient with me!' + '\n \n' +
	'I need money…' + '\n \n' +
	'a lot of money…' + '\n \n';

var raphaelText = paper.text(dimX/2, dimY*1.43, "").attr({
	"font-size" : 30,
	"fill" : 'white',
	"font-family" : 'Grape Nuts'
});



//=========================================================================================
//=========================== RED LIGHT GREEN LIGHT VARIABLES =============================
//=========================================================================================

const maxPlayBackRate = 3.2;
const playBackRateMultiplier = 0.5;
const playerSpeed = 100; // transform animation duration in milliseconds
const playerTravel = dimX * 0.002; // pixels translated in x axis for player object
const finishLinePosition = dimX * 0.7;
const playerStartingPosition = dimX * 0.05; // player position at the start of game
const fixGameTime = 60; // fix time given for game

var countdownInterval;
var playerPosition = playerStartingPosition; // player position throughout the game
var timeLeft = fixGameTime; // time left throughout the game

const gameSong_rlgl = new Audio('./audio/red-light-green-light-bg.mp3');
const killSong_rlgl = new Audio('./audio/gun-shot.mp3');
const winSong_rlgl = new Audio('./audio/Way-Back-then_Squid-Game-OST.mp3');
const rlglSongs = [gameSong_rlgl, killSong_rlgl, winSong_rlgl];

//============================================================
// Declare the variables needed for the game
const GameStateEnum = {
  "START" : 1,
  "GREEN" : 2,
  "RED" : 3,
  "WIN" : 4,
  "LOSE" : 5,
};
const colorTheme_rlgl = {
	"textColor" : "#ffffff",
	"red" : "#ed1b76",
	"green" : "#249f9c",
};
Object.freeze(GameStateEnum);
var gameState = GameStateEnum.START;

var canvas = paper.rect(0, 0, dimX, dimY).attr({
  "fill" : "white"
});
var bg = paper.image("./resources/bg.jpeg", 0, 0, dimX, dimY);
var finishLine = paper.path(`M ${finishLinePosition},${dimY*0.65} L ${finishLinePosition},${dimY}`).attr({
  "stroke" : colorTheme_rlgl.red,
  "stroke-width" : 10
});
var player = paper.image("./resources/red-light-green-light-player.png", playerStartingPosition, dimY*0.6, 300, 300); // file path, x, y, width, height
var killerRobot = paper.circle(dimX*0.7, dimY*0.25, 200).attr({
  "fill" : "url('./resources/red-light-green-light-not-looking.png')",
	"stroke" : colorTheme_rlgl.green,
	"stroke-width" : 10
});
var timerText = paper.text(250, 100, `${timeLeft} seconds remaining`).attr({
  "font" : "Arial",
  "font-size" : 30
}); // cx, cy, text
const startButton_rlgl = paper.rect(dimX/2-100, dimY/2+300, 200, 100).attr({
  "fill" : colorTheme_rlgl.green,
  "r" : 20,
  "stroke-width" : 0
});
const startText_rlgl = paper.text(dimX/2, dimY/2+350, 'START').attr({
  "font-size" : 20,
	"fill" : colorTheme_rlgl.textColor,
});
const continueButton_rlgl = paper.rect(dimX/2-100, dimY/2+300, 200, 100).attr({
  "fill" : colorTheme_rlgl.green,
  "r" : 20,
  "stroke-width" : 0
});
const continueText_rlgl = paper.text(dimX/2, dimY/2+350, 'CONTINUE').attr({
  "font-size" : 20,
	"fill" : colorTheme_rlgl.textColor,
});
const replayButton = paper.rect(dimX/2-100, dimY/2+300, 200, 100).attr({
  "fill" : colorTheme_rlgl.green,
  "r" : 20,
  "stroke-width" : 0
});
const replayText = paper.text(dimX/2, dimY/2+350, 'Play Again').attr({
  "font-size" : 20,
	"fill" : colorTheme_rlgl.textColor,
});
const hide_sugarHoneycombs = function() {
	circleButton.hide();
	circleText.hide();
	triangleButton.hide();
	triangleText.hide();
	starButton.hide();
	starText.hide();
	chooseShapeTextBox.hide();
	chooseShapeText.hide();
	startButton_sugarHoneycombs.hide();
	startText_sugarHoneycombs.hide();
	needle.hide();
	lefthand.hide();
	topLayer.hide();
	tracingLayer.hide();
	bottomLayer.hide();
	startLine.hide();
	continueButton_sugarHoneycombs.hide();
	continueText_sugarHoneycombs.hide();
	
	joinButton.hide();
	joinText.hide();
	clickText.hide();
};
const hide_rlgl = function() {
	startButton_rlgl.hide();
  startText_rlgl.hide();
  player.hide();
  killerRobot.hide();
  finishLine.hide();
	continueButton_rlgl.hide();
	continueText_rlgl.hide();
	
	joinButton.hide();
	joinText.hide();
	clickText.hide();
};
const hide_all_games = function() {
	startButton_rlgl.hide();
  startText_rlgl.hide();
  player.hide();
  killerRobot.hide();
  timerText.hide();
  finishLine.hide();
	continueButton_rlgl.hide();
	continueText_rlgl.hide();
	replayText.hide();
	replayButton.hide();
	
	circleButton.hide();
	circleText.hide();
	triangleButton.hide();
	triangleText.hide();
	starButton.hide();
	starText.hide();
	chooseShapeTextBox.hide();
	chooseShapeText.hide();
	startButton_sugarHoneycombs.hide();
	startText_sugarHoneycombs.hide();
	continueButton_sugarHoneycombs.hide();
	continueText_sugarHoneycombs.hide();
	needle.hide();
	lefthand.hide();
	topLayer.hide();
	tracingLayer.hide();
	bottomLayer.hide();
	startLine.hide();
	
	joinButton.hide();
	joinText.hide();
	clickText.hide();
}



//=========================================================================================
//============================= SUGAR HONEYCOMBS VARIABLES ================================
//=========================================================================================

const DEBUG_TRANS = 0; // color to show transparent layer

// custom path for transparent sugar honeycombs
paper.customAttributes.customPath = function (x, y) {
	// use with .attr({pathXY: [x,y]});
	// call element.pathXY() before animating with .animate({pathXY: [x,y]})
	var pathArray = Raphael.parsePathString(this.attr('path'));
	var transformArray = ['T', x - this.pathXY('x'), y - this.pathXY('y')];
	return {
		path: Raphael.transformPath(pathArray, transformArray)
	};
};

// helper function to get x y coordinates of starting position
// pass 'x' or 'y' to get x or y pos of element
// pass nothing to initiate element for pathXY animation
// can use in same way for elements and sets alike
Raphael.el.pathXY = function (xy) {
	if (xy == 'x' || xy == 'y') { // to get x or y of path	
		xy = (xy == 'x') ? 1 : 2;
		var pathPos = Raphael.parsePathString(this.attr('path'))[0][xy];
		return pathPos;
	} else {
		// to initialise a path's pathXY, for animation
		this.attr({ customPath: [this.pathXY('x'), this.pathXY('y')] });
	}
};

var passCheckPoint = false; // check if player makes one complete round
var selectedShape;
const sugarHoneyCombsGameSong = new Audio('./audio/Pink-Soldiers_Squid-Game-OST.mp3');
const sugarHoneyCombsLoseSong = new Audio('./audio/gun-shot.mp3');
const sugarHoneyCombsWinSong = new Audio('./audio/Way-Back-then_Squid-Game-OST.mp3');
var isDrawing = false; // check if mouse down
var prevNeedleX, prevNeedleY; // coordinates of previous mouse location when moved

// green traced line drawn by player
var playerPathX = 0; // x coordinate centered on tracing layer
var playerPathY = 0; // y coordinate centered on tracing layer
var playerPath; // raphael path for tracing player's mouse down movement
var playerPathString; // path string for raphael path

// Offsets to track player progress to reposition transparent sugar honeycombs
// tracing layer when player mouse down again
var playerProgressOffsetX = 0;
var playerProgressOffsetY = 0;

// Store mouse down position to calculate overall progress offset when mouse up
var prevProgressX = 0;
var prevProgressY = 0;

const colorTheme_sugarHoneycombs = {
	"textColor": "#ffffff",
	"brown": "#8F6541",
	"honey": "#e5ac3f",
	"grey": "#7d7d7d",
	"red": "#ed1b76",
	"green": "#249f9c",
	"circle": "#3d6040",
	"triangle": "#c13228",
	"star": "#fb9c01",
};
const shapeEnum = {
	"CIRCLE": 0,
	"TRIANGLE": 1,
	"STAR": 2,
};
Object.freeze(shapeEnum);

const outerCircleRadius = 130;
const innerCircleRadius = 115;

// Outer shape of honey comb
var tracingLayer = paper.path();
// Inner fill shape
var topLayer = paper.path();
// Duplicate transparent to track movement at needle/hand location
var tracingLayerTrans = paper.path();
var topLayerTrans = paper.path();

// X and Y offsets between top and tracing layers
var topTracingLayerOffsetX = 0;
var topTracingLayerOffsetY = 0;

// Offset shape so that mouse is within tracing layer
const extraOffset = 10; // Circle and Triangle
const extraStarOffset = 15; // Star

// Offset Y of checkpoint according to shape
var checkPointOffset = 0;

const circleButton = paper.rect(dimX / 2 * 0.41, dimY / 2 - 300, 150, 80).attr({
	"fill": colorTheme_sugarHoneycombs.circle,
	"r": 20,
	"stroke-width": 0
});
const circleText = paper.text(dimX / 2 * 0.41 + 75, dimY / 2 - 260, 'Circle').attr({
	"font-size": 20,
	"fill": colorTheme_sugarHoneycombs.textColor,
});
const triangleButton = paper.rect(dimX / 2 * 0.96, dimY / 2 - 300, 150, 80).attr({
	"fill": colorTheme_sugarHoneycombs.triangle,
	"r": 20,
	"stroke-width": 0
});
const triangleText = paper.text(dimX / 2 * 0.96 + 75, dimY / 2 - 260, 'Triangle').attr({
	"font-size": 20,
	"fill": colorTheme_sugarHoneycombs.textColor,
});
const starButton = paper.rect(dimX / 2 * 1.49, dimY / 2 - 300, 150, 80).attr({
	"fill": colorTheme_sugarHoneycombs.star,
	"r": 20,
	"stroke-width": 0
});
const starText = paper.text(dimX / 2 * 1.49 + 75, dimY / 2 - 260, 'Star').attr({
	"font-size": 20,
	"fill": colorTheme_sugarHoneycombs.textColor,
});
const chooseShapeTextBox = paper.rect(dimX * 0.1, dimY / 2 + 225, dimX / 1.25, 150).attr({
	"fill": "black",
	"opacity": 0.5
});
const chooseShapeText = paper.text(dimX / 2, dimY / 2 + 300, 'Before the game begins, choose from one of the shapes').attr({
	"font-size": 40,
	"fill": colorTheme_sugarHoneycombs.textColor,
});
const startButton_sugarHoneycombs = paper.rect(dimX / 2 - 100, dimY / 2 + 300, 200, 100).attr({
	"fill": colorTheme_sugarHoneycombs.green,
	"r": 20,
	"stroke-width": 0
});
const startText_sugarHoneycombs = paper.text(dimX / 2, dimY / 2 + 350, 'START').attr({
	"font-size": 20,
	"fill": colorTheme_sugarHoneycombs.textColor,
});
var lefthand = paper.image("./resources/sugar-honeycombs-lh.png", dimX / 3, dimY / 4, 480, 1080);
var bottomLayer = paper.circle(dimX / 2, dimY / 2, 200).attr({
	"fill": colorTheme_sugarHoneycombs.honey,
	"stroke": colorTheme_sugarHoneycombs.grey,
	"stroke-width": 10
}); // circular plate at the bottom

var startLine = paper.path(`M${dimX / 2},${dimY / 2 - 130}L${dimX / 2},${dimY / 2 - 115}`).attr({
	"stroke": colorTheme_sugarHoneycombs.red,
	"stroke-width": 5,
});

// image of hand and needle
var needle = paper.image("./resources/sugar-honeycombs-rh.png", dimX / 2, dimY / 2 - 130 - 0.38 * 750, 900, 750);

const continueButton_sugarHoneycombs = paper.rect(dimX/2-100, dimY/2+300, 200, 100).attr({
  "fill" : "#249f9c",
  "r" : 20,
  "stroke-width" : 0
});
const continueText_sugarHoneycombs = paper.text(dimX/2, dimY/2+350, 'CONTINUE').attr({
  "font-size" : 20,
	"fill" : "white",
});



//=========================================================================================
//================================ STORYPLOT ANIMATION ====================================
//=========================================================================================

hide_all_games();

let startText = function() {
	console.log("CLICKED");
	if (!isStory) {
		return;
	};
	
	if (textState == TextStateEnum.INTRO) {
		raphaelText.show();
		raphaelText.toFront();
		clickText.hide();
		
		raphaelText.attr({
			"text" : introText,
		});
		
		raphaelText.animate({
			"y" : dimY/2
		}, 15000, "easeInOut");
		textState = TextStateEnum.MAN;
		
		beginSong.currentTime = 0;
		beginSong.play();
		
	} else if (textState == TextStateEnum.MAN) {
		raphaelText.hide();
		bg.attr({
  		"src" : "./resources/invitation-text.png"
		});
		textState = TextStateEnum.INVITATION;
		
	} else if (textState == TextStateEnum.INVITATION) {
		bg.attr({
  		"src" : "./resources/invitation-card.png"
		});
		textState = TextStateEnum.ROOM;

	} else if (textState == TextStateEnum.ROOM) {
		raphaelText.hide();
		bg.attr({
  		"src" : "./resources/squid_game_room.png"
		});
		textState = TextStateEnum.WAKEUP;
		
		beginSong.pause();
		wakeupSong.currentTime = 0;
		wakeupSong.play();
		
	} else if (textState == TextStateEnum.WAKEUP) {
		raphaelText.hide();
		bg.attr({
  		"src" : "./resources/wakeup.png"
		});
		textState = TextStateEnum.PINK_SOLDIER;
		
	} else if (textState == TextStateEnum.PINK_SOLDIER) {
		raphaelText.hide();
		bg.attr({
  		"src" : "./resources/pink-soldier.png"
		});
		textState = TextStateEnum.PIGGY_BANK;
		
	} else if (textState == TextStateEnum.PIGGY_BANK) {
		raphaelText.hide();
		bg.attr({
  		"src" : "./resources/piggy-bank.png"
		});
		textState = TextStateEnum.START_GAME;
		
		wakeupSong.pause();
		piggyBankSong.currentTime = 0;
		piggyBankSong.play();
		
	} else if (textState == TextStateEnum.START_GAME) {
		raphaelText.hide();
		bg.attr({
  		"src" : "./resources/start-game.png"
		});
		
		joinButton.show();
		joinText.show();
		joinButton.toFront();
		joinText.toFront();
		
		piggyBankSong.pause();
		wakeupSong.play();
		
	} else if (textState == TextStateEnum.WIN_1) {
		bg.attr({
  		"src" : "./resources/winText1.png"
		});
		textState = TextStateEnum.WIN_2;
		
	} else if (textState == TextStateEnum.WIN_2) {
		bg.attr({
  		"src" : "./resources/winText2.png"
		});
		textState = TextStateEnum.WIN_3;

	} else if (textState == TextStateEnum.WIN_3) {
		bg.attr({
  		"src" : "./resources/winText3.png"
		});
	} else {
	};
};

document.addEventListener("click", startText);

let init = function() {
	isStory = true;
	textState = TextStateEnum.INTRO;
	raphaelText.attr("y", dimY*1.43);
	bg.attr({
		"src" : "./resources/bg.jpeg"
	});
	
	hide_all_games();
	clickText.show();
	clickText.toFront();
}

let returnToStory = function() {
	hide_all_games();
	isStory = true;
	textState = TextStateEnum.WIN_1;
	
	sugarHoneyCombsWinSong.pause();
	winTextSong.currentTime = 1;
	winTextSong.play();
}


//=========================================================================================
//============================= RED LIGHT GREEN LIGHT GAME ================================
//=========================================================================================

// Initialise the game
let init_rlgl = function() {
	console.log("START GAME");
	isStory = false;
	wakeupSong.pause();
	
	bg.attr({
  	"src" : "./resources/red-light-green-light-instruction.png"
	});
  timeLeft = fixGameTime; // reset time left
	playerPosition = playerStartingPosition; // reset player starting position
  light = 'green';
//  repeater = null;
  player.attr({
    "x" : playerPosition
  });
  timerText.attr({
    "text" : `${timeLeft} seconds remaining`
  });
  killerRobot.attr({
    "fill" : "url('./resources/red-light-green-light-not-looking.png')",
		"stroke" : colorTheme_rlgl.green
  });
	rlglSongs[0].playbackRate = 1;

  startButton_rlgl.show();
  startText_rlgl.show();

  player.hide();
  killerRobot.hide();
  timerText.hide();
  finishLine.hide();
	
	continueButton_rlgl.hide();
	continueText_rlgl.hide();
	
	replayText.hide();
	replayButton.hide();
	hide_sugarHoneycombs();
};

joinButton.node.addEventListener('click', init_rlgl);
joinText.node.addEventListener('click', init_rlgl);

//============================================================
// Start the game
let start_rlgl = function() {
  gameState = GameStateEnum.GREEN;
  timeLeft = fixGameTime; //Reset timer

  startButton_rlgl.hide();
  startText_rlgl.hide();
	
	continueButton_rlgl.hide();
	continueText_rlgl.hide();
	
	replayText.hide();
	replayButton.hide();

  player.show();
  killerRobot.show();
  timerText.show();
  finishLine.show();

  startTimer_rlgl();
  startGame_rlgl();
};

startButton_rlgl.node.addEventListener('click', start_rlgl);
startText_rlgl.node.addEventListener('click', start_rlgl);

function startTimer_rlgl() {
  countdownInterval = setInterval(function () {
    if (timeLeft == -1) {
      gameState = GameStateEnum.LOSE;
      showEndScreen_rlgl();
    } else {
      timerText.attr({
        'text' : `${timeLeft} seconds remaining`
      })
      timeLeft--;
    }
  }, 1000);
};

function startGame_rlgl() {
	bg.attr({
  	"src" : "./resources/red-light-green-light-bg.png"
	});
	rlglSongs[0].currentTime = 0;
  rlglSongs[0].play();
  rlglSongs[0].onended = function() {
    gameState = GameStateEnum.RED;
    const redLightDuration = (Math.random() * 1000) + 500; // 0.5 to 1.5 seconds
    killerRobot.attr({
      "fill" : "url('./resources/red-light-green-light-looking.png')",
			"stroke" : colorTheme_rlgl.red
    });

		// play song during red light
    setTimeout(function() {
      if (gameState == GameStateEnum.WIN || gameState == GameStateEnum.LOSE) return;
      gameState = GameStateEnum.GREEN;
      killerRobot.attr({
        "fill" : "url('./resources/red-light-green-light-not-looking.png')",
				"stroke" : colorTheme_rlgl.green
      })
      
      const newSongSpeed = rlglSongs[0].playbackRate + Math.random()*playBackRateMultiplier;
			// max song speed cap at maxPlayBackRate
      rlglSongs[0].playbackRate = newSongSpeed > maxPlayBackRate ? maxPlayBackRate : newSongSpeed;
 
			rlglSongs[0].currentTime = 0;
      rlglSongs[0].play();

    }, redLightDuration);
  };
};

//============================================================
// Show end screen
function showEndScreen_rlgl() {
  player.pause(); // stop any animation of player
  rlglSongs[0].pause(); // stop any gameSong that is still playing
  clearInterval(countdownInterval);

	// hide 
	player.hide();
  killerRobot.hide();
  timerText.hide();
  finishLine.hide();

  if (gameState == GameStateEnum.WIN) {
		bg.attr({
  		"src" : "./resources/red-light-green-light-win-screen.png"
		});
    rlglSongs[2].play();
		continueButton_rlgl.show();
		continueText_rlgl.show();
  } else if (gameState ==  GameStateEnum.LOSE) {
		bg.attr({
  		"src" : "./resources/red-light-green-light-lose-screen.png"
		});
    rlglSongs[1].play();
		replayText.show();
		replayButton.show();
  }
};

replayButton.node.addEventListener('click', init);
replayText.node.addEventListener('click', init);

//============================================================
// Move player
document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    if (gameState == GameStateEnum.GREEN) {
      playerPosition += playerTravel;

			// move player if space bar is pressed, check win or lose condition
      player.animate({'x' : playerPosition}, playerSpeed, "linear", function(){
        // win if player object is beyong finish line
        if (playerPosition > finishLinePosition - 150) {
          gameState = GameStateEnum.WIN;
          showEndScreen_rlgl();
        }
      });

    } else if (gameState == GameStateEnum.RED) {
      // lose if space clicked during RED light
      gameState = GameStateEnum.LOSE;
      showEndScreen_rlgl();
    }
  }
});



//=========================================================================================
//================================ SUGAR HONEYCOMBS GAME ==================================
//=========================================================================================

// detect user selection of shape for sugar honeycombs
circleButton.node.addEventListener('click', function () {
	selectedShape = shapeEnum.CIRCLE;
	createHoneycombs();
	startGame_sugarHoneycombs();
});
circleText.node.addEventListener('click', function () {
	selectedShape = shapeEnum.CIRCLE;
	createHoneycombs();
	startGame_sugarHoneycombs();
});
triangleButton.node.addEventListener('click', function () {
	selectedShape = shapeEnum.TRIANGLE;
	createHoneycombs();
	startGame_sugarHoneycombs();
});
triangleText.node.addEventListener('click', function () {
	selectedShape = shapeEnum.TRIANGLE;
	createHoneycombs();
	startGame_sugarHoneycombs();
});
starButton.node.addEventListener('click', function () {
	selectedShape = shapeEnum.STAR;
	createHoneycombs();
	startGame_sugarHoneycombs();
});
starText.node.addEventListener('click', function () {
	selectedShape = shapeEnum.STAR;
	createHoneycombs();
	startGame_sugarHoneycombs();
});

//============================================================
// Initialise the game
let init_sugarHoneycombs = function () {
	winSong_rlgl.pause();
	
	sugarHoneyCombsGameSong.currentTime = 0;
	sugarHoneyCombsGameSong.play();
	// loop audio when it finishes
	sugarHoneyCombsGameSong.addEventListener("ended", function () {
		sugarHoneyCombsGameSong.currentTime = 0;
		sugarHoneyCombsGameSong.play();
	}, false);
	
	gameState = GameStateEnum.START;
	bg.attr({
		"src": "./resources/sugar-honeycombs-bg.png"
	});
	timeLeft = fixGameTime; // reset time left
	playerPathString = null;
	playerPath = null;
	isDrawing = false;
	timerText.attr({
		"text": `${timeLeft} seconds remaining`
	});
	needle.attr({
		"x": dimX / 2,
		"y": dimY / 2 - 130 - 0.38 * 750,
	});

	playerProgressOffsetX = 0;
	playerProgressOffsetY = 0;

	circleButton.show();
	circleText.show();
	triangleButton.show();
	triangleText.show();
	starButton.show();
	starText.show();
	chooseShapeTextBox.show();
	chooseShapeText.show();

	startButton_sugarHoneycombs.hide();
	startText_sugarHoneycombs.hide();
	timerText.hide();
	replayText.hide();
	replayButton.hide();
	needle.hide();
	lefthand.hide();
	topLayer.hide();
	tracingLayer.hide();
	bottomLayer.hide();
	startLine.hide();
	hide_rlgl();
};

// instruction page 
let startGame_sugarHoneycombs = function () {
	bg.attr({
		"src": "./resources/sugar-honeycombs-instruction.png"
	});
	
	startButton_sugarHoneycombs.show();
	startText_sugarHoneycombs.show();

	circleButton.hide();
	circleText.hide();
	triangleButton.hide();
	triangleText.hide();
	starButton.hide();
	starText.hide();
	chooseShapeTextBox.hide();
	chooseShapeText.hide();
};

// create shape of honeycombs as selected by player
let createHoneycombs = function () {
	if (selectedShape == shapeEnum.CIRCLE) {
		tracingLayer = paper.circle(dimX/2, dimY/2, outerCircleRadius).attr({
			"fill": colorTheme_sugarHoneycombs.brown,
			"stroke-width": 0
		});
		topLayer = paper.circle(dimX/2, dimY/2, innerCircleRadius).attr({
			"fill": colorTheme_sugarHoneycombs.honey,
			"stroke-width": 0
		});

		// distance of outer ring halved
		const offsetToTraceMid = (outerCircleRadius - innerCircleRadius) / 2;
		// green traced line drawn by player
		playerPathX = dimX/2;
		// set traced line to be centered to tracing path
		playerPathY = dimY/2 - outerCircleRadius + offsetToTraceMid;
		
		checkPointOffset = outerCircleRadius + innerCircleRadius;

	} else if (selectedShape == shapeEnum.TRIANGLE) {
		tracingLayer = paper.path(`M${dimX/2},${dimY/2 - 135}L${dimX/2 - 130},${dimY/2 + 60}L${dimX/2 + 130},${dimY/2 + 60}`).attr({
			"fill": colorTheme_sugarHoneycombs.brown,
			"stroke-width": 0
		});
		topLayer = paper.path(`M${dimX/2},${dimY/2 - 115}L${dimX/2 - 110},${dimY/2 + 50}L${dimX/2 + 110},${dimY/2 + 50}`).attr({
			"fill": colorTheme_sugarHoneycombs.honey,
			"stroke-width": 0
		});
		topTracingLayerOffsetX = 0;
		topTracingLayerOffsetY = 20;

		const offsetToTraceMid = (135-115) / 2;
		playerPathX = dimX/2;
		playerPathY = dimY/2 - 115 - offsetToTraceMid;
		
		checkPointOffset = 185; // 135 (tracingLayer) + 50 (topLayer)

	} else {
		tracingLayer = paper.path(`${star(dimX/2, dimY/2, 140)}`).attr({
			"fill": colorTheme_sugarHoneycombs.brown,
			"stroke-width": 0
		});
		topLayer = paper.path(`${star(dimX/2, dimY/2, 110)}`).attr({
			"fill": colorTheme_sugarHoneycombs.honey,
			"stroke-width": 0
		});
		topTracingLayerOffsetX = 0;
		topTracingLayerOffsetY = 30;

		const offsetToTraceMid = (140-110) / 2;
		playerPathX = dimX/2;
		playerPathY = dimY/2 - 140 + offsetToTraceMid;
		
		checkPointOffset = 172;
	};

	tracingLayer.hide();
	topLayer.hide();

	tracingLayerTrans = tracingLayer.clone().attr({
		"fill": colorTheme_sugarHoneycombs.star,
		"opacity" : DEBUG_TRANS,
	});
	topLayerTrans = topLayer.clone().attr({
		"fill": colorTheme_sugarHoneycombs.green,
		"opacity" : DEBUG_TRANS,
	});
	
	playerPathString = `M${playerPathX}, ${playerPathY}`;
	playerPath = paper.path(playerPathString).attr({
		"stroke": colorTheme_sugarHoneycombs.green,
		"stroke-width": 2
	});

	// Hover function needs to initialised when path/circle object
	// is created as initial tracingLayerTrans object is empty
	tracingLayerTrans.hover(function() {}, function() {
		if (gameState == GameStateEnum.GREEN && isDrawing) {
			// Player loses if he hovers out of tracing layer
			gameState = GameStateEnum.LOSE;
			showEndScreen_sugarHoneycombs();
		}
	});
	
};

// helper function for star path
let star = function (x, y, r) {
	// start at the top point
	var path = "M" + x + "," + (y - r);
	// let's draw this the way we might by hand, by connecting 
	// each point the one two-fifths of the way around the clock
	for (var c = 0; c < 6; c += 1) {
		var angle = 270 + c * 144,
			rx = x + r * Math.cos(angle * Math.PI / 180),
			ry = y + r * Math.sin(angle * Math.PI / 180);
		path += "L" + rx + "," + ry;
	}
	return path;
}

//============================================================
// start the game
continueButton_rlgl.node.addEventListener('click', init_sugarHoneycombs);
continueText_rlgl.node.addEventListener('click', init_sugarHoneycombs);

let startTimer_sugarHoneycomb = function () {
	countdownInterval = setInterval(function () {
		if (timeLeft == -1) {
			gameState = GameStateEnum.LOSE;
			showEndScreen_sugarHoneycombs();
		} else {
			timerText.attr({
				'text': `${timeLeft} seconds remaining`
			})
			timeLeft--;
		}
	}, 1000);
};

let start_sugarHoneycombs = function () {
	bg.attr({
		"src": "./resources/sugar-honeycombs-bg.png"
	});
	gameState = GameStateEnum.GREEN;
	timeLeft = fixGameTime; //Reset timer

	startButton_sugarHoneycombs.hide();
	startText_sugarHoneycombs.hide();
	replayText.hide();
	replayButton.hide();

	needle.show();
	lefthand.show();
	topLayer.show();
	tracingLayer.show();
	bottomLayer.show();
	timerText.show();
	startLine.show();

	startLine.toFront();
	needle.toFront();
	startTimer_sugarHoneycomb();
};

startButton_sugarHoneycombs.node.addEventListener('click', start_sugarHoneycombs);
startText_sugarHoneycombs.node.addEventListener('click', start_sugarHoneycombs);

//============================================================
// show end screen
let showEndScreen_sugarHoneycombs = function () {
	playerPath.remove();
	tracingLayerTrans.remove();
	topLayerTrans.remove();

	sugarHoneyCombsGameSong.pause(); // stop any gameSong that is still playing
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

	if (gameState == GameStateEnum.WIN) {
		bg.attr({
			"src": "./resources/sugar-honeycombs-win-screen.png"
		});
		sugarHoneyCombsWinSong.play();
		continueButton_sugarHoneycombs.show();
		continueText_sugarHoneycombs.show();

	} else if (gameState == GameStateEnum.LOSE) {
		bg.attr({
			"src": "./resources/sugar-honeycombs-lose-screen.png"
		});
		sugarHoneyCombsLoseSong.play();
		replayText.show();
		replayButton.show();
	}
};

continueButton_sugarHoneycombs.node.addEventListener('click', returnToStory);
continueText_sugarHoneycombs.node.addEventListener('click', returnToStory);

//============================================================
// check if player is drawing
needle.node.addEventListener("mousedown", function (ev) {
	if (gameState == GameStateEnum.GREEN) {
		console.log("START DRAWINNGGG");
		isDrawing = true;

		prevNeedleX = ev.offsetX;
		prevNeedleY = ev.offsetY;

		prevProgressX = ev.offsetX;
		prevProgressY = ev.offsetY;
		
		tracingLayerTrans.show();
		topLayerTrans.show();

		// Move transparent honeycomb to mouse down position
		if (selectedShape == shapeEnum.CIRCLE) {
			// Modify center of circle
			tracingLayerTrans.attr({
				"cx": ev.offsetX - playerProgressOffsetX, 
				"cy": ev.offsetY - playerProgressOffsetY + outerCircleRadius - extraOffset,
			});
			topLayerTrans.attr({
				"cx": ev.offsetX - playerProgressOffsetX,
				"cy": ev.offsetY - playerProgressOffsetY + outerCircleRadius - extraOffset,
			});
			
		} else {
			// Offset shape so that mouse is within tracing layer
			const offset = selectedShape == shapeEnum.STAR ? extraStarOffset : extraOffset;
			
			// Modify starting point of path object
			tracingLayerTrans.attr({ 
				customPath: [
					ev.offsetX - playerProgressOffsetX, 
					ev.offsetY - playerProgressOffsetY - offset,
				]
			});
			topLayerTrans.attr({
				customPath: [
					ev.offsetX - playerProgressOffsetX + topTracingLayerOffsetX,
					ev.offsetY - playerProgressOffsetY + topTracingLayerOffsetY - offset,
				]
			});
		}

		// Bring toFront for hover function to take effect
		tracingLayerTrans.toFront();
		topLayerTrans.toFront();
	}
});

// check if player is not drawing
document.addEventListener("mouseup", function (ev) {
	if (isDrawing && gameState == GameStateEnum.GREEN) {
		isDrawing = false;
		
		// Calculate progress offset to continue progress in next mouse down
		playerProgressOffsetX += ev.offsetX - prevProgressX;
		playerProgressOffsetY += ev.offsetY - prevProgressY;
		
		// Hide trans layer expose needle for future mousedown
		tracingLayerTrans.hide();
		topLayerTrans.hide();
	}
});

document.addEventListener("mousemove", function (ev) {
	if (isDrawing && gameState == GameStateEnum.GREEN) {
		// Move position of hand together with mouse movement
		needle.attr({
			"x": ev.offsetX - prevNeedleX + needle.attr("x"),
			"y": ev.offsetY - prevNeedleY + needle.attr("y")
		});
		
		// Draw player's path
		playerPathX += ev.offsetX - prevNeedleX;
		playerPathY += ev.offsetY - prevNeedleY;

		playerPathString += `L${playerPathX}, ${playerPathY}`;
		playerPath.attr("path", playerPathString);

		prevNeedleX = ev.offsetX;
		prevNeedleY = ev.offsetY;

		// Calculate progress offset to continue progress in next mouse down
		const tempX = playerProgressOffsetX + ev.offsetX - prevProgressX;
		const tempY = playerProgressOffsetY + ev.offsetY - prevProgressY;
		
		const threshold = 10;
		if (tempX >= -threshold && tempX <= threshold) {
			if (passCheckPoint) {
				if (tempY >= -threshold && tempY <= threshold) {
					console.log("REACHED END!");
					gameState = GameStateEnum.WIN;
					showEndScreen_sugarHoneycombs();
				}
			} else if (tempY >= checkPointOffset-threshold && tempY <= checkPointOffset+threshold) {
				console.log("REACHED CHECKPOINT!!");
				passCheckPoint = true;
			} 
		}
	}
});


init();



























