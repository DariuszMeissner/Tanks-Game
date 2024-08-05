import { LEVEL_TEMPLATE } from './levels.js';

export const FPS = 60;
export const FRAME_TIME = 1000 / FPS;

export const HELPER_SCREEN_WIDTH = 640;
export const HELPER_SCREEN_HEIGHT = 640;

export const MAP_WIDTH = Math.floor(LEVEL_TEMPLATE[1].length);
export const MAP_HEIGHT = Math.floor(LEVEL_TEMPLATE.length - 1);

export const TILE_SIZE_WIDTH = Math.floor(HELPER_SCREEN_WIDTH / MAP_WIDTH);
export const TILE_SIZE_HEIGHT = Math.floor(HELPER_SCREEN_HEIGHT / MAP_HEIGHT);

export const SCREEN_WIDTH = Math.floor(MAP_WIDTH * TILE_SIZE_WIDTH);
export const SCREEN_HEIGHT = Math.floor(MAP_HEIGHT * TILE_SIZE_HEIGHT);

export const BOT_SPEED = 2;
export const BOT_WIDTH = TILE_SIZE_WIDTH - 4;
export const BOT_HEIGHT = TILE_SIZE_HEIGHT - 4;
export const BOT_DELAY_START = 400;

export const PLAYER_SPEED = 2;
export const PLAYER_WIDTH = TILE_SIZE_WIDTH - 4;
export const PLAYER_HEIGHT = TILE_SIZE_HEIGHT - 4;

export const FONT = 'font-7x7';

const startHud = TILE_SIZE_WIDTH * (MAP_WIDTH - 2);
const endHud = TILE_SIZE_WIDTH * MAP_WIDTH;
const widthHud = endHud - startHud;
const middleHud = startHud + widthHud / 2;
const hudContentWidth = 44;

export const Angle = {
  UP: 0,
  DOWN: Math.PI,
  LEFT: -Math.PI / 2,
  RIGHT: Math.PI / 2,
};

export const HudP = {
  START: startHud,
  MIDDLE: middleHud,
  END: endHud,
  WIDTH: widthHud,
  CONTENT: {
    START: middleHud - hudContentWidth / 2,
    END: middleHud + hudContentWidth / 2,
  },
  POSITION: {
    BOTS_LIFE: 70,
    PLAYER_FLAG: 385,
    PLAYER_LIFES: 390,
    STAGE_FLAG: 500,
    STAGE_LEVEL: 560,
  },
};

const widthMap = TILE_SIZE_WIDTH * (MAP_WIDTH - 1);
const middleMap = widthMap / 2;

export const MapP = {
  MIDDLE: { X: middleMap, Y: SCREEN_HEIGHT / 2 },
};

export const MenuType = {
  PLAYER_1: '1-player',
  PLAYERS_2: '2-players',
};

export const ScreenType = {
  START_MENU: 'start-menu',
  SCENE: 'scene',
};

export const Colors = {
  WHITE: 'white',
  BLACK: 'black',
  GRAY: '#636363',
  RED: '#b53121',
};

export const MenuOptions = ['1 PLAYER', '2 PLAYERS'];

export const AssetsType = {
  IMAGE: 'image',
  SOUND: 'sound',
  FONT: 'font',
};

export const AssetsTypeLookup = {
  png: AssetsType.IMAGE,
  webp: AssetsType.IMAGE,
  mp3: AssetsType.SOUND,
  ogg: AssetsType.SOUND,
  ttf: AssetsType.FONT,
};

export const FontsPathsName = {
  DIGITS_4x7: 'digits-4x7',
  FONT_7x7: 'font-7x7',
};

export const FontsPaths = {
  DIGITS_4x7: './../../assets/fonts/digits-4x7/digits-4x7.ttf',
  FONT_7x7: './../../assets/fonts/font-7x7/font-7x7.ttf',
};

export const ImagesPathsName = {
  ROAD: 'road',
  WALL: 'wall',
  WATER: 'water',
  GRASS: 'grass',
  EAGLE: 'eagle',
  EAGLE_DEAD: 'eagle-dead',
  MAP_EDGE: 'map-edge',
  ROCK: 'rock',
  MAIN_TEXT: 'main-text',
  CURSOR: 'cursor',
  STAGE_FLAG: 'stage-flag',
  PLAYER_LIFE: 'player-life',
  ENEMY_LIFE: 'enemy-life',
  PLAYER1_TANK: 'player1-tank',
  BOT_TANK: 'bot-tank',
  RESPAWN_TANK: 'respawn-tank',
};

export const ImagesPaths = {
  ROAD: './../../assets/images/road_square.png',
  WALL: './../../assets/images/brick_square.png',
  WATER: './../../assets/images/water_square.png',
  GRASS: './../../assets/images/grass_square.png',
  EAGLE: './../../assets/images/eagle_live.png',
  EAGLE_DEAD: './../../assets/images/eagle_dead.png',
  MAP_EDGE: '/../../assets/images/map_edge.png',
  ROCK: './../../assets/images/rock_square.png',
  MAIN_TEXT: './../../assets/images/battle-city-main-text.png',
  CURSOR: './../../assets/images/tank_player_cursor.png',
  STAGE_FLAG: './../../assets/images/stage_flag.png',
  PLAYER_LIFE: './../../assets/images/player_life.png',
  ENEMY_LIFE: './../../assets/images/enemy_life.png',
  PLAYER1_TANK: './../../assets/images/player1_tank.png',
  BOT_TANK: './../../assets/images/bot_tank.png',
  RESPAWN_TANK: './../../assets/images/respawn_tank.png',
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
