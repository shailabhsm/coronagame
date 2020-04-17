function load_images() {
	virus_image = new Image;
	virus_image.src = "corona.jpg";

	player_image = new Image;
	player_image.src = "player.png";

	gem_image = new Image;
	gem_image.src = "gem.png";
}


function init() {
	canvas = document.getElementById("mycanvas")

	//change the height and width of the canvas using javascrpit
	W = 700;
	H = 400;

	score = 0;
	game_over = false;

	canvas.width = W
	canvas.height =H

	//try to work with canvas
	pen = canvas.getContext('2d');
	console.log(pen);

	//we want to create a box
	//JSON Objects

	e1 = {
		x : 150,
		y : 50,
		w : 60,
		h : 60,
		speed : 10,
	};

	e2 = {
		x : 300,
		y : 150,
		w : 60,
		h : 60,
		speed : 10,
	};

	e3 = {
		x : 450,
		y : 20,
		w : 60,
		h : 60,
		speed : 10,
	};

	enemy = [e1, e2, e3];

	player = {
		x : 20,
		y : H/2,
		w : 60,
		h : 60,
		speed : 20,
		moving : false,
	}

	gem = {
		x : W - 100,
		y : H/2,
		w : 60,
		h : 60,
	}

	//create an event listener
	canvas.addEventListener('mousedown',function() {
		player.moving = true;
	});

	canvas.addEventListener('mouseup',function() {
		player.moving = false;
	});
	
	canvas.addEventListener('touchstart',function()) {
		player.moving = true;
	}

	canvas.addEventListener('touchend',function()) {
		player.moving = false;
	}

	//diff key
	//document.addEventListener('keydown',function(e) {
	//	console.log(e);
	//if(e.key=='t') {}
	//});
}


//game loop
function draw() {

	//clear the old screen
	pen.clearRect(0,0,W,H);
	//draw this bird on screen
	pen.fillStyle = "red";
	//pen.fillRect(bird.x, bird.y, bird.w, bird.h);
	
	pen.drawImage(player_image, player.x, player.y, player.w, player.h);
	pen.drawImage(gem_image, gem.x, gem.y, gem.w, gem.h);

	for(let i=0;i<enemy.length;i++) {
		pen.drawImage(virus_image, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
	}

	pen.fillStyle = "white";
	pen.fillText("Score " + score,10,10);
}

function isColliding(b1, b2) {
	//x,y,w,h
	if(Math.abs(b1.x - b2.x) <= 30 && Math.abs(b1.y - b2.y) <= 30) {
		return true;
	}
	return false;
}

//add movement to the bird
function update() {
	if(player.moving == true)
	{
		player.x += player.speed;
		score += 20;
	}

	//collison check
	if(isColliding(gem, player)) {
		game_over = true;
		draw();
		alert("You Win" + score);
		//break the gameloop
	}

	//loop check for enemy and player
	for(let i=0;i<enemy.length;i++) {
		if(isColliding(enemy[i], player)) {
			score -= i * 100;
			if(score < 0) {
				game_over = true;
				alert("Game Over");
			}
		}
	}


	for(let i=0;i<enemy.length;i++) {
		enemy[i].y += enemy[i].speed;
		if(enemy[i].y > H - enemy[i].h || enemy[i].y < 0)
		{
			enemy[i].speed *= -1
		}
	}
}


function gameloop() {
	draw();
	update();
	if(game_over == true){
		clearInterval(f);
	}
}

//start of game
load_images();
init();

//repeated call gameloop
var f = setInterval(gameloop, 100);
