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

  drawBot(ctx, image) {
    this.checkEnemiesAndEndGame();

    this.enemies.forEach((bot, index) => {
      if (this.shouldDraw(index)) {
        bot.draw(ctx, image, this.assets);
      }
    });
  }

  drawBullet(ctx) {
    this.checkEnemiesAndEndGame();

    this.enemies.forEach((bot, index) => {
      if (this.shouldDraw(index)) {
        bot.bulletController.draw(ctx, bot);
      }
    });
  }

  checkEnemiesAndEndGame() {
    const noEnemy = this.enemies.length === 0;
    if (noEnemy) {
      this.endGame();
      return;
    }
  }

  shouldDraw(index) {
    return index < this.maxTankOnMap;
  }

  endGame() {
    this.mapController.wonGame = true;
  }
}
