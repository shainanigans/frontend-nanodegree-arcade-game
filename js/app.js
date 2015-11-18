// Enemies our player must avoid
var Enemy = function(x, y, distance, start) {
    this.x = x;

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

    //Delay start time so enemies stagger entrance
    this.start = Math.floor(Math.random() * 10000); //ms

    //Set image
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < 502) {
        //TODO: get the delay to work
        setTimeout(this.x = this.x + this.distance * dt, this.start);
    } else {
        this.x = -100; //moves enemy back to start for looping
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
    for (i = 0; i <= 10; i++) {
        var enemy = new Enemy(-100, this.y, this.distance, this.start);
        allEnemies.push(enemy);
    }
};
makeEnemies();

var player = new Player(202, 375);

//Tracks the x and y values of enemies for collision detection
//Enemy.prototype.trackCollision = function() {
//    //setInterval(function() {
//        if (player.x === this.x && player.y === this.y) {
//            console.log('collision!');
//        }
//    //}, 100);
//};
//allEnemies.forEach(function(enemy) {
//    setInterval(enemy.trackCollision(), 100);
//});
var trackCollisions = function() {
    var enemyX = [];
    var enemyY = [];
    //setInterval(function() {
        for (i = 0; i < allEnemies.length; i++) {
            enemyX.push(allEnemies[i].x);
            enemyY.push(allEnemies[i].y);
        };
    //}, 100);
    console.log(enemyX);
    if (enemyX.length > 10) {
        console.log('too long');
        enemyX.splice(-1, 1);
        enemyY.splice(-1, 1);
    }
            console.log(enemyX);
    for (i = 0; i < allEnemies.length; i++) {
        if (player.x === enemyX[i] && player.y === enemyY[i]) {
            console.log('collision!');
        }
    }
};
trackCollisions();

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
