import Tank from "./Tank.js";
import BulletController from "./BulletController.js";
import Enemy from "./Enemy.js";
import EnemyController from "./EnemyController.js";

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const enemies = [
  new Enemy(20, 20, 40, 40, 'white'),
  new Enemy(80, 90, 40, 40, 'yellow'),
  new Enemy(600, 90, 40, 40, 'green'),
]

const bulletController = new BulletController(ctx);
const tank = new Tank(640 / 2, 320 / 1.3, 36, 50, bulletController)
const enemyController = new EnemyController(enemies, bulletController)


function gameLoop() {
  canvas.width = 640;
  canvas.height = 320;

  tank.draw(ctx);
  enemyController.draw(ctx);
  bulletController.draw(ctx)

  requestAnimationFrame(gameLoop);
}

gameLoop()