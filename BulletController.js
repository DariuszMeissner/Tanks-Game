import Bullet from "./Bullet.js";

export default class BulletController {
  bullets = [];
  timerToNextBullet = 0;
  constructor(ctx, mapController, enemyController) {
    this.ctx = ctx;
    this.mapController = mapController;
    this.enemyController = enemyController;
  }

  draw(ctx) {
    this.bullets.forEach(bullet => {
      if (this.isBulletOutOfScreen(bullet)) {
        this.removeBulletOutOfScreen(bullet)
      }

      bullet.draw(ctx);
      this.detectCollisionBot();
      this.detectCollisionWithWall();
    })
  }

  shoot(x, y, speed, damage, delay, direction) {
    if (this.bullets.length === 0) {
      this.bullets.push(new Bullet(x, y, damage, speed, direction))
    }
  }

  detectCollisionWithWall() {
    if (this.mapController.collisionWallWithBullet) {
      this.bullets = [];
      this.mapController.collisionWallWithBullet = false;
    }
  }

  detectCollisionBot() {
    this.bullets.forEach(bullet => {
      this.enemyController.enemies.forEach((bot, index) => {
        const isColision =
          (bullet.x >= bot.x)
          && (bullet.y >= bot.y)
          && (bullet.x + bullet.width <= bot.x + bot.width)
          && (bullet.y + bullet.height <= bot.y + bot.height)


        if (isColision) {
          this.enemyController.enemies.splice(index, 1);
          this.bullets = [];
        }

      })
    });
  }


  isBulletOutOfScreen(bullet) {
    return bullet.y <= -bullet.height
      || bullet.y >= this.mapController.canvasHeight + bullet.height
      || bullet.x <= -bullet.width
      || bullet.x >= this.mapController.canvasWidth + bullet.width;
  }

  removeBulletOutOfScreen(bullet) {
    const index = this.bullets.indexOf(bullet);
    this.bullets.splice(index, 1);
  }

}