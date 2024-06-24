import BulletController from './BulletController.js';

export default class BotController {
  constructor(enemies, mapController, playersController) {
    this.enemies = enemies.map((enemy) => {
      enemy.bulletController = new BulletController(mapController, playersController);
      return enemy;
    });
  }

  getEnemies() {
    return this.enemies;
  }

  draw(context, image) {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw(context, image);
      this.enemies[i].bulletController.draw(context, this.enemies[i]);
    }
  }
}
