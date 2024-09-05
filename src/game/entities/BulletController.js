import Bullet from './Bullet.js';
import { detectBulletCollision, isBulletOutOfScreen } from '../../engine/util/collision.js';
import { playSound } from '../../engine/soundHandler.js';
import { ImagesPathsName, SoundsPathsName } from '../constants/game.js';
import { PLAYER_ID } from '../config/config.js';
import { animateObject } from '../common/common.js';
import { MapObject } from '../constants/game.js';

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
      this.bullets[0].collision = true;

      if (!this.bullets[0].endedAnimationExplosion) {
        this.#drawSmallExplosion(ctx, tank);
      }

      this.shouldDrive(tank);
    }
  }

  detectCollisionWithEnemy() {
    this.bullets.forEach((bullet) => {
      this.enemyController.enemies.forEach((tank, index) => {
        if (tank.disabledCollision || !this.shouldDraw(index)) {
          return;
        }

        if (detectBulletCollision(tank, bullet)) {
          this.bullets[0].collision = true;
          this.enemyController.collisionBulletWithEnemy = true;
          this.bullets = [];
          this.enemyController.enemies.splice(index, 1);

          this.enemyController.tmpBullet = bullet;

          playSound(
            this.mapController.assets.get(
              tank.id === PLAYER_ID ? SoundsPathsName.PLAYER_TANK_DESTROYED_EAGLE_DESTROYED : SoundsPathsName.ENEMY_DESTROYED
            ),
            0.2
          );

          tank.unblockDirection();
        }
      });
    });
  }

  #drawSmallExplosion(ctx, tank) {
    ctx.save();
    ctx.translate(this.bullets[0].x + this.bullets[0].width / 2, this.bullets[0].y + this.bullets[0].height / 2);
    animateObject(
      ctx,
      3,
      this.assets.get(ImagesPathsName.EXPLOSION),
      -100 / 2,
      -100 / 2,
      100,
      100,
      this.bullets[0].frameX,
      0,
      this.bullets[0].setFrameX,
      this.bullets[0].gameFrame,
      this.bullets[0].setGameFrame,
      15,
      132,
      139
    );
    ctx.restore();

    const idTimeout = setTimeout(() => {
      this.bullets = [];
      tank.collisionBulletWithObject = false;
      clearTimeout(idTimeout);
    }, 300);
  }

  removeBulletOutOfScreen(bullet) {
    const index = this.bullets.indexOf(bullet);
    this.bullets.splice(index, 1);
  }

  shouldDraw(index) {
    return index < this.enemyController.maxTankOnMap;
  }

  shouldDrive(tank) {
    if (
      tank.collisionWithWall &&
      (tank.typeObjectCollision == MapObject.WALL ||
        tank.typeObjectCollision == MapObject.EAGLE ||
        tank.typeObjectCollision == MapObject.GRASS ||
        tank.typeObjectCollision == MapObject.ROAD)
    ) {
      tank.unblockDirection();
      tank.collisionWithWall = false;
    }
  }
}
