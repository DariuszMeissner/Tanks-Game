import BulletController from '../entities/BulletController.js';

export default class BotController {
  constructor(enemies, mapController, playersController, maxTankOnMap, assets) {
    this.enemies = enemies.map((enemy) => {
      enemy.bulletController = new BulletController(mapController, playersController, assets);
      return enemy;
    });
    this.mapController = mapController;
    this.maxTankOnMap = maxTankOnMap;
    this.assets = assets;
  }

  draw(context, image) {
    const noEnemy = this.enemies.length === 0;
    if (noEnemy) {
      this.endGame();
      return;
    }

    this.enemies.forEach((bot, index) => {
      if (index < this.maxTankOnMap) {
        bot.draw(context, image, this.assets);
        bot.bulletController.draw(context, bot);
      }
    });
  }

  endGame() {
    this.mapController.wonGame = true;
  }
}
