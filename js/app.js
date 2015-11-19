// Enemies our player must avoid
var Enemy = function(x, y, distance) {
    //Set semi-random start point so entrance is staggered
    var startingPos = [-100, -125, -150, -175, -200]; //valid y values of enemy rows
    var randomStart = Math.floor(Math.random() * startingPos.length);
    this.x = startingPos[randomStart];

    //Set random row to start on
    var startingRows = [215, 135, 55]; //valid y values of enemy rows
    var randomRow = Math.floor(Math.random() * startingRows.length);
    this.y = startingRows[randomRow];

    //Determine how many pixels enemy moves per second
    this.distance = Math.floor(Math.random() * 10 + 1) * 100; //pixels
    //Cap max speed
    if (distance > 500) {
        distance = 500;
    };

    //Set image
    this.sprite = 'images/enemy-bug.png';
};
//Tracks the x and y values of enemies for collision detection
Enemy.prototype.trackCollisions = function() {
    //Axis-Aligned Bounding Box Algorithm
    if (this.x < player.x + 75 && //number is player's width
        this.x + 65 > player.x && //number is enemy's width
        this.y < player.y + 50 && //number is player's height
        70 + this.y > player.y) { //number is enemy's height
        //TODO: Get image to render
        ctx.drawImage(Resources.get('images/you-died.png'), 102.5, 203);
    }
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < 502) {
        //TODO: get the delay to work
        this.x = this.x + this.distance * dt;
    } else {
        this.x = -100; //moves enemy back to start for looping
    }
    this.trackCollisions();
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 375;
};
Player.prototype.update = function(dt) {
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key) {
    //Move the player as long as it's on the board
    if (key === 'left' && this.x >= 102) {
        this.x = this.x - 100;
    } else if  (key === 'up' && this.y >= 55) {
        this.y = this.y - 80;
    } else if (key === 'right' && this.x <= 302) {
        this.x = this.x + 100;
    } else if (key === 'down' && this.y <= 295) {
        this.y = this.y + 80;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var makeEnemies = function() {
    for (i = 0; i <= 10; i++) {
        var enemy = new Enemy(this.x, this.y, this.distance);
        allEnemies.push(enemy);
    }
};
makeEnemies();

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
