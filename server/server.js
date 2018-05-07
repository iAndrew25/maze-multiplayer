const express = require('express');
	http = require('http'),
	WebSocket = require('ws');
	path = require('path');

const app = express(),
	port = 8082,
	server = http.createServer(app),
	wss = new WebSocket.Server({ server });

const generatePlayer = require('./player');

app.use(express.static(path.join(__dirname + '/../')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/../index.html')));

let noticeAllClients = () => {},
	noticeCurrentClient = () => {},
	clients = {},
	players = [],
	newPlayer;

wss.on('connection', (ws, req) => {
	noticeCurrentClient = message => {
		ws.send(JSON.stringify(message));
	}

	noticeAllClients = message => {
		wss.clients.forEach(client => {
			if(client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(message));
			}
		})
	}

	newPlayer = generatePlayer();

	ws.id = newPlayer.id;
	clients[newPlayer.id] = ws;

	players.push(newPlayer);

	noticeCurrentClient({type: 'GET_ME', payload: newPlayer});
	noticeAllClients({type: 'NEW_PLAYER', payload: players});

	ws.on('error', err => {
		if (err.code !== 'ECONNRESET') {
			throw err
		}
	});

	ws.on('close', function close() {
		delete clients[ws.id];
		players = players.filter(player => player.id !== ws.id);
		
		noticeAllClients({type: 'PLAYER_LEFT', payload: players});
	});

	ws.on('message', message => {
		const parsedData = typeof message === 'string' ? JSON.parse(message) : message;

		switch(parsedData.type) {
			case 'PLAYER_MOVE':
				players = players.map(player => {
					if(player.id === parsedData.payload.id) {
						player = parsedData.payload;
					}
					return player;
				})

				noticeAllClients({type: 'PLAYER_MOVE', payload: players});
				break;
			default:
		}
	});
});

server.listen(port, () => console.log(`Listening on port ${port}`));