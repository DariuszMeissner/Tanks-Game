const RESET_SPEED = 2;
const DELAY_START = 2000;

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

  detectCollisionBotWithPlayer(player, enemies) {
    for (const bot of enemies) {
      if (this.detectCollisionFrontOfTank(player, bot, bot.direction)) {
        bot.blockDirection();
        bot.changeDirection();
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

    // Clear any existing timeout
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

  detectCollisionWithBot(mapElement, enemies) {
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];

      if (this.detectCollisionFrontOfTank(mapElement, enemy, enemy.direction)) {
        if (!enemy.isDelayed) {
          enemy.speed = 0;
          enemy.changeDirection();

          if (!this.detectCollisionFrontOfTank(mapElement, enemy, enemy.direction)) {
            this.resetSpeedAfterTimeout(enemy);
            return;
          } else {
            // Ensure speed is reset if collision still occurs
            enemy.speed = RESET_SPEED;
          }
        }
      }
    }
  }

  detectCollisionsBetweenBots(enemies) {
    enemies.forEach((enemy1, i) => {
      enemies.slice(i + 1).forEach((enemy2) => {
        // handle collision enemy1
        if (this.detectCollisionFrontOfTank(enemy2, enemy1, enemy1.direction)) {
          if (!enemy1.isDelayed) {
            enemy1.speed = 0;
            enemy1.changeDirection();

            if (!this.detectCollisionFrontOfTank(enemy2, enemy1, enemy1.direction)) {
              this.resetSpeedAfterTimeout(enemy1);
              return;
            } else {
              // Ensure speed is reset if collision still occurs
              enemy1.speed = RESET_SPEED;
            }
          }
        }

        // handle collision enemy2
        if (this.detectCollisionFrontOfTank(enemy1, enemy2, enemy2.direction)) {
          if (!enemy2.isDelayed) {
            enemy2.speed = 0;
            enemy2.changeDirection();

            if (!this.detectCollisionFrontOfTank(enemy1, enemy2, enemy2.direction)) {
              this.resetSpeedAfterTimeout(enemy2);
              return;
            } else {
              // Ensure speed is reset if collision still occurs
              enemy2.speed = RESET_SPEED;
            }
          }
        }
      });
    });
  }
}
