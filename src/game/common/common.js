import Bot from '../entities/Bot.js';
import { BotRespawn, PlayerRespawn } from '../config/config.js';
import { BOT_HEIGHT, BOT_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/game.js';
import Player from '../entities/Player.js';
import { pauseSound } from '../../engine/soundHandler.js';

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

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function generateBots(count, positionCount = 3) {
  let array = [];

  for (let index = 1; index <= count; index++) {
    if (index % positionCount === 2) {
      array.push(new Bot(BotRespawn.LEFT.X, BotRespawn.LEFT.Y, BOT_WIDTH, BOT_HEIGHT, randomNumber(0, 3)));
    } else if (index % positionCount === 1) {
      array.push(new Bot(BotRespawn.MIDDLE.X, BotRespawn.MIDDLE.Y, BOT_WIDTH, BOT_HEIGHT, randomNumber(0, 3)));
    } else if (index % positionCount === 0) {
      array.push(new Bot(BotRespawn.RIGHT.X, BotRespawn.RIGHT.Y, BOT_WIDTH, BOT_HEIGHT, randomNumber(0, 3)));
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

export function stopGameSound(assets) {
  for (let [_, value] of assets) {
    if (value?.nodeName === 'AUDIO') pauseSound(value);
  }
}

export function createDeepCloneMap(mapObject) {
  return new Map(Object.entries(JSON.parse(JSON.stringify(Object.fromEntries(mapObject)))));
}

export function calculateTankEdgePosition(x, y, height, width) {
  return {
    Top: y <= 0,
    Bottom: y >= SCREEN_HEIGHT - height,
    Left: x <= 0,
    Right: x >= SCREEN_WIDTH - width,
  };
}

export function animateObject(ctx, framesNumber, playerImage, objectWidth, objectHeight, frameX, frameY, setFrameX) {
  const sprteWidth = 64;
  const spriteHeight = 64;

  if (ctx instanceof CanvasRenderingContext2D) {
    ctx.drawImage(
      playerImage,
      frameX * sprteWidth,
      frameY * spriteHeight,
      sprteWidth,
      spriteHeight,
      -objectWidth / 2,
      -objectHeight / 2,
      objectWidth,
      objectHeight
    );

    if (frameX < framesNumber - 1) setFrameX(frameX + 1);
    else setFrameX(0);

    if (framesNumber > 1) requestAnimationFrame(animateObject);
  }
}
