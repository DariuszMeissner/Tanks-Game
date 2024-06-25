// // 0 - road
// // 1 - wall
// // 2 - water
// // 3 - grass
// // 4 - eagle
// // 5 - edge of map
// // 6 - rock
// // 7 - eagle dead

const Map = [
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  [5, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 5],
  [5, 0, 1, 0, 0, 0, 0, 3, 2, 2, 2, 2, 3, 0, 5],
  [5, 0, 1, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 5],
  [5, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  [5, 0, 1, 0, 6, 6, 0, 0, 6, 0, 0, 0, 0, 0, 5],
  [5, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  [5, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  [5, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 5],
  [5, 0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 5],
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
];

const Movement = {
  FORWARD: 'forward',
  REVERSE: 'reverse',
  LEFT: 'left',
  RIGHT: 'right',
  SPACE: 'Space',
};

const MapObject = {
  ROAD: 0,
  WALL: 1,
  WATER: 2,
  GRASS: 3,
  EAGLE: 4,
  MAP_EDGE: 5,
  ROCK: 6,
  EAGLE_DEAD: 7,
};

const AssetsType = {
  IMAGE: 'image',
  SOUND: 'sound',
};

const AssetsTypeLookup = {
  png: AssetsType.IMAGE,
  webp: AssetsType.IMAGE,
  mp3: AssetsType.SOUND,
  ogg: AssetsType.SOUND,
};

const AssetsPathsName = {
  ROAD: 'road',
  WALL: 'wall',
  WATER: 'water',
  GRASS: 'grass',
  EAGLE: 'eagle',
  EAGLE_DEAD: 'eagle-dead',
  MAP_EDGE: 'map-edge',
  ROCK: 'rock',
  TANK_PLAYER: 'tank-player',
  TANK_ENEMY: 'tank-enemy',
};

const AssetsPaths = {
  ROAD: '/../../assets/images/road_square.png',
  WALL: './../../assets/images/brick_square.png',
  WATER: './../../assets/images/water_square.png',
  GRASS: './../../assets/images/grass_square.png',
  EAGLE: './../../assets/images/eagle_live.png',
  EAGLE_DEAD: './../../assets/images/eagle_dead.png',
  MAP_EDGE: '/../../assets/images/map_edge.png',
  ROCK: './../../assets/images/rock_square.png',
  TANK_PLAYER: './../../assets/images/tank_player.png',
  TANK_ENEMY: './../../assets/images/tank_enemy.png',
};

const GameSettings = {
  RESET_SPEED: 2,
  DELAY_START: 2000,
  COMPENSE_MAP_EDGE_SIZE: 1,
  TILE_SIZE: 40,
};

const CanvasSize = {
  HEIGHT: Map.length * GameSettings.TILE_SIZE,
  WIDTH: Map[0].length * GameSettings.TILE_SIZE,
};

export { Movement, MapObject, AssetsType, AssetsPaths, AssetsTypeLookup, GameSettings, AssetsPathsName, Map, CanvasSize };
