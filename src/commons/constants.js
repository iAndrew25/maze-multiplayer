export const MAP_WIDTH = 10;
export const MAP_HEIGHT = 10;

export const TILE_HEIGHT = 55;
export const TILE_WIDTH = 80; 
	
export const TILES = {
	0: {
		type: 'stone-floor',
		x: 320,
		y: 0,
		w: 80,
		h: 55
	},
	1: {
		type: 'mountain',
		x: 240,
		y: 0,
		w: 80,
		h: 55
	},
	2: {
		type: 'player1',
		x: 0,
		y: 0,
		w: 80,
		h: 55
	},
	3: {
		type: 'player2',
		x: 80,
		y: 0,
		w: 80,
		h: 55
	},
	4: {
		type: 'player3',
		x: 0,
		y: 55,
		w: 80,
		h: 55
	},
	5: {
		type: 'player4',
		x: 80,
		y: 55,
		w: 80,
		h: 55
	}
};

export const MAP = [
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 1, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 1, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 1, 0, 0, 0, 0, 1, 1,
	1, 0, 0, 1, 0, 0, 0, 0, 0, 1,
	1, 0, 1, 1, 1, 1, 0, 1, 0, 1,
	1, 0, 0, 0, 1, 0, 0, 1, 1, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];