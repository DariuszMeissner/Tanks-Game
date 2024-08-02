import Bullet from './Bullet.js';
import { isBulletOutOfScreen } from '../../engine/util/collision.js';
import { playSound } from '../../engine/soundHandler.js';
import { SoundsPathsName } from '../constants/game.js';
import { PLAYER_ID } from '../config/config.js';

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
    if (tank.collisionBulletWithObject) {
      this.bullets = [];
      tank.collisionBulletWithObject = false;

      tank.unblockDirection();
    }
  }

  detectCollisionWithEnemy(tank) {
    this.bullets.forEach((bullet) => {
      this.enemyController.enemies.forEach((enemy, index) => {
        if (index < this.enemyController.maxTankOnMap) {
          const isColision =
            bullet.x >= enemy.x &&
            bullet.y >= enemy.y &&
            bullet.x + bullet.width <= enemy.x + enemy.width &&
            bullet.y + bullet.height <= enemy.y + enemy.height;

          if (isColision) {
            this.enemyController.enemies.splice(index, 1);
            this.bullets = [];

            tank.unblockDirection();

            playSound(
              this.mapController.assets.get(
                enemy.id === PLAYER_ID ? SoundsPathsName.PLAYER_TANK_DESTROYED_EAGLE_DESTROYED : SoundsPathsName.ENEMY_DESTROYED
              ),
              0.2
            );
          }
        }
      });
    });
  }

  removeBulletOutOfScreen(bullet) {
    const index = this.bullets.indexOf(bullet);
    this.bullets.splice(index, 1);
  }
}
