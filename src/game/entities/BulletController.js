import Bullet from './Bullet.js';
import { isBulletOutOfScreen } from '../../engine/util/collision.js';

export default class BulletController {
  bullets = [];
  constructor(mapController, enemyController) {
    this.mapController = mapController;
    this.enemyController = enemyController;
  }

  draw(ctx, tank) {
    this.bullets.forEach((bullet) => {
      if (isBulletOutOfScreen(bullet)) {
        this.removeBulletOutOfScreen(bullet);
      }

      bullet.draw(ctx);
      this.detectCollisionWithEnemy(tank);
      this.detectCollisionWithWall(tank);
    });
  }

  shoot(x, y, speed, damage, delay, direction) {
    if (this.bullets.length === 0) {
      this.bullets.push(new Bullet(x, y, damage, speed, direction));
    }
  }

  detectCollisionWithWall(tank) {
    if (this.mapController.collisionWallWithBullet) {
      this.bullets = [];
      this.mapController.collisionWallWithBullet = false;

      tank.unblockDirection();
    }
  }

  detectCollisionWithEnemy(tank) {
    this.bullets.forEach((bullet) => {
      this.enemyController.enemies.forEach((bot, index) => {
        const isColision =
          bullet.x >= bot.x &&
          bullet.y >= bot.y &&
          bullet.x + bullet.width <= bot.x + bot.width &&
          bullet.y + bullet.height <= bot.y + bot.height;

        if (isColision) {
          this.enemyController.enemies.splice(index, 1);
          this.bullets = [];
          tank.unblockDirection();
        }
      });
    });
  }

  removeBulletOutOfScreen(bullet) {
    const index = this.bullets.indexOf(bullet);
    this.bullets.splice(index, 1);
  }
}
