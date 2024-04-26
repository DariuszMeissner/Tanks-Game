import Bullet from "./bullet.js";

export default class BulletController {
  bullets = [];
  timerToNextBullet = 0;
  constructor(ctx) {
    this.ctx = ctx;
  }

  shoot(x, y, speed, damage, delay, direction) {
    if (this.timerToNextBullet <= 0) {
      this.bullets.push(new Bullet(x, y, damage, speed, direction))
      this.timerToNextBullet = delay;
    }
    this.timerToNextBullet--;
  }

  isBulletOutOfScreen(bullet) {
    return bullet.y <= -bullet.height
      || bullet.y >= 320 + bullet.height
      || bullet.x <= bullet.height
      || bullet.x >= 640 + bullet.width;
  }

  removeBulletOutOfScreen(bullet) {
    const index = this.bullets.indexOf(bullet);
    this.bullets.splice(index, 1);
  }

  draw(ctx) {
    this.bullets.forEach(bullet => {
      if (this.isBulletOutOfScreen(bullet)) {
        this.removeBulletOutOfScreen()
      }

      bullet.draw(ctx)
    })
  }
}