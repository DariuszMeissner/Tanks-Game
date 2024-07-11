import BulletController from '../entities/BulletController.js';

export default class BotController {
  constructor(enemies, mapController, playersController, maxTankOnMap) {
    this.enemies = enemies.map((enemy) => {
      enemy.bulletController = new BulletController(mapController, playersController);
      return enemy;
    });
    this.mapController = mapController;
    this.maxTankOnMap = maxTankOnMap;
  }

  draw(context, image) {
    const noEnemy = this.enemies.length === 0;
    if (noEnemy) {
      this.endGame();
      return;
    }

    this.enemies.forEach((bot, index) => {
      if (index < this.maxTankOnMap) {
        bot.draw(context, image);
        bot.bulletController.draw(context, bot);
      }
    });
  }

  endGame() {
    this.mapController.winGame = true;
  }
}
