const MOVEMENT = {
  forward: "forward",
  reverse: "reverse",
  left: "left",
  right: "right",
  space: "Space",
};

const MAP_OBJECT = { road: 0, wall: 1, water: 2, grass: 3, eagle: 4, mapEdge: 5, rock: 6, eagleDead: 7 };
const ASSETS = {
  road: "",
  wall: "./assets/brick_square.png",
  water: "./assets/water_square.png",
  grass: "./assets/grass_square.png",
  eagle: "./assets/eagle_live.png",
  eagleDead: "./assets/eagle_dead.png",
  mapEdge: "",
  rock: "./assets/rock_square.png",
};
const RESET_SPEED = 2;
const DELAY_START = 2000;
const COMPENSE_MAP_EDGE_SIZE = 1;

const SETTINGS = {};

export { MOVEMENT, MAP_OBJECT, RESET_SPEED, DELAY_START, COMPENSE_MAP_EDGE_SIZE, ASSETS };
