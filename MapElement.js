export default class MapElement {
  constructor(x, y, tileSize, color) {
    this.x = x;
    this.y = y;
    this.height = tileSize;
    this.width = tileSize;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  detectCollision(element1, element2) {
    if (!element2) return false;

    return (
      element1.x < element2.x + element2.width &&
      element1.x + element1.width > element2.x &&
      element1.y < element2.y + element2.height &&
      element1.y + element1.height > element2.y
    );
  }

  detectCollisionWithPlayer(mapElement, player) {
    if (this.detectCollision(mapElement, player)) {
      player.x = player.previousX;
      player.y = player.previousY;
    }
  }

  detectCollisionPlayerWithBot(player, enemies) {
    for (const bot of enemies) {
      if (this.detectCollision(player, bot)) {
        player.x = player.previousX;
        player.y = player.previousY;

        bot.x = bot.previousX;
        bot.y = bot.previousY;
        bot.changeDirection();
      }
    }
  }

  detectCollisionWithBullet(mapElement, bullet) {
    return this.detectCollision(mapElement, bullet);
  }

  detectCollisionWithBot(mapElement, enemies) {
    for (let i = 0; i < enemies.length; i++) {
      const enemy1 = enemies[i];

      if (this.detectCollision(mapElement, enemy1)) {
        enemy1.x = enemy1.previousX;
        enemy1.y = enemy1.previousY;
        enemy1.changeDirection();
      }

      this, this.handleBotCollisions(enemies, i, enemy1);
    }
  }

  handleBotCollisions(enemies, startIndex, enemy1) {
    for (let j = startIndex + 1; j < enemies.length; j++) {
      const enemy2 = enemies[j];

      if (this.detectCollision(enemy1, enemy2)) {
        enemy1.x = enemy1.previousX;
        enemy1.y = enemy1.previousY;
        enemy2.x = enemy2.previousX;
        enemy2.y = enemy2.previousY;

        enemy1.changeDirection();
        enemy2.changeDirection();
      }
    }
  }
}
