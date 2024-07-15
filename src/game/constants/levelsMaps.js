import { LEVEL_1, LEVEL_2 } from './levels.js';

export const MapObject = {
  ROAD: 0,
  WALL: 1,
  WATER: 2,
  GRASS: 3,
  EAGLE: 4,
  MAP_EDGE: 5,
  ROCK: 6,
  EAGLE_DEAD: 7,
};

export const MAP_LEVELS = new Map([
  ['1', LEVEL_1],
  ['2', LEVEL_2],
]);
