import { MapLevel1 } from './levelsMaps.js';

export const FPS = 60;
export const FRAME_TIME = 1000 / FPS;

export const SCREEN_WIDTH = 640;
export const SCREEN_HEIGHT = 640;

export const TILE_SIZE_WIDTH = SCREEN_WIDTH / MapLevel1[0].length;
export const TILE_SIZE_HEIGHT = SCREEN_WIDTH / MapLevel1.length;

export const BOT_SPEED = 2;
export const BOT_WIDTH = TILE_SIZE_WIDTH - 4;
export const BOT_HEIGHT = TILE_SIZE_HEIGHT - 4;
export const BOT_DELAY_START = 2000;

export const PLAYER_SPEED = 2;
export const PLAYER_WIDTH = TILE_SIZE_WIDTH - 4;
export const PLAYER_HEIGHT = TILE_SIZE_HEIGHT - 4;

export const COMPENSE_SPEED = PLAYER_SPEED;

export const AssetsType = {
  IMAGE: 'image',
  SOUND: 'sound',
};

export const AssetsTypeLookup = {
  png: AssetsType.IMAGE,
  webp: AssetsType.IMAGE,
  mp3: AssetsType.SOUND,
  ogg: AssetsType.SOUND,
};

export const AssetsPathsName = {
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

export const AssetsPaths = {
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
