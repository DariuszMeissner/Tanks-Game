import BulletController from './BulletController.js';
import { Control } from '../constants/controls.js';
import { PLAYER_SPEED, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/game.js';
import { PLAYER_ID } from '../config/config.js';

export default class Player {
  constructor(x, y, width, height) {
    this.id = PLAYER_ID;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = PLAYER_SPEED;
    this.bulletController = new BulletController(null, null);
    this.bulletSpeed = 3;
    this.bulletDelay = 10;
    this.bulletDamage = 1;
    this.direction = Control.UP;
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
      this.bulletController.draw(ctx, this);

      ctx.save();
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

      let angle;
      switch (this.direction) {
        case Control.UP:
          angle = 0;
          break;
        case Control.DOWN:
          angle = Math.PI;
          break;
        case Control.LEFT:
          angle = -Math.PI / 2;
          break;
        case Control.RIGHT:
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
    const positionBottomEdge = this.y >= SCREEN_HEIGHT - this.height;
    const positionLeftEdge = this.x <= 0;
    const positionRightEdge = this.x >= SCREEN_WIDTH - this.width;

    if (this.keyStates.ArrowUp && this.stoppedDirection != Control.UP) {
      positionTopEdge ? (this.y = 0) : (this.y -= this.speed);
    } else if (this.keyStates.ArrowDown && this.stoppedDirection != Control.DOWN) {
      positionBottomEdge ? (this.y = SCREEN_HEIGHT - this.height) : (this.y += this.speed);
    } else if (this.keyStates.ArrowLeft && this.stoppedDirection != Control.LEFT) {
      positionLeftEdge ? (this.x = 0) : (this.x -= this.speed);
    } else if (this.keyStates.ArrowRight && this.stoppedDirection != Control.RIGHT) {
      positionRightEdge ? (this.x = SCREEN_WIDTH - this.width) : (this.x += this.speed);
    }
  }

  keydown = (e) => {
    const newKeystates = Object.values(this.keyStates).slice(0, 4);

    if (newKeystates.some((state) => state)) {
      e.code === Control.SPACE && this.updateKeyState(e.code);
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
      this.direction = Control.LEFT;
    } else if (this.keyStates.ArrowRight) {
      this.direction = Control.RIGHT;
    } else if (this.keyStates.ArrowUp) {
      this.direction = Control.UP;
    } else if (this.keyStates.ArrowDown) {
      this.direction = Control.DOWN;
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
