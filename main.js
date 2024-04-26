import Tank from "./Tank.js";
import BulletController from "./BulletController.js";
import Enemy from "./Enemy.js";

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const bulletController = new BulletController(ctx);
const tank = new Tank(640 / 2, 320 / 1.3, 36, 50, bulletController)
const enemy = new Enemy(100, 100, 30, 40, 'white')

function gameLoop() {
  canvas.width = 640;
  canvas.height = 320;
  tank.draw(ctx);
  enemy.draw(ctx);
  bulletController.draw(ctx)
  requestAnimationFrame(gameLoop);
}

gameLoop()