import { Control } from '../../game/constants/controls.js';
import { BOT_DELAY_START, BOT_SPEED, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../game/constants/game.js';

/**
 * Check if there is a collision between an object and the front side of a tank based on the tank's direction.
 *
 * @param {Object} object - The object to check collision with.
 * @param {Object} tank - The tank object.
 * @param {string} tankDirection - The direction the tank is facing (UP, DOWN, LEFT, RIGHT).
 * @returns {boolean} Returns true if there is a collision, otherwise false.
 */
export function detectCollisionFrontOfTank(object, tank, tankDirection, compensateSpeed) {
  if (!object || !tank) return false;

  switch (tankDirection) {
    case Control.UP:
      return (
        object.y < tank.y + tank.height &&
        object.y + object.height > tank.y - compensateSpeed &&
        object.x < tank.x + tank.width &&
        object.x + object.width > tank.x
      );
    case Control.DOWN:
      return (
        object.y < tank.y + tank.height + compensateSpeed &&
        object.y > tank.y &&
        object.x < tank.x + tank.width &&
        object.x + object.width > tank.x
      );
    case Control.LEFT:
      return (
        object.x + object.width > tank.x - compensateSpeed &&
        object.x < tank.x + tank.width &&
        object.y < tank.y + tank.height &&
        object.y + object.height > tank.y
      );
    case Control.RIGHT:
      return (
        object.x + object.width > tank.x &&
        object.x < tank.x + tank.width + compensateSpeed &&
        object.y < tank.y + tank.height &&
        object.y + object.height > tank.y
      );
    default:
      return false;
  }
}

/**
 * Resets the speed of the enemy after a specified timeout period.
 *
 * @param {Object} enemy - The enemy object whose speed needs to be reset.
 * @returns {void}
 */
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

/**
 * Handles collision detection between an object and a tank.
 * If a collision is detected in front of the tank, it stops the tank's speed and changes its direction.
 * If the tank is still colliding after changing direction, it resets the tank's speed after a timeout.
 *
 * @param {Object} objectOfCollision - The object involved in the collision.
 * @param {Object} tank - The tank object.
 */
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
/**
 * Detects collision between a map element and a bullet.
 *
 * @param {Object} mapElement - The map element to check collision with.
 * @param {Object} bullet - The bullet object.
 * @returns {boolean} Returns true if there is a collision, otherwise false.
 */

export function detectCollisionWithBullet(mapElement, bullet) {
  if (!bullet) return false;

  return (
    mapElement.x < bullet.x + bullet.width &&
    mapElement.x + mapElement.width > bullet.x &&
    mapElement.y < bullet.y + bullet.height &&
    mapElement.y + mapElement.height > bullet.y
  );
}

/**
 * Check if the given bullet is out of the screen boundaries.
 *
 * @param {Object} bullet - The bullet object to check.
 * @returns {boolean} - True if the bullet is out of the screen, false otherwise.
 */
export function isBulletOutOfScreen(bullet) {
  return (
    bullet.y <= -bullet.height ||
    bullet.y >= SCREEN_HEIGHT + bullet.height ||
    bullet.x <= -bullet.width ||
    bullet.x >= SCREEN_WIDTH + bullet.width
  );
}
