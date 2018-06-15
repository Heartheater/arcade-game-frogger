"use strict";

const canvas = document.getElementById("canvas");

function Enemy(yMin, yMax) {
    this.x = -10;
    this.y = Math.floor(Math.random() * (yMax - yMin) + yMin);
    //dx is x velocity
    this.dx = Math.floor(Math.random() * (300 - 150) + 150);
    this.dx = 2;
    this.sprite = 'images/enemy-bug.png';

    this.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    this.update = function (dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

        let xArea = (this.x - player.x < 10) && (this.x - player.x > -3);
        let yArea = (this.y - player.y < 72) && (this.y - player.y > -10);
        if (this.x < canvas.width) {
            this.x += (this.dx);
        } 
        else if ((xArea && yArea)) {
            this.x = this.x;
        }
        else {
            //wrap enemy back to start
            this.x = -10;
        }
    };

    this.checkCollision = function () {
        let xArea = (this.x - player.x < 50) && (this.x - player.x > -10);
        let yArea = (this.y - player.y < 72) && (this.y - player.y > -10);
        if (xArea && yArea) {
            //reset player position
            player.x = canvas.width / 2;
            player.y = canvas.height - 150;
        }
    };

}; //Enemy end


//.......................................................................

function Player(img) {
    //set player starting point
    this.x = canvas.width / 2;
    this.y = canvas.height - 150;
    //movement speed
    this.spd = 6;

    this.playerImg = img;
    //canvas width/height minus img width/height
    this.xOffset = (canvas.width - 101);
    this.yOffset = (canvas.height - 140);
    this.left;
    this.right;
    this.up;
    this.down;

    //draw character
    this.render = function () {
       ctx.drawImage(Resources.get(this.playerImg), this.x, this.y);
    }

    this.handleInput = function (keyCode, press) {
        if (press) {
            switch (keyCode) {
                case 37:
                    this.left = true;
                    break;
                case 38:
                    this.up = true;
                    break;
                case 39:
                    this.right = true;
                    break;
                case 40:
                    this.down = true;
                    break;
            }
        }
        else {
            switch (keyCode) {
                case 37:
                    this.left = false;
                    break;
                case 38:
                    this.up = false;
                    break;
                case 39:
                    this.right = false;
                    break;
                case 40:
                    this.down = false;
                    break;
            }
        }

    }

    this.update = function () {
        player.handleInput();
        if ((this.left) && (this.x > -10)) {
            this.x -= this.spd;
        }
        else if ((this.right) && (this.x < this.xOffset)) {
            this.x += this.spd;
        }
        else if ((this.down) && (this.y < this.yOffset)) {
            this.y += this.spd;
        }
        else if ((this.up) && (this.y > 10)) {
            this.y -= this.spd;
        }
        checkWinning();
    }

}; //Player end

//......................................................


let img = 'images/char-boy.png';
let player = new Player(img);
let allEnemies = [];

function createEnemies(amount, min, max) {
    for (let i = 0; i < amount; ++i) {
        min += (i * 20);
        allEnemies.push(new Enemy(min, max));
    }
}//createEnemies end


//upper road is between 120 - 235 px
createEnemies(2, 120, 235);
//bottom road area is between 365 - 480 px
createEnemies(3, 365, 480);

//check if player won
//let gameWon = false;
function checkWinning() {
    if (player.y < 5) {
        //gameWon = true;
        console.log("you won");
    }
}//checkWinning end


//listen for arrow key press and sends to player.handleInput()
document.addEventListener('keyup', function(e) {
    player.handleInput(e.keyCode,false);
});
document.addEventListener('keydown', function (e) {
    player.handleInput(e.keyCode, true);
});
