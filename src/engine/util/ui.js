import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../game/constants/game.js';
import { FONT } from '../constant/game.js';

export function showNotification(text, context, size, color) {
  context.font = `${size}px ${FONT}`;
  context.fillStyle = color;
  context.fillText(text, SCREEN_WIDTH / 2.5, SCREEN_HEIGHT / 2);
}

export function alignCenterImage(imageWidth) {
  return SCREEN_WIDTH / 2 - imageWidth / 2;
}

export function scaleImage(image, scaleValue) {
  const width = image.width * scaleValue;
  const height = image.height * scaleValue;

  return { width, height };
}