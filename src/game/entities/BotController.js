import BulletController from '../entities/BulletController.js';

export default class BotController {
  constructor(enemies, mapController, playersController, maxBotOnMap) {
    this.enemies = enemies.map((enemy) => {
      enemy.bulletController = new BulletController(mapController, playersController);
      return enemy;
    });
    this.mapController = mapController;
    this.maxBotOnMap = maxBotOnMap;
  }

  endGame() {
    this.mapController.winGame = true;
  }

  draw(context, image) {
    const noEnemy = this.enemies.length === 0;
    if (noEnemy) {
      this.endGame();
      return;
    }

    this.enemies.forEach((bot, index) => {
      if (index < this.maxBotOnMap) {
        bot.draw(context, image);
        bot.bulletController.draw(context, bot);
      }
    });
  }
}
