import { animateObject } from '../common/common.js';
import { Control } from '../constants/controls.js';

export default class Bullet {
  constructor(x, y, damage, speed, direction) {
    this.x = x;
    this.y = y;
    this.damge = damage;
    this.speed = speed;
    this.direction = direction;
    this.width = 8;
    this.height = 8;
    this.color = 'white';
    this.frameX = 0;
    this.gameFrame = 0;
    this.endedAnimationExplosion = false;
    this.timeoutIdAnimationExplosion = false;
    this.collision = false;
    this.collisionDisabled = false;
  }

  draw(ctx, imgBullet) {
    if (this.collision) return;

    const bulletFrame =
      this.direction === Control.UP ? 0 : this.direction === Control.DOWN ? 2 : this.direction === Control.LEFT ? 1 : 3;

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    animateObject(ctx, 1, imgBullet, -20 / 2, -20 / 2, 20, 20, bulletFrame, 0, null, this.gameFrame, null, 1, 32, 32);
    ctx.restore();

    switch (this.direction) {
      case Control.UP:
        this.y -= this.speed;
        break;
      case Control.DOWN:
        this.y += this.speed;
        break;
      case Control.LEFT:
        this.x -= this.speed;
        break;
      case Control.RIGHT:
        this.x += this.speed;
        break;
    }
  }

  setFrameX = (frame) => (this.frameX = frame);

  setGameFrame = (frame) => (this.gameFrame = frame);
}
