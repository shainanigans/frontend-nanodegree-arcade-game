// Enemies our player must avoid
var Enemy = function(x, y, distance) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.distance = distance; //determines how far enemy moves per second
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.distance * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Tracks the x and y values of enemies for collision detection
Enemy.prototype.trackCollision = function() {
    if (player.x === this.x && player.y === this.y) {
        console.log('collision!');
    }
    console.log(player.x)
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
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
    setInterval(function() {
        //Generate random speeds and starting rows
        var distance = Math.floor(Math.random() * 10 + 1) * 100; //x values
        //Cap max speed
        if (distance > 500) {
            distance = 500;
        }

        var startingRows = [215, 135, 55]; //valid y values of enemy rows
        var randomRow = Math.floor(Math.random() * startingRows.length);

        var enemy = new Enemy(-100, startingRows[randomRow], distance);
        enemy.trackCollision();

        //TODO: This isn't doing anything
        allEnemies.push(enemy);
    }, 500);
};
makeEnemies();

var player = new Player(202, 375);



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
