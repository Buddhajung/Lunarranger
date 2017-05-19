

var gameArea = document.getElementById('myGameArea');
var gameRect = gameArea.getBoundingClientRect();
var gameAreaWidth = Math.round(gameRect.right - gameRect.left);
var gameAreaHeight = Math.round(gameRect.bottom - gameRect.top);



var landerImage = document.getElementById('lander');
landerImage.style.position = "absolute";
landerImage.style.zIndex = "1";
lander.style.display = "block";



var targetImage = document.getElementById('target');
targetImage.style.position = "absolute";
targetImage.style.zIndex = "0";



var flameImage = document.getElementById('flame');
flameImage.style.position = "absolute";
flameImage.style.zIndex = "0";
flameImage.style.display = "none";



var blowUpImage = document.getElementById('blowup');
blowUpImage.style.position = "absolute";
blowUpImage.style.zIndex = "1";
blowUpImage.style.display = "none";



var landerDY = 0;
var landerDX = 0;
var landerX = 0;
var landerY = 0;
var landerWidth = 110;

var targetX = 0;
var targetY = 0;
var crashed = false;
var moving = false;
var id = setInterval(frame, 60);

//for the flame

var flameX;
var flameY;

function checkForTargetWin(){
    var didIWin = false;
    //do something to check

    if ( Math.abs(landerX - targetX) < 15){  // look at x 
        if(((targetY + 5) - (landerY + 80)) < 10){  // look at y
            if(Math.abs(landerDY) < 5){ // look at speed...
                didIWin = true;
            }
        }
    }

    return didIWin;
}


function setFlamePosition() {

    flameX = landerX + 40;
    flameY = landerY + 80;
    flameImage.style.top = flameY + 'px';
    flameImage.style.left = flameX + 'px';

}

function showFlame() {
    flameImage.style.display = "block";

}

function hideFlame() {
    flameImage.style.display = "none";

}

function setFlamePosition(){

    flameY = landerY + 80;
    flameX = landerX + 40;
    flameImage.style.top = flameY + 'px';
    flameImage.style.left = flameX + 'px';
    
}



function setLanderAtTopAndTargetAtBottom(){
    
    crashed = false;
    blowUpImage.style.display = "none";
    landerImage.style.display = "block";
    //landerDX = 0;
    //landerDY = 6;
    

    //Code to set the Lander...
    landerY = 0;
    landerX = Math.round(gameAreaWidth/2) - Math.round(landerWidth/2);
    //alert("Hi landerX in set lander is " + landerX);
    landerImage.style.top = landerY + 'px';
    landerImage.style.left = landerX + 'px';
    setFlamePosition();






    targetY = gameAreaHeight - 75;
    targetX = Math.round(Math.random() * (gameAreaWidth-110)) + 55;
    targetImage.style.top = targetY + 'px';
    targetImage.style.left = targetX + 'px';
    

   
}




function resetAnimation(){
    landerDY = 0;
    landerDX = 0;
    crashed = false;
    setLanderAtTopAndTargetAtBottom();
}

function startAnimation(){
    moving = true;
    crashed = false;
    landerDY = 6;
}

function moveLander(){

    if(moving === true){

        if(checkForTargetWin() === false){
              landerX += landerDX;
              landerY += landerDY;
              //added to accelerate the descent
              landerDY += 1;
    

    //Check X loaction

                if( landerX <= 0 && landerDX < 0){
                    landerX = 0;
                    landerDX = 0;
                }

                if( (landerX > gameAreaWidth - landerWidth) && landerDX > 0){
                    landerX =  gameAreaWidth - landerWidth;
                    landerDX = 0;
                }

    //This checks Y location
                if(landerY >= gameAreaHeight - landerWidth){
                    landerY = gameAreaHeight - landerWidth;
                   
                        if(landerDY > 4) {
                        crashed = true;
                        landerDX = 0;
                        } 

                    landerDY = 0;
                    landerDX = 0;
                 }


  //drawing based on crash state...
              if(crashed === false) {
                    console.log (" in move-- trying to move lander to " + landerX + ", " + landerY);
                    //draw
                    landerImage.style.left = landerX + 'px';
                    landerImage.style.top = landerY + 'px';
                    setFlamePosition(); //**** To MOVE THE FLAME

                } else {
                     moving = false;
                     landerImage.style.display = "none";
                     hideFlame();
                     blowUpImage.style.left = landerX + 'px';
                     blowUpImage.style.top = landerY + 'px';
                     blowUpImage.style.display = "block";

                 }

          }  else {
               flameImage.style.display = "none";
               moving = false;
               alert("Hey you won -- nice Bigboy Landing!");
          }

    }
}

function frame() {
    //console.log("hi from frame");
    moveLander();
}



setLanderAtTopAndTargetAtBottom();
//Temporary Test of flame
//showFlame();

document.getElementById('resetButton').onclick = resetAnimation;
document.getElementById('startButton').onclick = startAnimation;

//anonymous function
document.onkeydown = function(e){

   // alert("Key code is " + e.keyCode);
    

    switch(e.keyCode){

        //spacebar
        case 32: 
            //   alert("You pushed the spacebar");
            //MAKE THIS A START -- TO COME
        break;
        
        //left
        case 37:
            //   alert("You pushed the left arrow"); <--
            landerDX += -1;
            showFlame();
        break;
        
        //up
        case 38:
              //alert("You pushed the up arrow");
            landerDY -=9;
            showFlame();
        break;
        
        // right 
        case 39:
            //   alert("You pushed the right arrow");
            landerDX += 1;
            showFlame();
        break;
        
        //down..not using. right now
        case 40:
            //   alert("You pushed the down arrow ");
        break;

    }

};



//On Key Up
//Another anonymous function
document.onkeyup = function(e){

    //protection
   // if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      //  e.preventDefault();
    //}

    switch(e.keyCode){

         case 32: 
            //spacebar is released
         break;

         case 37: 
            //left Arrow Key is released
            //landerDX = 0;
            hideFlame();
         break;

         case 38: 
            //up arrow key is released
            hideFlame();
         break;

         case 39: 
            //right arrow key is released
           // landerDX = 0;
            hideFlame();
         break;

          case 40: 
            //down arrow key is released
         break;
    
    }

};




