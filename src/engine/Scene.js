import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../game/constants/game.js';
import { FONT } from './constant/game.js';

export default class Scene {
  constructor() {}

  drawGameInfo(context, enemiesLength) {
    context.font = `20px ${FONT}`;
    context.fillStyle = 'black';
    context.fillText(enemiesLength, SCREEN_WIDTH - 32, SCREEN_HEIGHT / 2);
  }
}
