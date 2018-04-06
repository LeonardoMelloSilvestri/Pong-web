var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

player = new Player();
player2 = new Player2();
ball = new Ball();
colide = new Colide();
statistics = new Statistics();

function init() {
	
	loop();
}

function update(){
	player.move();
	player2.move();
	ball.move();
	colide.ballMargins();
	colide.ballPlayer();
	colide.ballPlayer2();
}

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	player.draw();
	player2.draw();
	ball.draw();
	statistics.draw();
}

function loop(){
	window.requestAnimationFrame(loop, canvas);
	update();
	draw();
}

init();