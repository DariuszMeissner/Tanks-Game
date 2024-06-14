import Bullet from "./Bullet.js";

export default class BulletController {
  bullets = [];
  constructor(ctx, mapController, enemyController) {
    this.ctx = ctx;
    this.mapController = mapController;
    this.enemyController = enemyController;
  }

  draw(ctx, player) {
    this.bullets.forEach((bullet) => {
      if (this.isBulletOutOfScreen(bullet)) {
        this.removeBulletOutOfScreen(bullet);
      }

      bullet.draw(ctx);
      this.detectCollisionBot(player);
      this.detectCollisionWithWall(player);
    });
  }

  shoot(x, y, speed, damage, delay, direction) {
    if (this.bullets.length === 0) {
      this.bullets.push(new Bullet(x, y, damage, speed, direction));
    }
  }

  detectCollisionWithWall(player) {
    if (this.mapController.collisionWallWithBullet) {
      this.bullets = [];
      this.mapController.collisionWallWithBullet = false;

      player.unblockDirection();
    }
  }

  detectCollisionBot(player) {
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
          player.unblockDirection();
        }
      });
    });
  }

  isBulletOutOfScreen(bullet) {
    return (
      bullet.y <= -bullet.height ||
      bullet.y >= this.mapController.canvasHeight + bullet.height ||
      bullet.x <= -bullet.width ||
      bullet.x >= this.mapController.canvasWidth + bullet.width
    );
  }

  removeBulletOutOfScreen(bullet) {
    const index = this.bullets.indexOf(bullet);
    this.bullets.splice(index, 1);
  }
}
