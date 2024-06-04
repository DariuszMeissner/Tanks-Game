export default class Enemy {
  constructor(x, y, width, height, color, mapController) {
    this.x = x;
    this.y = y;
    this.speed = 1.5;
    this.width = width;
    this.height = height;
    this.color = color;
    this.previousX = null;
    this.previousY = null;
    this.direction = null;
    this.directions = ["up", "down", "left", "right"];
    this.collisionWithBot = null;
    this.bullets = [];
    this.bulletSpeed = 2;
    this.mapController = mapController;
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

    const positionOutTop = this.y <= 0 - this.height;
    const positionOutBottom = this.y >= this.mapController.canvasWidth;
    const positionOutLeft = this.x <= 0 - this.width;
    const positionOutRight = this.x >= this.mapController.canvasWidth;
    const moveToBottom = this.mapController.canvasHeight + this.height;
    const moveToTop = 0 - this.height;
    const moveToLeft = 0 - this.width;
    const moveToRight = this.mapController.canvasWidth;

    switch (this.direction) {
      case "up":
        // this.y -= this.speed;
        positionOutTop ? (this.y = moveToBottom) : (this.y -= this.speed);
        break;
      case "down":
        // this.y += this.speed;
        positionOutBottom ? (this.y = moveToTop) : (this.y += this.speed);
        break;
      case "left":
        // this.x -= this.speed;
        positionOutLeft ? (this.x = moveToRight) : (this.x -= this.speed);
        break;
      case "right":
        // this.x += this.speed;
        positionOutRight ? (this.x = moveToLeft) : (this.x += this.speed);
        break;
    }
  }

  changeDirection() {
    const newDirections = this.directions.filter((direction) => direction !== this.direction);
    this.direction = newDirections[Math.floor(Math.random() * newDirections.length)];
  }

  getPositionXAndY() {
    this.previousX = this.x;
    this.previousY = this.y;
  }
}
