import Bot from '../entities/Bot.js';
import { BotRespawn, PlayerRespawn } from '../config/config.js';
import { BOT_HEIGHT, BOT_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH, SCREEN_WIDTH } from '../constants/game.js';
import Player from '../entities/Player.js';

export function setAndClearTimeout(id, callback, duration) {
  if (id) return;

  id = setTimeout(() => {
    clearTimeout(id);
    callback();
  }, duration);
}

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

export function generateBots(count, positionCount = 3) {
  let array = [];

  for (let index = 1; index <= count; index++) {
    if (index % positionCount === 2) {
      array.push(new Bot(BotRespawn.LEFT.X, BotRespawn.LEFT.Y, BOT_WIDTH, BOT_HEIGHT));
    } else if (index % positionCount === 1) {
      array.push(new Bot(BotRespawn.MIDDLE.X, BotRespawn.MIDDLE.Y, BOT_WIDTH, BOT_HEIGHT));
    } else if (index % positionCount === 0) {
      array.push(new Bot(BotRespawn.RIGHT.X, BotRespawn.RIGHT.Y, BOT_WIDTH, BOT_HEIGHT));
    }
  }

  return array;
}

export function generatePlayers(count) {
  let array = [];

  for (let index = 1; index <= count; index++) {
    array.push(new Player(PlayerRespawn.X, PlayerRespawn.Y, PLAYER_WIDTH, PLAYER_HEIGHT, null));
  }

  return array;
}
