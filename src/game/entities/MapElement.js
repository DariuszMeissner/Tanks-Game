import { detectCollisionFrontOfTank, handleCollision } from '../../engine/util/collision.js';

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

  detectCollisionWithPlayer(mapElement, player) {
    if (!player) return;

    if (detectCollisionFrontOfTank(mapElement, player, player.direction)) {
      player.blockDirection();
      player.collisionWithWall = true;
    }
  }

  detectCollisionPlayerWithBot(player, enemies) {
    if (!player) return;

    for (const bot of enemies) {
      if (detectCollisionFrontOfTank(bot, player, player.direction)) {
        player.blockDirection();
        player.collisionWithBot = true;
        return;
      }

      // unblock direction if no collision, when collision and bot go away
      if (!detectCollisionFrontOfTank(bot, player, player.direction) && player.collisionWithBot) {
        player.unblockDirection();
        player.collisionWithBot = false;
      }
    }
  }

  detectCollisionBotWithPlayer(player, enemies) {
    for (const bot of enemies) {
      if (detectCollisionFrontOfTank(player, bot, bot.direction)) {
        handleCollision(player, bot);
      }
    }
  }

  detectCollisionWithBot(mapElement, enemies) {
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      handleCollision(mapElement, enemy);
    }
  }

  detectCollisionsBetweenBots(enemies) {
    enemies.forEach((enemy1, i) => {
      enemies.slice(i + 1).forEach((enemy2) => {
        // handle collision enemy1
        handleCollision(enemy2, enemy1);
        // handle collision enemy2
        handleCollision(enemy1, enemy2);
      });
    });
  }
}
