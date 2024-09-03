import { Control } from '../constants/controls.js';
import { ImagesPathsName, PLAYER_SPEED, SCREEN_HEIGHT, SCREEN_WIDTH, SoundsPathsName } from '../constants/game.js';
import { PLAYER_ID } from '../config/config.js';
import { pauseSound, playSound } from '../../engine/soundHandler.js';
import { animateObject } from '../common/common.js';

export default class Player {
  constructor(x, y, width, height) {
    this.id = PLAYER_ID;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = PLAYER_SPEED;
    this.bulletController = null;
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
    this.idle = true;
    this.playingIdleSound = false;
    this.playingMoveSound = false;
    this.angle = 0;
    this.previousAngle;
    this.collisionBulletWithObject = false;
    this.level = 2;
    this.frameX = 0;
    this.frameXRespawn = 0;
    this.gameFrame = 0;
    this.endedRespawnAnimation = false;
    this.disabledCollision = true;
    this.typeObjectCollision = null;

    document.addEventListener('keydown', this.keydown.bind(this));
    document.addEventListener('keyup', this.keyup.bind(this));
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

      const idTimeout = setTimeout(() => {
        this.endedRespawnAnimation = true;
        this.disabledCollision = false;
        clearTimeout(idTimeout);
      }, 2000);

      return;
    }

    if (image instanceof Image) {
      this.move(assets);
      this.bulletController.draw(ctx, this);

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

  move(assets) {
    this.#playSoundMovement(assets);

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
      return;
    }

    if (this.keyStates.ArrowDown && this.stoppedDirection != Control.DOWN) {
      positionBottomEdge ? (this.y = SCREEN_HEIGHT - this.height) : (this.y += this.speed);
      return;
    }

    if (this.keyStates.ArrowLeft && this.stoppedDirection != Control.LEFT) {
      positionLeftEdge ? (this.x = 0) : (this.x -= this.speed);
      return;
    }

    if (this.keyStates.ArrowRight && this.stoppedDirection != Control.RIGHT) {
      positionRightEdge ? (this.x = SCREEN_WIDTH - this.width) : (this.x += this.speed);
      return;
    }
  }

  setTankAngle() {
    const angleLookup = {
      [Control.UP]: 0,
      [Control.DOWN]: Math.PI,
      [Control.LEFT]: -Math.PI / 2,
      [Control.RIGHT]: Math.PI / 2,
    };

    this.previousAngle = this.angle;
    this.angle = angleLookup[this.direction];

    this.stopTankWhenTurning();
  }

  stopTankWhenTurning() {
    const adjustmentValue = this.speed;

    if (this.angle != this.previousAngle) {
      switch (this.direction) {
        case Control.UP:
          this.y += adjustmentValue;
          break;
        case Control.DOWN:
          this.y -= adjustmentValue;
          break;
        case Control.LEFT:
          this.x += adjustmentValue;
          break;
        case Control.RIGHT:
          this.x -= adjustmentValue;
          break;
      }
    }
  }

  shoot() {
    if (this.keyStates.Space) {
      const bulletX = this.x + (this.width / 5) * 2;
      const bulletY = this.y + this.height / 2;
      this.bulletController.shoot(bulletX, bulletY, this.bulletSpeed, this.bulletDamage, this.bulletDelay, this.direction);
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

  endedIdleSound() {
    this.playingIdleSound = false;
  }

  #playSoundMovement(assets) {
    this.#updateMovementState();
    const idleSound = assets.get(SoundsPathsName.PLAYER_TANK_IDLE);
    const moveSound = assets.get(SoundsPathsName.PLAYER_TANK_MOVING);
    this.#handleSound(idleSound, moveSound);
  }

  #handleSound(idleSound, moveSound) {
    if (this.idle && !this.playingIdleSound) {
      this.playingMoveSound = false;
      pauseSound(moveSound);

      playSound(idleSound, 0.5, true);
      this.playingIdleSound = true;
      return;
    }

    if (!this.idle && !this.playingMoveSound) {
      this.playingIdleSound = false;
      pauseSound(idleSound);

      playSound(moveSound, 0.5, true);
      this.playingMoveSound = true;
      return;
    }
  }

  #updateMovementState() {
    const keyStateValues = Object.values(this.keyStates).slice(0, 4);
    const isMoving = keyStateValues.includes(true);
    this.idle = !isMoving;
  }

  checkStoppedDirectionChanged() {
    return this.stoppedDirection != this.direction;
  }
}
