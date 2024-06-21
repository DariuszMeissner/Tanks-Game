import { GameSettings, Movement } from './config/Constant.js';

export default class MapElement {
  constructor(x, y, tileSize) {
    this.x = x;
    this.y = y;
    this.height = tileSize;
    this.width = tileSize;
    this.compenseSpeed = 2;
  }

  draw(ctx, image) {
    if (image instanceof Image) {
      ctx.drawImage(image, this.x, this.y, this.width, this.height);
    }
  }

  detectCollisionFrontOfTank(object, tank, tankDirection) {
    if (!object || !tank) return false;

    switch (tankDirection) {
      case Movement.FORWARD:
        return (
          object.y < tank.y + tank.height &&
          object.y + object.height > tank.y - this.compenseSpeed &&
          object.x < tank.x + tank.width &&
          object.x + object.width > tank.x
        );
      case Movement.REVERSE:
        return (
          object.y < tank.y + tank.height + this.compenseSpeed &&
          object.y > tank.y &&
          object.x < tank.x + tank.width &&
          object.x + object.width > tank.x
        );
      case Movement.LEFT:
        return (
          object.x + object.width > tank.x - this.compenseSpeed &&
          object.x < tank.x + tank.width &&
          object.y < tank.y + tank.height &&
          object.y + object.height > tank.y
        );
      case Movement.RIGHT:
        return (
          object.x + object.width > tank.x &&
          object.x < tank.x + tank.width + this.compenseSpeed &&
          object.y < tank.y + tank.height &&
          object.y + object.height > tank.y
        );
      default:
        return false;
    }
  }

  resetSpeedAfterTimeout(enemy) {
    if (!enemy) return;

    if (enemy.timeoutId) {
      clearTimeout(enemy.timeoutId);
    }

    enemy.timeoutId = setTimeout(() => {
      enemy.speed = GameSettings.RESET_SPEED;
      clearTimeout(enemy.timeoutId);
      enemy.timeoutId = null;
    }, GameSettings.DELAY_START);
  }

  handleCollision(objectOfCollision, tank) {
    if (this.detectCollisionFrontOfTank(objectOfCollision, tank, tank.direction)) {
      console.log('collision:', 'id:' + tank.id, tank.x, tank.y, tank.direction, tank.timeoutId);

      tank.speed = 0;
      tank.changeDirection();

      if (!this.detectCollisionFrontOfTank(objectOfCollision, tank, tank.direction)) {
        this.resetSpeedAfterTimeout(tank);
        return;
      }
    }
  }

  detectCollisionWithBullet(mapElement, bullet) {
    if (!bullet) return false;

    return (
      mapElement.x < bullet.x + bullet.width &&
      mapElement.x + mapElement.width > bullet.x &&
      mapElement.y < bullet.y + bullet.height &&
      mapElement.y + mapElement.height > bullet.y
    );
  }

  detectCollisionWithPlayer(mapElement, player) {
    if (this.detectCollisionFrontOfTank(mapElement, player, player.direction)) {
      player.blockDirection();
      player.collisionWithWall = true;
    }
  }

  detectCollisionPlayerWithBot(player, enemies) {
    for (const bot of enemies) {
      if (this.detectCollisionFrontOfTank(bot, player, player.direction)) {
        player.blockDirection();
        player.collisionWithBot = true;
        return;
      }

      // unblock direction if no collision, when collision and bot go away
      if (!this.detectCollisionFrontOfTank(bot, player, player.direction) && player.collisionWithBot) {
        player.unblockDirection();
        player.collisionWithBot = false;
      }
    }
  }

  detectCollisionBotWithPlayer(player, enemies) {
    for (const bot of enemies) {
      if (this.detectCollisionFrontOfTank(player, bot, bot.direction)) {
        this.handleCollision(player, bot);
      }
    }
  }

  detectCollisionWithBot(mapElement, enemies) {
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      this.handleCollision(mapElement, enemy);
    }
  }

  detectCollisionsBetweenBots(enemies) {
    enemies.forEach((enemy1, i) => {
      enemies.slice(i + 1).forEach((enemy2) => {
        // handle collision enemy1
        this.handleCollision(enemy2, enemy1);
        // handle collision enemy2
        this.handleCollision(enemy1, enemy2);
      });
    });
  }
}
