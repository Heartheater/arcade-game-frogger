"use strict";
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//......................................
//Set character
//let char = document.getElementById("char");
let char = new Image(20,30);
char.addEventListener("load", function () {
    //char.width = 20;
});
char.src = "imgs/Char2.png";
//Keyboard Movement controls
let leftKey = false;
let rightKey = false;
let upKey = false;
let downKey = false;

window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);

// 39 = right  37 = left
// 38 = top    40 = down

function keyDownHandler(e) {
    if (e.keyCode == 37) {
        leftKey = true;
    }
    else if (e.keyCode == 38) {
        upKey = true;
    }
    else if (e.keyCode == 39) {
        rightKey = true;
    }
    else if (e.keyCode == 40) {
        downKey = true;
    }
} //keyDown end

function keyUpHandler(e) {
    if (e.keyCode == 37) {
        leftKey = false;
    }
    else if (e.keyCode == 38) {
        upKey = false;
    }
    else if (e.keyCode == 39) {
        rightKey = false;
    }
    else if (e.keyCode == 40) {
        downKey = false;
    }
} //keyUp end


//...............................................................

//Default Character screen positions X and Y
let charX = 10;
let charY = 10;

function moveChar() {
    //clear entire screen before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw character
    ctx.drawImage(char, charX, charY);

    if ((leftKey) && (charX > 0)) {
        charX -= 10;
        //char.style.cssText = "transform: rotateY(" + 180 + "deg)";
    }
    else if ((rightKey) && (charX < (window.innerWidth - 20))) {
        charX += 10;
    }
    else if ((downKey) && (charY < (window.innerHeight - 50))) {
        charY += 10;
    }
    else if ((upKey) && (charY > -20)) {
        charY -= 10;
    } 

    // img element, x pos, y pos
    //ctx.drawImage(img ,10 ,10);

   // char.style.top = charY + "px";
   // char.style.left = charX + "px";

    requestAnimationFrame(moveChar);
}
moveChar();
    

