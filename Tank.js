import { MOVEMENT } from "./Constant.js";

export default class Tank {
  constructor(x, y, width, height, bulletController, mapController) {
    this.x = x;
    this.y = y;
    this.previousX = null;
    this.previousY = null;
    this.width = width;
    this.height = height;
    this.widthOriginal = width;
    this.heightOriginal = height;
    this.speed = 2;
    this.bulletController = bulletController;
    this.bulletSpeed = 3.3;
    this.bulletDelay = 10;
    this.bulletDamage = 1;
    this.direction = MOVEMENT.forward;
    this.stoppedDirection = false;
    this.mapController = mapController;
    this.collisionWithWall = false;
    this.collisionWithBot = false;
    this.keyStates = {
      ArrowLeft: false,
      ArrowRight: false,
      ArrowUp: false,
      ArrowDown: false,
      Space: false,
    };
    this.image = new Image();
    this.image.src = "assets/tank_player.png";

    document.addEventListener("keydown", this.keydown.bind(this));
    document.addEventListener("keyup", this.keyup.bind(this));
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

    this.shoot();
  }

  shoot() {
    if (this.keyStates.Space) {
      const bulletX = this.x + (this.width / 5) * 2;
      const bulletY = this.y + this.height / 2;
      this.bulletController.shoot(
        bulletX,
        bulletY,
        this.bulletSpeed,
        this.bulletDamage,
        this.bulletDelay,
        this.direction
      );
    }
  }

  checkStoppedDirectionChanged() {
    return this.stoppedDirection != this.direction;
  }

  move() {
    if (this.checkStoppedDirectionChanged()) {
      this.unblockDirection();
      this.collisionWithWall = false;
    }

    const positionTopEdge = this.y <= 0;
    const positionBottomEdge = this.y >= this.mapController.canvasHeight - this.height;
    const positionLeftEdge = this.x <= 0;
    const positionRightEdge = this.x >= this.mapController.canvasWidth - this.width;

    if (this.keyStates.ArrowUp && this.stoppedDirection != MOVEMENT.forward) {
      positionTopEdge ? (this.y = 0) : (this.y -= this.speed);
      return;
    }

    if (this.keyStates.ArrowDown && this.stoppedDirection != MOVEMENT.reverse) {
      positionBottomEdge ? (this.y = this.mapController.canvasHeight - this.height) : (this.y += this.speed);
      return;
    }

    if (this.keyStates.ArrowLeft && this.stoppedDirection != MOVEMENT.left) {
      positionLeftEdge ? (this.x = 0) : (this.x -= this.speed);
      return;
    }

    if (this.keyStates.ArrowRight && this.stoppedDirection != MOVEMENT.right) {
      positionRightEdge ? (this.x = this.mapController.canvasWidth - this.width) : (this.x += this.speed);
      return;
    }
  }

  keydown = (e) => {
    const newKeystates = Object.values(this.keyStates).slice(0, 4);

    if (newKeystates.some((state) => state)) {
      e.code === MOVEMENT.space && this.updateKeyState(e.code);
      return;
    }

    if (this.keyStates.hasOwnProperty(e.code)) {
      this.updateKeyState(e.code);
    }
  };

  keyup = (e) => {
    if (this.keyStates.hasOwnProperty(e.code)) {
      this.keyStates[e.code] = false;
    }
  };

  updateKeyState(eventKey) {
    if (this.keyStates.hasOwnProperty(eventKey)) {
      this.keyStates[eventKey] = true;
      this.updateDirection();
    }
  }

  updateDirection() {
    if (this.keyStates.ArrowLeft) {
      this.direction = MOVEMENT.left;
    } else if (this.keyStates.ArrowRight) {
      this.direction = MOVEMENT.right;
    } else if (this.keyStates.ArrowUp) {
      this.direction = MOVEMENT.forward;
    } else if (this.keyStates.ArrowDown) {
      this.direction = MOVEMENT.reverse;
    }
  }

  blockDirection() {
    this.stoppedDirection = this.direction;
    this.speed = 0;
  }

  unblockDirection() {
    this.stoppedDirection = false;
    this.speed = 2;
  }
}
