import {MAP, MAP_WIDTH, MAP_HEIGHT, TILE_HEIGHT, TILE_WIDTH, TILES} from './commons/constants';
import {isCollision, getIndex, drawPlayer} from './commons/utils';
import socketSubscribe from './commons/socket-subscribe';
import socket from './commons/socket';


let currentPlayer,
	players,
	ctx,
	cvs,
	img;

const gameWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
	gameHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

const clearScreen = () => ctx.clearRect(0, 0, cvs.width, cvs.height);

const sw = socket.getInstance(),
	updatePlayers = users => players = users,
	updatePlayerUser = user => currentPlayer = user;

socketSubscribe.subscribe('app.js', {
	GET_PLAYERS: updatePlayers,
	NEW_PLAYER: updatePlayers,
	PLAYER_MOVE: updatePlayers,
	PLAYER_LEFT: updatePlayers,
	GET_ME: updatePlayerUser
});

function drawPlayers(i, j, mapX, mapY) {
	players.forEach(player => {
		if(i === player.x && j === player.y) {
			drawPlayer(ctx, img, player, mapX, mapY);			
		}
	});
}

window.addEventListener('load', () => {
	cvs = document.getElementById('game');

	cvs.height = gameHeight - 40;
	cvs.width = gameWidth - 40;

	ctx = cvs.getContext('2d');

	img = new Image();
	img.src = 'assets/images/tiles.png';

	img.onload = function() {
		update();
	}	
});	

function update() {
	clearScreen();
	drawMap();
	requestAnimationFrame(update);
}

function drawMap() {
	for(let i = 0; i < MAP_HEIGHT; i++) {
		for(let j = 0; j < MAP_WIDTH; j++) {

			let mapX = (i - j) * TILE_WIDTH / 2 + gameWidth / 2,
				mapY = (i + j) * TILE_WIDTH / 4 + gameHeight / 4,
				{type, x, y, w, h} = TILES[MAP[getIndex(i, j)]];

			if(type === 'mountain') {
				mapY -= 10;
			}

			ctx.drawImage(
				img,
				x,
				y,
				w,
				h,
				mapX,
				mapY,
				w,
				h
			);
			
			drawPlayers(i, j, mapX, mapY);
		}
	}
}

document.addEventListener('keypress', ({keyCode, charCode, which}) => {
	let keyPressed = keyCode || charCode || which,
		moved = false;

	if(keyPressed === 97 && !isCollision(currentPlayer.x - 1, currentPlayer.y)) {
		currentPlayer.x -= 1;
		moved = true;
	} else if(keyPressed === 100 && !isCollision(currentPlayer.x + 1, currentPlayer.y)) {
		currentPlayer.x += 1;
		moved = true;
	} else if(keyPressed === 115 && !isCollision(currentPlayer.x, currentPlayer.y + 1)) {
		currentPlayer.y += 1;
		moved = true;
	} else if(keyPressed === 119 && !isCollision(currentPlayer.x, currentPlayer.y - 1)) {
		currentPlayer.y -= 1;
		moved = true;
	}

	moved && sw.send(JSON.stringify({type:'PLAYER_MOVE', payload: currentPlayer}));
});