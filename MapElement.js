import { DELAY_START, RESET_SPEED } from "./Constant.js";

export default class MapElement {
  constructor(x, y, tileSize, color) {
    this.x = x;
    this.y = y;
    this.height = tileSize;
    this.width = tileSize;
    this.color = color;
    this.compenseSpeed = 2;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  detectCollisionFrontOfTank(object, tank, tankDirection) {
    if (!object || !tank) return false;

    switch (tankDirection) {
      case "forward":
        return (
          object.y < tank.y + tank.height &&
          object.y + object.height > tank.y - this.compenseSpeed &&
          object.x < tank.x + tank.width &&
          object.x + object.width > tank.x
        );
      case "reverse":
        return (
          object.y < tank.y + tank.height + this.compenseSpeed &&
          object.y > tank.y &&
          object.x < tank.x + tank.width &&
          object.x + object.width > tank.x
        );
      case "left":
        return (
          object.x + object.width > tank.x - this.compenseSpeed &&
          object.x < tank.x + tank.width &&
          object.y < tank.y + tank.height &&
          object.y + object.height > tank.y
        );
      case "right":
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

  detectCollisionWithPlayer(mapElement, player) {
    if (this.detectCollisionFrontOfTank(mapElement, player, player.direction)) {
      player.blockDirection();
    }
  }

  detectCollisionPlayerWithBot(player, enemies) {
    for (const bot of enemies) {
      if (this.detectCollisionFrontOfTank(bot, player, player.direction)) {
        player.blockDirection();
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

  resetSpeedAfterTimeout(enemy) {
    if (!enemy) return;

    if (enemy.timeoutId) {
      clearTimeout(enemy.timeoutId);
    }

    enemy.isDelayed = true;

    enemy.timeoutId = setTimeout(() => {
      enemy.speed = RESET_SPEED;
      enemy.isDelayed = false;
      clearTimeout(enemy.timeoutId);
      enemy.timeoutId = null;
    }, DELAY_START);
  }

  handleCollision(objectOfCollision, tank) {
    if (this.detectCollisionFrontOfTank(objectOfCollision, tank, tank.direction)) {
      if (!tank.isDelayed) {
        tank.speed = 0;
        tank.changeDirection();

        if (!this.detectCollisionFrontOfTank(objectOfCollision, tank, tank.direction)) {
          this.resetSpeedAfterTimeout(tank);
          return;
        } else {
          // Ensure speed is reset if collision still occurs
          tank.speed = RESET_SPEED;
        }
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
