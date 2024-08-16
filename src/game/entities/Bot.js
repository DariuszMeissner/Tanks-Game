import { animateObject, calculateTankEdgePosition } from '../common/common.js';
import { BOT_ID, BOT_TIME_TO_SHOOT } from '../config/config.js';
import { Control } from '../constants/controls.js';
import { Angle, BOT_SPEED, ImagesPathsName } from '../constants/game.js';

export default class Bot {
  constructor(x, y, width, height, level = 0) {
    this.id = BOT_ID;
    this.x = x;
    this.y = y;
    this.speed = BOT_SPEED;
    this.width = width;
    this.height = height;
    this.direction = Control.DOWN;
    this.directions = [Control.UP, Control.DOWN, Control.LEFT, Control.RIGHT];
    this.bullets = [];
    this.bulletSpeed = 3;
    this.bulletDamage = 1;
    this.timeoutId = null;
    this.isDelayed = false;
    this.bulletController = null;
    this.timeoutId = null;
    this.bulletTimeoutId = null;
    this.angle = 0;
    this.idle = true;
    this.previousAngle = undefined;
    this.collisionBulletWithObject = false;
    this.level = level;
    this.frameX = 0;
    this.frameXRespawn = 0;
    this.gameFrame = 0;
    this.endedRespawnAnimation = false;
    this.disabledCollision = true;
    this.typeObjectCollision = null;
  }

  draw(ctx, image, assets) {
    if (!this.endedRespawnAnimation) {
      ctx.save();
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      animateObject(
        ctx,
        4,
        assets.get(ImagesPathsName.RESPAWN_TANK),
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height,
        this.frameXRespawn,
        0,
        this.setFrameXRespawn,
        this.gameFrame,
        this.setGameFrame,
        9,
        60
      );
      ctx.restore();

      setTimeout(() => {
        this.endedRespawnAnimation = true;
        this.disabledCollision = false;
      }, 2000);

      return;
    }

    if (image instanceof Image) {
      this.move();

      ctx.save();
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

      this.setTankAngle();

      ctx.rotate(this.angle);

      animateObject(
        ctx,
        this.idle ? 1 : 2,
        image,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height,
        this.frameX,
        this.level,
        this.setFrameX,
        this.gameFrame,
        this.setGameFrame,
        1
      );
      ctx.restore();

      this.shoot();
    }
  }

  setFrameX = (frame) => (this.frameX = frame);

  setFrameXRespawn = (frame) => (this.frameXRespawn = frame);

  setGameFrame = (frame) => (this.gameFrame = frame);

  shoot() {
    if (this.bulletTimeoutId) return;

    this.bulletTimeoutId = setTimeout(() => {
      const bulletX = this.x + (this.width / 5) * 2;
      const bulletY = this.y + this.height / 2;
      this.bulletController.shoot(bulletX, bulletY, this.bulletSpeed, this.bulletDamage, this.bulletDelay, this.direction);

      clearTimeout(this.bulletTimeoutId);
      this.bulletTimeoutId = null;
    }, BOT_TIME_TO_SHOOT);
  }

  move() {
    this.#updateMovementState();

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

  setTankAngle() {
    const angleLookup = {
      [Control.UP]: Angle.UP,
      [Control.DOWN]: Angle.DOWN,
      [Control.LEFT]: Angle.LEFT,
      [Control.RIGHT]: Angle.RIGHT,
    };

    this.previousAngle = this.angle;
    this.angle = angleLookup[this.direction];

    if (this.angle != this.previousAngle) {
      this.stopTankWhenTurning();
    }
  }

  stopTankWhenTurning() {
    const positionEdge = calculateTankEdgePosition(this.x, this.y, this.height, this.width);
    const adjustmentValue = 2;

    if (this.previousAngle === Angle.RIGHT) {
      switch (this.direction) {
        case Control.DOWN:
          this.x -= adjustmentValue;
          positionEdge.Bottom ? (this.y -= adjustmentValue) : (this.y += adjustmentValue);
          break;
        case Control.UP:
          this.x -= adjustmentValue;
          positionEdge.Top ? (this.y += adjustmentValue) : (this.y -= adjustmentValue);
          break;
        case Control.LEFT:
          this.x -= adjustmentValue;
          break;
      }
    }
    if (this.previousAngle === Angle.LEFT) {
      switch (this.direction) {
        case Control.DOWN:
          this.x += adjustmentValue;
          positionEdge.Bottom ? (this.y -= adjustmentValue) : (this.y += adjustmentValue);
          break;
        case Control.UP:
          this.x += adjustmentValue;
          positionEdge.Top ? (this.y += adjustmentValue) : (this.y -= adjustmentValue);
          break;
        case Control.RIGHT:
          this.x += adjustmentValue;
          break;
      }
    }
    if (this.previousAngle === Angle.UP) {
      switch (this.direction) {
        case Control.DOWN:
          this.y += adjustmentValue;
          break;
        case Control.LEFT:
          positionEdge.Left ? (this.x += adjustmentValue) : (this.x -= adjustmentValue);
          this.y += adjustmentValue;
          break;
        case Control.RIGHT:
          positionEdge.Right ? (this.x -= adjustmentValue) : (this.x += adjustmentValue);
          this.y += adjustmentValue;
          break;
      }
    }
    if (this.previousAngle === Angle.DOWN) {
      switch (this.direction) {
        case Control.UP:
          this.y -= adjustmentValue;
          break;
        case Control.LEFT:
          positionEdge.Left ? (this.x += adjustmentValue) : (this.x -= adjustmentValue);
          this.y -= adjustmentValue;
          break;
        case Control.RIGHT:
          positionEdge.Right ? (this.x -= adjustmentValue) : (this.x += adjustmentValue);
          this.y -= adjustmentValue;
          break;
      }
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
    this.speed = BOT_SPEED;
  }

  #updateMovementState() {
    this.idle = this.speed === 0;
  }
}
