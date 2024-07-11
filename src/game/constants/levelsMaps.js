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

export const MapLevel1 = [
  { stage: 1 },
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5],
  [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5],
  [5, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 5, 5],
  [5, 0, 1, 0, 0, 0, 0, 3, 2, 2, 0, 5, 5],
  [5, 0, 1, 0, 0, 0, 0, 3, 3, 3, 0, 5, 5],
  [5, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5],
  [5, 0, 1, 0, 6, 6, 0, 0, 6, 0, 0, 5, 5],
  [5, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5],
  [5, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 5, 5],
  [5, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 5, 5],
  [5, 0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 5, 5],
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
];
