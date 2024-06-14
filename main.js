import Tank from "./Tank.js";
import Bot from "./Bot.js";
import BulletController from "./BulletController.js";
import BotController from "./BotController.js";
import MapController from "./MapController.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const tileSize = 40;

// 0 - road
// 1 - wall
// 2 - water
// 3 - grass
// 4 - eagle
// 5 - edge of map
// 6 - rock
// 7 - eagle dead

const map = [
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  [5, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 5],
  [5, 0, 1, 0, 0, 0, 1, 0, 0, 0, 2, 2, 2, 0, 5],
  [5, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  [5, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5],
  [5, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 5],
  [5, 0, 1, 1, 6, 1, 6, 1, 1, 1, 0, 0, 0, 0, 5],
  [5, 0, 1, 0, 6, 1, 6, 1, 0, 1, 0, 1, 1, 0, 5],
  [5, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 5],
  [5, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 5],
  [5, 0, 1, 1, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 5],
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
];

const mapController = new MapController(map, tileSize);
const enemies = [
  new Bot(130, 50, tileSize, tileSize, mapController),
  new Bot(130, 180, tileSize, tileSize, mapController),
  new Bot(320, 120, tileSize, tileSize, mapController),
  new Bot(320, 180, tileSize, tileSize, mapController),
  new Bot(270, 40, tileSize, tileSize, mapController),
  new Bot(230, 40, tileSize, tileSize, mapController),
];
const botController = new BotController(enemies);
const bulletController = new BulletController(ctx, mapController, botController);
const tank = new Tank(160, 120, tileSize, tileSize, bulletController, mapController);

function gameLoop() {
  mapController.draw(canvas, ctx, tank, bulletController.bullets[0], botController.enemies);
  tank.draw(ctx);
  bulletController.draw(ctx, tank);
  botController.draw(ctx);

  requestAnimationFrame(gameLoop);
}

document.addEventListener("DOMContentLoaded", () => {
  gameLoop();
});
