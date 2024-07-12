import { SCREEN_WIDTH } from '../../game/constants/game.js';

export function alignCenterImage(imageWidth) {
  return SCREEN_WIDTH / 2 - imageWidth / 2;
}

export function scaleImage(image, scaleValue) {
  const width = image.width * scaleValue;
  const height = image.height * scaleValue;

  return { width, height };
}

export function clearCanvas(context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}
