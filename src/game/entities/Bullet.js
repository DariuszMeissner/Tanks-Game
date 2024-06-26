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
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

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
}
