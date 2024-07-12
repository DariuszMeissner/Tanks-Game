import { MAP_HEIGHT, MAP_WIDTH, TILE_SIZE_HEIGHT, TILE_SIZE_WIDTH } from '../constants/game.js';

const HUD_EDGE_WIDTH = 3;

export const BOT_ID = 'bot';
export const PLAYER_ID = 'player';

export const BotRespawn = {
  LEFT: {
    X: 1 * TILE_SIZE_WIDTH,
    Y: 1 * TILE_SIZE_HEIGHT,
  },
  MIDDLE: {
    X: ((MAP_WIDTH - HUD_EDGE_WIDTH) / 2) * TILE_SIZE_WIDTH,
    Y: 1 * TILE_SIZE_HEIGHT,
  },
  RIGHT: {
    X: (MAP_WIDTH - HUD_EDGE_WIDTH) * TILE_SIZE_WIDTH,
    Y: 1 * TILE_SIZE_HEIGHT,
  },
};

export const PlayerRespawn = {
  X: Math.floor((MAP_WIDTH - HUD_EDGE_WIDTH) / 2 - 1) * TILE_SIZE_WIDTH,
  Y: (MAP_HEIGHT - 2) * TILE_SIZE_HEIGHT,
};
