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

export const SoundsPathsName = {
  UP: '1up',
  ENEMY_DESTROYED: 'enemy-destroyed',
  FIRING_AT_THE_BRICKS: 'firing-at-the-bricks',
  FIRING_AT_THE_WALL: 'firing-at-the-wall',
  FIRING_THE_ENEMY_BIG_TANK: 'firing-the-enemy-big-tank',
  GAME_OVER: 'game-over',
  HIGH_SCORE: 'high-score',
  PAUSE: 'pause',
  PLAYER_GOT_BONUS_1000_POINTS: 'player-got-bonus-1000-points',
  PLAYER_TANK_DESTROYED_EAGLE_DESTROYED: 'player-tank-destroyed---eagle-destroyed',
  PLAYER_TANK_FIRING: 'player-tank-firing',
  PLAYER_TANK_IDLE: 'player-tank-idle',
  PLAYER_TANK_MOVING: 'player-tank-moving',
  POWER_UP_APPEARED: 'power-up-appeared',
  POWER_UP_OBTAINED: 'power-up-obtained',
  SCORING_SUMMARY_THE_LEVEL: 'scoring-summary-the-level',
  SLIDING: 'sliding',
  START_UP: 'start-up',
};

export const SoundsPaths = {
  UP: '/../../assets/sounds/1up.ogg',
  ENEMY_DESTROYED: '/../../assets/sounds/enemy-destroyed.ogg',
  FIRING_AT_THE_BRICKS: '/../../assets/sounds/firing-at-the-bricks.ogg',
  FIRING_AT_THE_WALL: '/../../assets/sounds/firing-at-the-wall.ogg',
  FIRING_THE_ENEMY_BIG_TANK: '/../../assets/sounds/firing-the-enemy-big-tank.ogg',
  GAME_OVER: '/../../assets/sounds/game-over.ogg',
  HIGH_SCORE: '/../../assets/sounds/high-score-after-summary-the-level.ogg',
  PAUSE: '/../../assets/sounds/pause.ogg',
  PLAYER_GOT_BONUS_1000_POINTS: '/../../assets/sounds/player-got-bonus-1000-points.ogg',
  PLAYER_TANK_DESTROYED_EAGLE_DESTROYED: '/../../assets/sounds/player-tank-destroyed---eagle-destroyed.ogg',
  PLAYER_TANK_FIRING: '/../../assets/sounds/player-tank-firing.ogg',
  PLAYER_TANK_IDLE: '/../../assets/sounds/player-tank-idle.ogg',
  PLAYER_TANK_MOVING: '/../../assets/sounds/player-tank-moving.ogg',
  POWER_UP_APPEARED: '/../../assets/sounds/power-up-appeared.ogg',
  POWER_UP_OBTAINED: '/../../assets/sounds/power-up-obtained.ogg',
  SCORING_SUMMARY_THE_LEVEL: '/../../assets/sounds/scoring-summary-the-level.ogg',
  SLIDING: '/../../assets/sounds/sliding.ogg',
  START_UP: '/../../assets/sounds/start-up.ogg',
};
