import { Movement } from './constant/Constant.js';

export default class Bot {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.width = width;
    this.height = height;
    this.previousX = null;
    this.previousY = null;
    this.direction = null;
    this.directions = [Movement.FORWARD, Movement.REVERSE, Movement.LEFT, Movement.RIGHT];
    this.bullets = [];
    this.bulletSpeed = 3;
    this.bulletDamage = 1;
    this.timeoutId = null;
    this.isDelayed = false;
    this.bulletController = null;
    this.timeoutId = null;
    this.bulletTimeoutId = null;
  }

  draw(ctx, image) {
    if (image instanceof Image) {
      this.move();

      ctx.save();
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

      let angle;
      switch (this.direction) {
        case Movement.FORWARD:
          angle = 0;
          break;
        case Movement.REVERSE:
          angle = Math.PI;
          break;
        case Movement.LEFT:
          angle = -Math.PI / 2;
          break;
        case Movement.RIGHT:
          angle = Math.PI / 2;
          break;
      }

      ctx.rotate(angle);

      ctx.drawImage(image, -this.width / 2, -this.height / 2, this.width, this.height);

      ctx.restore();

      this.shoot();
    }
  }

  shoot() {
    if (this.bulletTimeoutId) return;

    this.bulletTimeoutId = setTimeout(() => {
      const bulletX = this.x + (this.width / 5) * 2;
      const bulletY = this.y + this.height / 2;
      this.bulletController.shoot(bulletX, bulletY, this.bulletSpeed, this.bulletDamage, this.bulletDelay, this.direction);

      clearTimeout(this.bulletTimeoutId);
      this.bulletTimeoutId = null;
    }, 5000);
  }

  move() {
    if (this.direction === null) {
      this.changeDirection();
    }

    switch (this.direction) {
      case Movement.FORWARD:
        this.y -= this.speed;
        break;
      case Movement.REVERSE:
        this.y += this.speed;
        break;
      case Movement.LEFT:
        this.x -= this.speed;
        break;
      case Movement.RIGHT:
        this.x += this.speed;
        break;
    }
  }

  changeDirection() {
    const newDirections = this.directions.filter((direction) => direction !== this.direction);
    this.direction = newDirections[Math.floor(Math.random() * newDirections.length)];
  }

  blockDirection() {
    this.speed = 0;
  }

  unblockDirection() {
    this.speed = 2;
  }
}
