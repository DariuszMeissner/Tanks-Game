export default class Enemy {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.width = width;
    this.height = height;
    this.color = color;
    this.previousX = null;
    this.previousY = null;
    this.direction = null;
    this.directions = ['up', 'down', 'left', 'right'];
    this.collisionWithBot = null;
    this.bullets = [];
    this.bulletSpeed = 2;
  }

  draw(ctx) {
    this.getPositionXAndY();
    this.move();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    if (this.direction === null) {
      this.changeDirection();
    }

    switch (this.direction) {
      case 'up':
        this.y -= this.speed;
        break;
      case 'down':
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

  changeDirection() {
    const newDirections = this.directions.filter(direction => direction !== this.direction);
    this.direction = newDirections[Math.floor(Math.random() * newDirections.length)];
  }

  getPositionXAndY() {
    this.previousX = this.x;
    this.previousY = this.y;
  }
}