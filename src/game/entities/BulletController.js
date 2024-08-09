import Bullet from './Bullet.js';
import { isBulletOutOfScreen } from '../../engine/util/collision.js';
import { playSound } from '../../engine/soundHandler.js';
import { ImagesPathsName, SoundsPathsName } from '../constants/game.js';
import { PLAYER_ID } from '../config/config.js';
import { animateObject } from '../common/common.js';

export default class BulletController {
  bullets = [];
  constructor(mapController, enemyController, assets) {
    this.mapController = mapController;
    this.enemyController = enemyController;
    this.assets = assets;
  }

  draw(ctx, tank) {
    this.bullets.forEach((bullet) => {
      if (isBulletOutOfScreen(bullet)) {
        this.removeBulletOutOfScreen(bullet);
      }

      bullet.draw(ctx, this.assets.get(ImagesPathsName.BULLET));
      this.detectCollisionWithEnemy();
      this.detectCollisionWithWall(ctx, tank);
    });
  }

  shoot(x, y, speed, damage, delay, direction) {
    if (this.bullets.length === 0) {
      this.bullets.push(new Bullet(x, y, damage, speed, direction));
    }
  }

  detectCollisionWithWall(ctx, tank) {
    if (tank.collisionBulletWithObject) {
      tank.bulletController.bullets[0].collision = true;

      if (!tank.bulletController.bullets[0].endedAnimationExplosion) {
        ctx.save();
        ctx.translate(
          tank.bulletController.bullets[0].x + tank.bulletController.bullets[0].width / 2,
          tank.bulletController.bullets[0].y + tank.bulletController.bullets[0].height / 2
        );
        animateObject(
          ctx,
          3,
          this.assets.get(ImagesPathsName.EXPLOSION),
          -100 / 2,
          -100 / 2,
          100,
          100,
          tank.bulletController.bullets[0].frameX,
          0,
          tank.bulletController.bullets[0].setFrameX,
          tank.bulletController.bullets[0].gameFrame,
          tank.bulletController.bullets[0].setGameFrame,
          25,
          132,
          139
        );
        ctx.restore();

        // setTimeout(() => {
        tank.bulletController.bullets = [];
        tank.collisionBulletWithObject = false;
        // }, 600);
      }

      tank.unblockDirection();
    }
  }

  detectCollisionWithEnemy() {
    this.bullets.forEach((bullet) => {
      this.enemyController.enemies.forEach((enemy, index) => {
        if (enemy.disabledCollision) return;

        if (index < this.enemyController.maxTankOnMap) {
          const isColisionWithEnemy =
            bullet.x >= enemy.x &&
            bullet.y >= enemy.y &&
            bullet.x + bullet.width <= enemy.x + enemy.width &&
            bullet.y + bullet.height <= enemy.y + enemy.height;

          if (isColisionWithEnemy) {
            this.enemyController.enemies.splice(index, 1);
            this.bullets = [];

            enemy.unblockDirection();

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
