"use strict";

function Enemy(yMin, yMax) {
    this.x = -10;
    this.y = Math.floor(Math.random() * (yMax - yMin) + yMin);
    //dx is x velocity
    this.dx = Math.floor(Math.random() * (300 - 150) + 150);
    this.dx = 3;
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
        if (this.x < 505) {
            this.x += (this.dx);
        } //idk im just wrappng the enemy back to the start
        else {
            this.x = -10;
        }
    };

    this.checkCollision = function () {
        if ((this.x === player.x && this.y === player.y)) {
            player.x = 200;
            player.y = 400;
        }
    };

}; //Enemy end


//.......................................................................

function Player(img) {
    this.x = 200;
    this.y = 400;
    //movement speed
    this.spd = 10;

    this.playerImg = img;
    //canvas width/height minus img w/h
    this.xOffset = (505 - 101);
    this.yOffset = (606 - 200);

    this.left;
    this.right;
    this.up;
    this.down;

    this.render = function () {
        //draw character
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
        else if ((this.up) && (this.y > -20)) {
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
        allEnemies.push(new Enemy(min, max));
    }
}//createEnemies end

//the road area is between 50 - 220
createEnemies(1, 50, 220);

function checkWinning() {
    if (player.y < 5) {
        alert("you won");
    }
}


//listen for arrow key press and sends to player.handleInput()
document.addEventListener('keyup', function(e) {
    player.handleInput(e.keyCode,false);
});
document.addEventListener('keydown', function (e) {
    player.handleInput(e.keyCode, true);
});
