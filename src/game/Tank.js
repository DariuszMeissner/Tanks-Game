import { CanvasSize, Movement } from './config/Constant.js';

export default class Tank {
  constructor(x, y, width, height, bulletController) {
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
    this.direction = Movement.FORWARD;
    this.stoppedDirection = false;
    this.collisionWithWall = false;
    this.collisionWithBot = false;
    this.keyStates = {
      ArrowLeft: false,
      ArrowRight: false,
      ArrowUp: false,
      ArrowDown: false,
      Space: false,
    };

    document.addEventListener('keydown', this.keydown.bind(this));
    document.addEventListener('keyup', this.keyup.bind(this));
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
    if (this.keyStates.Space) {
      const bulletX = this.x + (this.width / 5) * 2;
      const bulletY = this.y + this.height / 2;
      this.bulletController.shoot(bulletX, bulletY, this.bulletSpeed, this.bulletDamage, this.bulletDelay, this.direction);
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
    const positionBottomEdge = this.y >= CanvasSize.HEIGHT - this.height;
    const positionLeftEdge = this.x <= 0;
    const positionRightEdge = this.x >= CanvasSize.WIDTH - this.width;

    if (this.keyStates.ArrowUp && this.stoppedDirection != Movement.FORWARD) {
      positionTopEdge ? (this.y = 0) : (this.y -= this.speed);
      return;
    }

    if (this.keyStates.ArrowDown && this.stoppedDirection != Movement.REVERSE) {
      positionBottomEdge ? (this.y = CanvasSize.HEIGHT - this.height) : (this.y += this.speed);
      return;
    }

    if (this.keyStates.ArrowLeft && this.stoppedDirection != Movement.LEFT) {
      positionLeftEdge ? (this.x = 0) : (this.x -= this.speed);
      return;
    }

    if (this.keyStates.ArrowRight && this.stoppedDirection != Movement.RIGHT) {
      positionRightEdge ? (this.x = CanvasSize.WIDTH - this.width) : (this.x += this.speed);
      return;
    }
  }

  keydown = (e) => {
    const newKeystates = Object.values(this.keyStates).slice(0, 4);

    if (newKeystates.some((state) => state)) {
      e.code === Movement.SPACE && this.updateKeyState(e.code);
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
      this.direction = Movement.LEFT;
    } else if (this.keyStates.ArrowRight) {
      this.direction = Movement.RIGHT;
    } else if (this.keyStates.ArrowUp) {
      this.direction = Movement.FORWARD;
    } else if (this.keyStates.ArrowDown) {
      this.direction = Movement.REVERSE;
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
