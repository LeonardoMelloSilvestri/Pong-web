var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

player1 = new Player1();
player2 = new Player2();
ball = new Ball();

function init() {
	
	loop();
}

function update(){
	ball.move();
	ball.collidePlayers();
	ball.collideBounds();
	ball.gameOver();
	player1.move();
	player2.move();
}

function render(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	player1.draw();
	player2.draw();
	ball.draw();
	ctx.fillStyle = "White";
	ctx.font = "30px Cursive";
	ctx.fillText("Score: " + player1Score, 50, 30)
	ctx.fillText("Score: " + player2Score, 830, 30)
}

function loop(){
	window.requestAnimationFrame(loop, canvas);
	update();
	render();
}

init();