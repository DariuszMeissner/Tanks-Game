import { MOVEMENT } from "./Constant.js";

export default class Enemy {
  constructor(x, y, width, height, mapController) {
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.width = width;
    this.height = height;
    this.previousX = null;
    this.previousY = null;
    this.direction = null;
    this.directions = ["forward", "reverse", "left", "right"];
    this.bullets = [];
    this.bulletSpeed = 2;
    this.bulletDamage = 1;
    this.mapController = mapController;
    this.timeoutId = null;
    this.isDelayed = false;
    this.image = new Image();
    this.image.src = "assets/tank_enemy_basic.png";
  }

  draw(ctx) {
    this.move();

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

    // Rotate the canvas
    let angle;
    switch (this.direction) {
      case MOVEMENT.forward:
        angle = 0;
        break;
      case MOVEMENT.reverse:
        angle = Math.PI;
        break;
      case MOVEMENT.left:
        angle = -Math.PI / 2;
        break;
      case MOVEMENT.right:
        angle = Math.PI / 2;
        break;
    }

    ctx.rotate(angle);

    ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);

    ctx.restore();
  }

  move() {
    if (this.direction === null) {
      this.changeDirection();
    }

    const positionTopEdge = this.y <= 0;
    const positionBottomEdge = this.y >= this.mapController.canvasHeight - this.height;
    const positionLeftEdge = this.x <= 0;
    const positionRightEdge = this.x >= this.mapController.canvasWidth - this.width;

    switch (this.direction) {
      case MOVEMENT.forward:
        positionTopEdge ? (this.y = 0) : (this.y -= this.speed);
        break;
      case MOVEMENT.reverse:
        positionBottomEdge ? (this.y = this.mapController.canvasHeight - this.height) : (this.y += this.speed);
        break;
      case MOVEMENT.left:
        positionLeftEdge ? (this.x = 0) : (this.x -= this.speed);
        break;
      case MOVEMENT.right:
        positionRightEdge ? (this.x = this.mapController.canvasWidth - this.width) : (this.x += this.speed);
        break;
    }
  }

  changeDirection() {
    const newDirections = this.directions.filter((direction) => direction !== this.direction);
    this.direction = newDirections[Math.floor(Math.random() * newDirections.length)];
  }
}