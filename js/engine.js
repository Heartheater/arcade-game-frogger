/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on player and enemy objects (defined in app.js).
 */

function engine(global) {
    //sets canvas element
    const canvas = document.getElementById("canvas");
    canvas.width = 604;
    canvas.height = 746;

    let doc = global.document,
        win = global.window,
        ctx = canvas.getContext("2d"),
        lastTime;


    function main() {
        /* Gets time delta information to get a constant
         * value that's the same for everyone playing the game.
         */
        let now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        
        
       
        update(dt);
        
        render();

        lastTime = now;

        //calls this (main) function again in a loop
        win.requestAnimationFrame(main);
    }//main end


    function initialize() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    function checkCollisions() {
        allEnemies.forEach(function (enemy) {
            enemy.checkCollision();
        });
    }

    function updateEntities(dt) {
        allEnemies.forEach(function (enemy) {
            enemy.update(dt);
        });
        player.update();
    }


    /* this draws the game's background and then calls renderEntities
     * to animate all the enemies and player sprite with each animation frame
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
            'images/water-block.png',   // Top row is water

            'images/stone-block.png',   // Stone rows
            'images/stone-block.png',

            'images/grass-block.png',   // grass row

            'images/stone-block.png',   // stone rows
            'images/stone-block.png',   

            'images/grass-block.png',   // grass Rows
            'images/grass-block.png',   
        ],
            numRows = rowImages.length,
            numCols = 6,
            row, col;

        // Before drawing, clear existing canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 100, row * 82);
            }
        }
        renderEntities();
    }

    function renderEntities() {
        //loops through allEnemies and draws them on screen
        allEnemies.forEach(function (enemy) {
            enemy.render();
        });
        //draws player character on screen
        player.render();
    }

    function reset() {
        //when the replay button is clicked, resets the game
        document.querySelector('.replay').addEventListener("click", replay);
    }

    /* loads all of the game images & sets initialize as the callback method
     * when all images are loaded the game starts
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/Star.png',
    ]);
    Resources.onReady(initialize);

    // Assign the canvas' context object to the global variable
    global.ctx = ctx;
};

engine(this);