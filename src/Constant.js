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
  ROAD: '',
  WALL: '',
  WATER: '',
  GRASS: '',
  EAGLE: '',
  EAGLE_DEAD: '',
  MAP_EDGE: '',
  ROCK: '',
  TANK_PLAYER: 'tank-player',
  TANK_ENEMY: 'tank-enemy',
};

const AssetsPaths = {
  ROAD: '',
  WALL: './assets/brick_square.png',
  WATER: './assets/water_square.png',
  GRASS: './assets/grass_square.png',
  EAGLE: './assets/eagle_live.png',
  EAGLE_DEAD: './assets/eagle_dead.png',
  MAP_EDGE: '',
  ROCK: './assets/rock_square.png',
  TANK_PLAYER: './assets/tank_player.png',
  TANK_ENEMY: './assets/tank_enemy.png',
};

const GameSettings = {
  RESET_SPEED: 2,
  DELAY_START: 2000,
  COMPENSE_MAP_EDGE_SIZE: 1,
};

export { Movement, MapObject, AssetsType, AssetsPaths, AssetsTypeLookup, GameSettings, AssetsPathsName };
