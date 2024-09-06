import { Control1 } from '../../game/constants/game.js';
import { BOT_DELAY_START, BOT_SPEED, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../game/constants/game.js';

export function detectCollisionFrontOfTank(object, tank) {
  if (!object || !tank) return false;

  switch (tank.direction) {
    case Control1.UP:
      return (
        object.y < tank.y + tank.height &&
        object.y + object.height > tank.y - tank.speed &&
        object.x < tank.x + tank.width &&
        object.x + object.width > tank.x
      );
    case Control1.DOWN:
      return (
        object.y < tank.y + tank.height + tank.speed &&
        object.y > tank.y &&
        object.x < tank.x + tank.width &&
        object.x + object.width > tank.x
      );
    case Control1.LEFT:
      return (
        object.x + object.width > tank.x - tank.speed &&
        object.x < tank.x + tank.width &&
        object.y < tank.y + tank.height &&
        object.y + object.height > tank.y
      );
    case Control1.RIGHT:
      return (
        object.x + object.width > tank.x &&
        object.x < tank.x + tank.width + tank.speed &&
        object.y < tank.y + tank.height &&
        object.y + object.height > tank.y
      );
    default:
      return false;
  }
}

export function resetSpeedAfterTimeout(enemy) {
  if (!enemy) return;

  if (enemy.timeoutId) {
    clearTimeout(enemy.timeoutId);
  }

  enemy.timeoutId = setTimeout(() => {
    enemy.speed = BOT_SPEED;
    clearTimeout(enemy.timeoutId);
    enemy.timeoutId = null;
  }, BOT_DELAY_START);
}

export function handleCollision(objectOfCollision, tank) {
  if (detectCollisionFrontOfTank(objectOfCollision, tank, tank.direction, tank.speed)) {
    tank.speed = 0;
    tank.changeDirection();

    if (!detectCollisionFrontOfTank(objectOfCollision, tank, tank.direction, tank.speed)) {
      resetSpeedAfterTimeout(tank);
    } else {
      tank.changeDirection();
      resetSpeedAfterTimeout(tank);
    }
  }
}

export function detectCollisionWithBullet(mapElement, bullet) {
  if (!bullet) return false;

  return (
    mapElement.x < bullet.x + bullet.width &&
    mapElement.x + mapElement.width > bullet.x &&
    mapElement.y < bullet.y + bullet.height &&
    mapElement.y + mapElement.height > bullet.y
  );
}

export function isBulletOutOfScreen(bullet) {
  return (
    bullet.y <= -bullet.height ||
    bullet.y >= SCREEN_HEIGHT + bullet.height ||
    bullet.x <= -bullet.width ||
    bullet.x >= SCREEN_WIDTH + bullet.width
  );
}

export function detectBulletCollision(tank, bullet) {
  return (
    bullet.x >= tank.x &&
    bullet.y >= tank.y &&
    bullet.x + bullet.width <= tank.x + tank.width &&
    bullet.y + bullet.height <= tank.y + tank.height
  );
}
