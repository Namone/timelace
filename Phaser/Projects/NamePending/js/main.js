var game;
var player_sprite;
var player = {
	height: 25, // height in pixels
	width: 15, // width in pixels
	x: 25,
	y: 25,
	speed: 5, // speed of player (how fast increments x-axis, basically)
	jump_height: 60, // amount of jump difference between base Y and end Y
	alive: true, // dead or alive (Queue Bon Jovi)
}

var tile = {
	x: 0,
	y: 0,
	height: 10, // height in pixels, or something
	width: 32, // width in pixels, I guess
	x_vals: [],
	y_vals: [],
}

var world = {
	hazard_level: 1, // by default
	width: 850,
	height: 720,
}

function init(w, h) {
	// Create game object
	game = new Phaser.Game(w, h, Phaser.AUTO, null, { preload: preload, create: create, update: update, render: render } );

	if (game != null) {
		console.log('Game Initiated ------ v0.0.5');
	}
}

// Load assets
function preload() {
	// Scale game screen to fit any screen size
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
	// Background color
	game.stage.backgroundColor = "#eee";

	// Load images
	var images = new Array();
}

// Make my life a bit easier
function imageLoader(name, URL) {
	game.load.image(name, 'assets/' + URL);
}

// Create game/draw game, etc.
function create() {
	// Essentials to start the game
	graphics = game.add.graphics(0, 0);
	generateWorld();

}

function generateWorld() {

	var grid_length = 15;

	var width_per_box= world.width / grid_length;
	var height_per_box = world.height / grid_length;

	var x = 0; // def
	var y = 0; // def

	var grid_element = {
		width: width_per_box,
		height: height_per_box,
		x_initial: x, // left
		y_initial: y, // top, left
		x_far: this.x_initial + width_per_box, // right
		y_far: this.y_initial + height_per_box, // bottom left
		tile_id: 0, // by default
	}

	var grid = new Array(grid_length);

	var boxes_per_w = grid_length;
	var boxes_per_h = grid_length;

	for (var g = 0; g <= grid_length; g++) {
		grid[g] = new Array(grid_length); // set up 2d array (4x4 by default)
	}

	// Loop through and set up grid positions (4 points for each box)
	for (var X = 0; X <= boxes_per_w; X++) {
		for (var Y = 0; Y <= boxes_per_h; Y++) {

			grid_element.x_initial = grid_element.width * X;
			grid_element.y_initial = grid_element.height * Y;

			grid_element.x_far = grid_element.x_initial + grid_element.width;
			grid_element.y_far = grid_element.y_initial + grid_element.height;

			grid[X][Y] = grid_element;

			var currentGrid = grid[X][Y];

			// Based on tile id... set tile type (wall or not wall at this point)
			if (currentGrid.x_initial == 0 || currentGrid.y_initial == 0 
				|| Math.ceil(currentGrid.x_far) == world.width || Math.ceil(currentGrid.y_far) == world.height ){
				currentGrid.tile_id = 0;
			} else {
				currentGrid.tile_id = getRandomInt(0, 2);
			}

			console.log("X far:" + currentGrid.x_far + " | Y: " + currentGrid.y_initial);

			// draw a rectangle
			if (currentGrid.tile_id == 0) {
				graphics.lineStyle(2, '0x000000', 1);
				graphics.beginFill('0x000000', 1);
			} else {
				graphics.lineStyle(2, '0x0000FF', 1);
				graphics.beginFill('0x0000FF', 1);
			}
		    
		    // draw a rectangle
		    graphics.moveTo(currentGrid.x_initial, currentGrid.y_initial); // 0, 0
		    graphics.lineTo(currentGrid.x_initial, currentGrid.y_far); // 0, 1
		    graphics.lineTo(currentGrid.x_far, currentGrid.y_far); // 1, 1
		    graphics.lineTo(currentGrid.x_far, currentGrid.y_initial); // 1, 0
		    graphics.endFill();
    
			graphics.drawRect(currentGrid.x_initial, currentGrid.y_initial, currentGrid.x_far, currentGrid.y_far); // testing purposes
		}
	}
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var tile_selector = 0;
// Update & draw
function render() {	
	while (tile_selector < tile.x_vals.length) {
		player_sprite.lineStyle(0);
		player_sprite.beginFill(0xFFFFFF, 1);
    	player_sprite.drawRect(tile.x_vals[tile_selector].value, tile.y_vals[tile_selector].value, 100, 25);
		player_sprite.endFill();

		tile_selector++;
	}
}


// Update game logic
function update() {
    window.graphics = player_sprite;
}