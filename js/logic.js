var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

player1 = new Player1();
player2 = new Player2();
ball = new Ball();

var player1Score = 0, player2Score = 0;

window.addEventListener('keydown', function keyDownHandler(e){
	var key = e.keyCode;
	switch (key) {
		case 87:
			player1.moveUp = true;
			break;
		case 83:
			player1.moveDown = true;
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
	var key = e.keyCode;
	switch (key) {
		case 87:
			player1.moveUp = false;
			break;
		case 83:
			player1.moveDown = false;
			break;
		case 38:
			player2.moveUp = false;
			break;
		case 40:
			player2.moveDown = false;
			break;
	}
}, false);

function Player1() {
	this.height  = 120;
	this.width = 30;
	this.x = 20;
	this.y = canvas.height / 2 - (this.height / 2);
	this.speed = 12;
	this.moveUp = false;
	this.moveDown = false;
	this.score = 0;

	this.draw = function(){
		ctx.fillStyle = "White";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	this.move = function(){
		if (this.moveUp == true && this.y >= 0) {
			this.y -= this.speed;
		} else if (this.moveDown == true && this.y + this.height <= canvas.height) {
			this.y += this.speed;
		}
	}
}

function Player2() {
	this.height  = 120;
	this.width = 30;
	this.x = canvas.width - 50;
	this.y = canvas.height / 2 - (this.height / 2);
	this.speed = 12;
	this.moveUp = false;
	this.moveDown = false;
	this.score = 0;

	this.draw = function(){
		ctx.fillStyle = "White";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	this.move = function(){
		if (this.moveUp == true && this.y >= 0) {
			this.y -= this.speed;
		} else if (this.moveDown == true && this.y + this.height <= canvas.height) {
			this.y += this.speed;
		}
	}
}

function Ball() {
	this.size = 15;
	this.x = canvas.width / 2 - (this.size / 2);
	this.y = canvas.height / 2 - (this.size / 2);
	this.speedX = 5;
	this.speedY = Math.floor(Math.random()* 5);
	this.mod = 1;
	this.color = "White";
	this.posX = Math.floor(Math.random()* 2);
	this.posY = Math.floor(Math.random()* 2);

	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI*2)
		ctx.fill();
	}

	this.move = function(){
		if (this.posX > 0) {
			this.x += (this.speedX + this.mod);
		} else {
			this.x -= (this.speedX + this.mod);
		}

		if (this.posY > 0) {
			this.y += (this.speedY + this.mod);
		} else {
			this.y -= (this.speedY + this.mod);
		}
	}

	this.collideBounds = function(){
		if (this.y <= 0) {
			this.posY = 1;
			this.speedY = Math.floor(Math.random()* 5);
		} else if (this.y + this.size >= canvas.height) {
			this.posY = 0
			this.speedY = Math.floor(Math.random()* 5);
		}
	}

	this.collidePlayers = function(){
		if (this.y + this.size >= player1.y &&
			this.y + this.size <= player1.y + (player1.height / 2) &&
			this.x - 15 <= player1.x + player1.width &&
			this.x + this.size >= player1.x) {
			this.speedY = Math.floor(Math.random()* 5);
			this.posY = 0;
			this.posX = 1;
			this.mod += 0.3;
		}
		
		if (this.y + this.size <= player1.y + player1.height &&
			this.y + this.size >= player1.y + player1.height - (player1.height / 2) &&
			this.x - 15 <= player1.x + player1.width &&
			this.x + this.size >= player1.x) {
			this.speedY = Math.floor(Math.random()* 5);
			this.posY = 1;
			this.posX = 1;
			this.mod += 0.3;
		}

		if (this.y + this.size >= player2.y &&
			this.y + this.size <= player2.y + (player2.height / 2) &&
			this.x + this.size >= player2.x &&
			this.x <= player2.x + player2.width) {
			this.speedY = Math.floor(Math.random()* 5);
			this.posY = 0;
			this.posX = 0;
			this.mod += 0.3;
		}

		if (this.y + this.size <= player2.y + player2.height &&
			this.y + this.size >= player2.y + player2.height - (player2.height / 2) &&
			this.x + this.size >= player2.x &&
			this.x <= player2.x + player2.width) {
			this.speedY = Math.floor(Math.random()* 5);
			this.posY = 1;
			this.posX = 0;
			this.mod += 0.3;
		}
	}

	this.gameOver = function(){
		if (this.x <= 10) {
			alert('Player 2 pontuou!');
			player2Score++;
			player1 = new Player1();
			player2 = new Player2();
			ball = new Ball();
		} else if (this.x + this.size >= canvas.width - 10){
			alert('Player 1 pontuou!');
			player1Score++;
			player1 = new Player1();
			player2 = new Player2();
			ball = new Ball();
		}

		if (player1Score >= 10) {
			alert("Player 1 venceu!");
			player1Score = 0;
			player2Score = 0;
		} else if (player2Score >= 10) {
			alert("Player 2 venceu!");
			player1Score = 0;
			player2Score = 0;
		}
	}
}