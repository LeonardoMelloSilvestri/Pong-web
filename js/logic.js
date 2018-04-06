player = new Player();
player2 = new Player2();
ball = new Ball();
colide = new Colide();
var playerScore = 0;
var player2Score = 0;

window.addEventListener('keydown', function keyDownHandler(e){
	switch (e.keyCode) {
		case 87:
			player.moveUp = true;
			break;
		case 83:
			player.moveDown = true;
			break;
		case 38:
			player2.moveUp = true;
			break;
		case 40:
			player2.moveDown = true;
			break;
	}
}, false);

window.addEventListener('keyup', function keyUpHandler(e){
	switch (e.keyCode) {
		case 87:
			player.moveUp = false;
			break;
		case 83:
			player.moveDown = false;
			break;
		case 38:
			player2.moveUp = false;
			break;
		case 40:
			player2.moveDown = false;
			break;
	}
}, false);

function Player() {
	this.heigth = 130;
	this.width = 40;
	this.x = 20;
	this.y = 650 / 2 - 65;
	this.moveUp = false;
	this.moveDown = false;
	this.speed = 15;
	this.score = 0;

	this.draw = function(){
		ctx.fillStyle = "White";
		ctx.fillRect(this.x, this.y, this.width, this.heigth);
	}

	this.move = function(){
		if (this.moveUp == true) {
			if (colide.playersTop(this.y) == true) {
				this.y -= this.speed;
			}
		} else if (this.moveDown == true) {
			if (colide.playersBottom(this.y + this.heigth) == true) {
				this.y += this.speed;
			}
		}
	}
}

function Player2() {
	this.heigth = 130;
	this.width = 40;
	this.x = 940;
	this.y = 650 / 2 - 65;
	this.moveUp = false;
	this.moveDown = false;
	this.speed = 15;
	this.score = 0;

	this.draw = function(){
		ctx.fillStyle = "White";
		ctx.fillRect(this.x, this.y, this.width, this.heigth);
	}

	this.move = function(){
		if (this.moveUp == true) {
			if (colide.playersTop(this.y) == true) {
				this.y -= this.speed;
			}
		} else if (this.moveDown == true) {
			if (colide.playersBottom(this.y + this.heigth) == true) {
				this.y += this.speed;
			}
		}
	}
}

function Ball(){
	this.size = 15;
	this.x = 1000 / 2 - 10;
	this.y = 650 / 2 - 10;
	this.directionX = Math.floor(Math.random()* 2);
	this.directionY = Math.floor(Math.random()* 2);
	this.speed = 5;
	this.mod = 0.0;

	this.draw = function(){
		ctx.fillStyle = "White";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
		ctx.fill();
	}

	this.move = function(){
		if (this.directionX == 1) {
			this.x += (this.speed + this.mod);
		} else {
			this.x -= (this.speed + this.mod);
		}
		if (this.directionY == 1) {
			this.y += (this.speed + this.mod);
		} else {
			this.y -= (this.speed + this.mod);
		}
	}	
}

function Colide(){
	this.playersTop = function(element){
		if (element > 0) {
			return true;
		} else {
			return false;
		}
	}

	this.playersBottom = function(element){
		if (element < 650) {
			return true;
		} else {
			return false;
		}
	}

	this.ballMargins = function(){
		if (ball.x < player.x + player.width - 10) {
			playerScore++;
			player = new Player();
			player2 = new Player2();
			ball = new Ball();
		} else if (ball.x + ball.size > player2.x + 10) {
			player2Score++;
			player = new Player();
			player2 = new Player2();
			ball = new Ball();
		}
		if (ball.y <= 0) {
			ball.directionY = 1;
		} else if (ball.y + ball.size >= 650) {
			ball.directionY = 0;
		}
	}

	this.ballPlayer = function(){
		if (ball.x - 10 <= player.x + player.width &&
			ball.y <= player.y + player.heigth &&
			ball.y + ball.size >= player.y) {
			ball.mod += 0.5;
			ball.directionY = Math.floor(Math.random()* 2);
			ball.directionX = 1;
		}
	}

	this.ballPlayer2 = function(){
		if (ball.x + ball.size >= player2.x &&
			ball.y <= player2.y + player2.heigth &&
			ball.y + ball.size >= player2.y) {
			ball.mod += 0.5;
			ball.directionY = Math.floor(Math.random()* 2);
			ball.directionX = 0;
		}
	}
}

function Statistics(){
	this.draw = function(){
		ctx.font = "30px Cursive";
		ctx.fillStyle = "White";
		ctx.fillText("Score: " + playerScore, 60, 30);
		ctx.fillText("Score: " + player2Score, 820, 30);
	}
}