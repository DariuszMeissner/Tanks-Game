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

  detectCollisionFrontOfTank(element1, element2, direction) {
    if (!element2) return false;

    switch (direction) {
      case "forward":
        return (
          element1.y < element2.y + element2.height &&
          element1.y + element1.height > element2.y - this.compenseSpeed &&
          element1.x < element2.x + element2.width &&
          element1.x + element1.width > element2.x
        );
      case "reverse":
        return (
          element1.y < element2.y + element2.height + this.compenseSpeed &&
          element1.y > element2.y &&
          element1.x < element2.x + element2.width &&
          element1.x + element1.width > element2.x
        );
      case "left":
        return (
          element1.x + element1.width > element2.x - this.compenseSpeed &&
          element1.x < element2.x + element2.width &&
          element1.y < element2.y + element2.height &&
          element1.y + element1.height > element2.y
        );
      case "right":
        return (
          element1.x + element1.width > element2.x &&
          element1.x < element2.x + element2.width + this.compenseSpeed &&
          element1.y < element2.y + element2.height &&
          element1.y + element1.height > element2.y
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

  detectCollisionWithBot(mapElement, enemies) {
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];

      if (this.detectCollisionFrontOfTank(mapElement, enemy, enemy.direction)) {
        enemy.blockDirection();
        enemy.changeDirection();
      }

      // this.handleBotsCollisions(enemies, i, enemy);
    }
  }

  handleBotsCollisions(enemies, startIndex, enemy1) {
    for (let j = startIndex + 1; j < enemies.length; j++) {
      const enemy2 = enemies[j];

      if (this.detectCollisionFrontOfTank(enemy1, enemy2, enemy2.direction)) {
        enemy1.blockDirection();
        enemy2.blockDirection();

        enemy1.changeDirection();
        enemy2.changeDirection();
      }
    }
  }
}
