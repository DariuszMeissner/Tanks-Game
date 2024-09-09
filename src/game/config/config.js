import { MAP_HEIGHT, MAP_WIDTH, TILE_SIZE_HEIGHT, TILE_SIZE_WIDTH } from '../constants/game.js';

const HUD_EDGE_WIDTH = 3;

export const BOT_TIME_TO_SHOOT = 5000;

export const LEVEL_INIT = 1;

export const BOT_ID = 'bot';
export const PLAYER_ID = 'player';

export const BotRespawn = {
  LEFT: {
    X: 1 * TILE_SIZE_WIDTH,
    Y: 1 * TILE_SIZE_HEIGHT,
  },
  MIDDLE: {
    X: Math.floor((MAP_WIDTH - HUD_EDGE_WIDTH) / 2) * TILE_SIZE_WIDTH,
    Y: 1 * TILE_SIZE_HEIGHT,
  },
  RIGHT: {
    X: (MAP_WIDTH - HUD_EDGE_WIDTH) * TILE_SIZE_WIDTH,
    Y: 1 * TILE_SIZE_HEIGHT,
  },
};

export const Player1Respawn = {
  X: Math.floor((MAP_WIDTH - HUD_EDGE_WIDTH) / 2 - 1) * TILE_SIZE_WIDTH,
  Y: (MAP_HEIGHT - 2) * TILE_SIZE_HEIGHT,
};

export const Player2Respawn = {
  X: Math.floor((MAP_WIDTH - HUD_EDGE_WIDTH) / 2 - 1) * TILE_SIZE_WIDTH + TILE_SIZE_WIDTH * 4,
  Y: (MAP_HEIGHT - 2) * TILE_SIZE_HEIGHT,
};

export const STAGE_INFO_DURATION = 2000;
export const SUMMARY_INFO_DURATION = 4000;
