// Enemies our player must avoid
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= 500) {
        this.x = -100;
    } else {
        this.x += (Math.floor(Math.random() * 1000) + 100) * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function (sprite) {
    ctx.drawImage(Resources.get(sprite), this.x, this.y);
};

// Check enemy collisions with player
Enemy.prototype.checkCollisions = function (player) {
    var playerLongitude = player.x;
    var playerLatitude = player.y;

    // Player gets hit, reset player position to starting point
    if ((this.x > playerLongitude - 60 && this.x < playerLongitude + 60) && (this.y > playerLatitude - 45 && this.y < playerLatitude + 45)) {
        player.x = 200;
        player.y = 310;
    }
}

// Player's avatar
var Player = function () {
    this.x = 200;
    this.y = 310;

    // The image/sprite player will choose as their avatar
    this.playerChoice = 0;
};

Player.prototype.update = function () {
    this.lives = 3;
    this.points = 0;
}

Player.prototype.render = function (playerChoice) {
    this.playerChoice = playerChoice;
    this.charObj = {
        0: 'boy',
        1: 'cat-girl',
        2: 'horn-girl',
        3: 'pink-girl',
        4: 'princess-girl'
    };

    this.sprite = 'images/char-' + this.charObj[this.playerChoice] + '.png';

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (direction) {
    switch (direction) {
        case 'left':
            this.x === 0 ? this.x : this.x -= 100;
            break;
        case 'up':
            this.y === -50 ? this.y : this.y -= 90;
            break;
        case 'right':
            this.x === 400 ? this.x : this.x += 100;
            break;
        case 'down':
            this.y === 400 ? this.y : this.y += 90;
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0, 50), new Enemy(0, 140), new Enemy(0, 220)];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});