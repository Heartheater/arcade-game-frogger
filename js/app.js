"use strict";

const canvas = document.getElementById("canvas");
let gameWon = false;

function Enemy(yMin, yMax) {
    //set starting x and y position
    this.x = -10;
    this.yMin = yMin;
    this.yMax = yMax;
    this.y = Math.floor(Math.random() * (this.yMax - this.yMin) + this.yMin);
    //dx is x velocity
    this.dx = Math.floor(Math.random() * (300 - 220) + 220);
    this.sprite = 'images/enemy-bug.png';
}; //Enemy end

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}; // render end

Enemy.prototype.checkCollision = function () {
    //checks area around the enemy
    let xArea = (this.x - player.x < 50) && (this.x - player.x > -20);
    let yArea = (this.y - player.y < 72) && (this.y - player.y > -10);

    //if the player runs into enemy
    if (xArea && yArea) {
        //reset player position
        player.reset();
        //set score back to zero
        player.score = 0;
        displayScore.innerHTML = `Score: ${player.score}`;
    }
}; //checkCollision end

Enemy.prototype.update = function (dt) {
    if (this.x < canvas.width) {
        this.x += (this.dx * dt);
    }
    else {
        //when enemy goes off screen reset its position/speed
        this.x = -10;
        this.y = Math.floor(Math.random() * (this.yMax - this.yMin) + this.yMin);
        this.dx = Math.floor(Math.random() * (300 - 150) + 150);
    }
}; //Enemy.update end


function Player(img) {
    //set player starting point
    this.x = canvas.width / 2;
    this.y = canvas.height - 150;
    //set movement speed
    this.spd = 3.5;
    this.score = 0;

    this.playerImg = img;

    //boundaries to keep the player from going off screen
    //canvas width/height minus img width/height
    this.xOffset = (canvas.width - 101);
    this.yOffset = (canvas.height - 140);

    //movement controls
    this.left;
    this.right;
    this.up;
    this.down;

    //draw player character
    this.render = function () {
       ctx.drawImage(Resources.get(this.playerImg), this.x, this.y);
    }

    this.handleInput = function (keyCode, press) {
        if (press) {
            switch (keyCode) {
                case 37:
                case 65:
                    this.left = true;
                    break;
                case 38:
                case 87:
                    this.up = true;
                    break;
                case 39:
                case 68:
                    this.right = true;
                    break;
                case 40:
                case 83:
                    this.down = true;
                    break;
                case 80:
                    alert("paused");
                    break;
            }
        }
        else {
            switch (keyCode) {
                case 37:
                case 65:
                    this.left = false;
                    break;
                case 38:
                case 87:
                    this.up = false;
                    break;
                case 39:
                case 68:
                    this.right = false;
                    break;
                case 40:
                case 83:
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
        updateScore();
        checkWinning();
        if (this.score >= 50) {
            this.spd = 6;
        }
    }

    this.reset = function () {
        player.x = canvas.width / 2;
        player.y = canvas.height - 150;
    }
}; //Player end

//......................................................

//creates a player and assigns it a default sprite
let img = 'images/char-boy.png';
let player = new Player(img);

//array to hold all enemy instances
let allEnemies = [];


function createEnemies(amount, min, max) {
    for (let i = 0; i < amount; ++i) {
        allEnemies.push(new Enemy(min, max));
    }
}//createEnemies end



//check if player reached the water
const displayScore = document.querySelector(".score");
function updateScore() {
    if (player.y < 41) {
        player.score += 10;
        displayScore.innerHTML = `Score: ${player.score}`;
        //reset player's position
        player.reset();
    }
}//updateScore end

function checkWinning() {
    if (player.score >= 100 && !gameWon) {
        gameWon = true;
        //show winning screen
        document.getElementById("win").style.cssText = "display: block";
        //erase all the enemies
        allEnemies = [];
        console.log("...");
    }
    document.querySelector('#replay').addEventListener("click", function () {
        document.getElementById("select-screen").style.cssText = "display: flex";
        document.getElementById("win").style.cssText = "display: none";
        gameWon = false;
        player.score = 0;
    });
}



let charSpriteArray = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png',
];

function placeEnemies() {
    //upper road is between 120 - 235 px
    createEnemies(5, 120, 235);
    //bottom road area is between 365 - 480 px
    createEnemies(5, 365, 480);
    return;
}

function selectCharacter() {
    let preview = document.querySelector("#char-preview");
    let i = 0;
    let backBtn = document.querySelector("#backward-select");
    let forwardBtn = document.querySelector("#forward-select");

    //runs forward through the charSpriteArray and displays each character
    forwardBtn.addEventListener("click", function forward() {
        if (i < (charSpriteArray.length - 1)) {
            i += 1;
            preview.src = charSpriteArray[i];

        } else {
            i = 0;
            preview.src = charSpriteArray[i];
        }
    });
    //runs backward through the charSpriteArray
    backBtn.addEventListener("click", function back() {
        if (i < (charSpriteArray.length) && i > 0) {
            i -= 1;
            preview.src = charSpriteArray[i];
        } else {
            i = (charSpriteArray.length - 1);
            preview.src = charSpriteArray[i];
        }
    });

    //start button click function
    document.querySelector("#start-button").addEventListener("click", function () {
        //sets chosen player sprite
        player.playerImg = charSpriteArray[i];
        //hides select screen
        document.getElementById("select-screen").style.cssText = "display: none";

        placeEnemies();

        //listen for arrow key press and sends to player.handleInput()
        document.addEventListener('keyup', function (e) {
            player.handleInput(e.keyCode, false);
        });
        document.addEventListener('keydown', function (e) {
            player.handleInput(e.keyCode, true);
        });
    });

}//select Char end
selectCharacter();

