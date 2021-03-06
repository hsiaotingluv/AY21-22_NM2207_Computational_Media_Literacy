
console.log("yo, I'm alive!");

var paper = new Raphael(document.getElementById("mySVGCanvas"));
// Find get paper dimensions
var dimX = paper.width;
var dimY = paper.height;


//------------------------------------------
// Careate a rectangle with the same dimensions as the canvas and save it in the variable bg
var bg = paper.rect(0, 0, dimX, dimY);

// Set some background rectangle attributes
bg.attr({
        "stroke": "#444444",
        "stroke-width": 20,
        //"fill" : "#CCAAFF"        // must be filled to get mouse clicks
        "fill" : "url(https://media.istockphoto.com/vectors/pasly-pattern-seamless-vector-id479917880)"        
})

// add mousedown listener that prints to console (but only if the rectangle was filled)
bg.node.addEventListener("mousedown", function(ev){
        console.log("mouse down on paper")
});

//------------------------------------------

mybigheartPathString="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4z"

myHeart1= paper.path(mybigheartPathString )

myHeart1.attr({
        "fill": "#FF0000",// must be filled to get mouse clicks  
        //"fill" : "url(https://media.istockphoto.com/vectors/pasly-pattern-seamless-vector-id479917880)",        

        "stroke-width": 2,

})
 

myHeart1.attr({
    transform : "r-45,t100,-50"
})


//============================================================
// BASICALLY the same thing as:
// var hanimate1 = function(){}

function hanimate1(){
    myHeart1.animate({"transform" : "s.75"}, 250, hanimate2)
}

function hanimate2(){
    myHeart1.animate({"transform" : "s.4"}, 250, hanimate3)
}

function hanimate3(){
    myHeart1.animate({"transform" : "s.75"}, 250, hanimate4)
}

function hanimate4(){
    myHeart1.animate({"transform" : "s.4"}, 250, hanimate5)
}

function hanimate5(){
    myHeart1.animate({"transform" : "s.4"}, 750, hanimate1)
}

// get the circular animation going
hanimate1()


//============================================================

var mybigheartPathString2 = Raphael.transformPath(mybigheartPathString, 'T100,0s.4')
console.log(mybigheartPathString2.toString())


myHeart2= paper.path(mybigheartPathString2)

myHeart2.attr({
        "fill": "#FF00FF",// must be filled to get mouse clicks
        "stroke-width": 2,

})

 
//============================================================
function ganimate1(){
    myHeart2.animate({"transform" : "r"+(-beatRotation)+",s"+beatScale,
                      "fill": "#FF00FF"}, 
                      1000, 
                      ganimate2)  // when done, call the other 
}

function ganimate2(){
    myHeart2.animate({"transform" : "r"+(beatRotation)+",s.4",
                    "fill": "#0000FF"}, 
                    2000, 
                    ganimate1) // when done, call the other
}

// get the circular animation going
ganimate1()


//==========================================================
// add mousedown listener to control size and rotation of animation
var beatRotation=0;
var beatScale=1;
bg.node.addEventListener("mousedown", function(ev){
    var normX=ev.offsetX/dimX;
    var normY=ev.offsetY/dimY;

    beatRotation=normX*30;
    beatScale=normY*3

    console.log(`beatrotation is ${beatRotation} and beatScale is ${beatScale}`)

});

// This is for the "mega challenge"
bg.node.addEventListener("mousedown", function(ev){

    // get the 'center' of the path object 
    let bbox=myHeart2.getBBox(true);
    let boxCenterX=bbox.x+bbox.width/2;
    let boxCenterY=bbox.y+bbox.height/2;

    //Compute the transfrom from the center of the object to the mouse click
    let transformstring=`T${ev.offsetX-boxCenterX},${ev.offsetY-boxCenterY}`
    // Let transformPath compute the new path for us
    let newPath = Raphael.transformPath(myHeart2.attr('path'),transformstring);
    console.log("Your new path will be \n    " + newPath.toString());

    // set the path attribute on the object to the new path string
    myHeart2.stop();  // stops animation
    myHeart2.attr({
        path : newPath
    });
    ganimate1();  // restart animation
});

