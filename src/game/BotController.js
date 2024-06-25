import BulletController from './BulletController.js';

export default class BotController {
  constructor(enemies, mapController, playersController) {
    this.enemies = enemies.map((enemy) => {
      enemy.bulletController = new BulletController(mapController, playersController);
      return enemy;
    });
    this.mapController = mapController;
    this.maxTankOnMap = 2;
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

    for (let i = 0; i < this.maxTankOnMap; i++) {
      if (!this.enemies[i]) return;

      this.enemies[i].draw(context, image);
      this.enemies[i].bulletController.draw(context, this.enemies[i]);
    }
  }
}
