//Tile sizes
var tileWidth = 101,
    tileHeight = 83;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    //Set semi-random start point so entrance is staggered
    var startingPos = [-110, -125, -150, -175, -200, -225, -250, -275];
    var randomStart = Math.floor(Math.random() * startingPos.length);
    this.x = startingPos[randomStart];

    //Set semi-random row to start on
    var startingRows = [-25 + tileHeight, -25 + tileHeight * 2, -25 + tileHeight * 3]; //valid y values of enemy rows
    var randomRow = Math.floor(Math.random() * startingRows.length);
    this.y = startingRows[randomRow];

    //Set semi-random speed
    var speeds = [200, 225, 250, 275, 300, 325, 350];
    var randomSpeed = Math.floor(Math.random() * speeds.length);
    this.speed = speeds[randomSpeed];

    //Set image
    this.sprite = 'images/enemy-bug.png';
};
//Tracks collisions between enemy and player
Enemy.prototype.playerCollision = function() {
    if (this.x < player.x + 75 && //number is player's width
        this.x + 65 > player.x && //number is enemy's width
        this.y < player.y + 50 && //number is player's height
        70 + this.y > player.y) { //number is enemy's height
        player.reset(lossMessage);
        lossCount.update();
    }
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < 502) {
        this.x = this.x + this.speed * dt;
    } else {
        this.x = 0 - tileWidth; //moves enemy back to start for looping
    }
    this.playerCollision();
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Instantiate enemies
var allEnemies = [];
var makeEnemies = function() {
    for (i = 0; i <= 7; i++) {
        var enemy = new Enemy(this.x, this.y, this.speed);
        allEnemies.push(enemy);
    }
};
makeEnemies();

// Player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 390;
};
Player.prototype.update = function(dt) {
    //Reset if player makes it to water
    if (this.y === -25) {
        winCount.update(); //add win to score
        this.y = -24.99; //slightly move player so update() runs only once
        setTimeout(function() {
            player.reset(winMessage); //'this' is not bound in setTimeout
        },1000);
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key) {
    //Move the player as long as it's on the board
    if (key === 'left' && this.x >= 101) {
        this.x = this.x - tileWidth;
    } else if  (key === 'up' && this.y >= 55) {
        this.y = this.y - tileHeight;
    } else if (key === 'right' && this.x <= 303) {
        this.x = this.x + tileWidth;
    } else if (key === 'down' && this.y <= 295) {
        this.y = this.y + tileHeight;
    }
};
//Reset on loss or win, takes parameter for win and lose messages
Player.prototype.reset = function(message){
    message.visibility = 1.0; //make message visible
    allEnemies =[]; //empty array
    makeEnemies(); //make new enemies
    this.x = 202; //player back to starting x
    this.y = 390; //player back to starting y

    setTimeout(function() {
        for (i = 0; i < Messages.length; i++) {
            Messages[i].visibility = 0.0; //make message invisible again
        }
    }, 2000);
};

// Instantiate player
var player = new Player();

//Win and loss messages
var Message = function(image) {
    this.image = image;
    this.visibility = 0.0; //alpha value for rendering
};
Message.prototype.render = function() {
    ctx.globalAlpha = this.visibility; //set transparency for message on load
    ctx.drawImage(Resources.get(this.image), 40, 163);
    ctx.globalAlpha = 1.0; //reset transparency for other renders
};

// Instantiate messages
var Messages = []; //used for controlling visibility in reset setTimeout function
var winMessage = new Message('images/you-won.png');
Messages.push(winMessage);
var lossMessage = new Message('images/you-died.png');
Messages.push(lossMessage);

//Wins vs Losses Scores
Score = function(label, total, x, y) {
    this.label = label;
    this.total = total;
    this.x = x;
    this.y = y;
};
Score.prototype.render = function() {
    //All Text
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';

    //Solid Text
    ctx.font = '36px Impact';
    ctx.fillText(this.total, this.x, this.y); //total score
    ctx.font = '20px Impact';
    ctx.fillText(this.label, this.x, this.y + 30); //score label

    //Outlined Text
    ctx.strokeStyle = '#404040';
    ctx.lineWidth = 2;
    ctx.font = '36px Impact';
    ctx.strokeText(this.total, this.x, this.y); //total score
    ctx.font = '20px Impact';
    ctx.strokeText(this.label, this.x, this.y + 30); //score label
};
Score.prototype.update = function() {
    this.total = this.total + 1;
};

//Instantiate wins vs losses scores
var lossCount = new Score('LOSSES', 0, 455, 525);
var winCount = new Score('WINS', 0, 50, 525);


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
