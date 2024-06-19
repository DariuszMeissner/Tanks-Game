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
    ctx.fillRect(this.x, this.y, this.width, this.height)

    switch (this.direction) {
      case 'forward':
        this.y -= this.speed;
        break;
      case 'reverse':
        this.y += this.speed;
        break;
      case 'left':
        this.x -= this.speed;
        break;
      case 'right':
        this.x += this.speed;
        break;
    }
  }
}