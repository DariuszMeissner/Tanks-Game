import Tank from "./Tank.js";
import BulletController from "./BulletController.js";
import Bot from "./Bot.js";
import BotController from "./BotController.js";
import MapController from "./MapController.js";

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 40;

export const mapObject = { road: 0, wall: 1, water: 2, grass: 3, eagle: 4 }

const enemies = [
  new Bot(120, 120, tileSize, tileSize, 'yellow'),
  new Bot(120, 180, tileSize, tileSize, 'pink'),
  // new Bot(380, 120, tileSize, tileSize, 'pink'),
]

// 0 - road
// 1 - wall
// 2 - water
// 3 - grass
// 4 - eagle

const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 1],
  [1, 0, 1, 1, 1, 1, 3, 1, 1, 1, 1, 2, 2, 0, 1],
  [1, 0, 1, 0, 1, 1, 3, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1],
]

const mapController = new MapController(map, tileSize);
const botController = new BotController(enemies)
const bulletController = new BulletController(ctx, mapController, botController);
const tank = new Tank(160, 80, tileSize, tileSize, bulletController, mapController)


function gameLoop() {
  mapController.draw(canvas, ctx, tank, bulletController.bullets[0], botController.enemies);
  tank.draw(ctx);
  bulletController.draw(ctx)
  botController.draw(ctx);

  requestAnimationFrame(gameLoop);
}

document.addEventListener('DOMContentLoaded', () => {
  gameLoop()
})