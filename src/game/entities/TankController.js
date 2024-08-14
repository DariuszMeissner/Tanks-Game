import BulletController from '../entities/BulletController.js';

export default class TankController {
  constructor(enemies, mapController, enemyController, maxTankOnMap, assets) {
    this.enemies = enemies.map((enemy) => {
      enemy.bulletController = new BulletController(mapController, enemyController, assets);
      return enemy;
    });
    this.mapController = mapController;
    this.maxTankOnMap = maxTankOnMap;
    this.assets = assets;
  }

  drawTank(ctx, image) {
    this.checkEnemiesAndEndGame();

    this.enemies.forEach((tank, index) => {
      if (this.shouldDraw(index)) {
        tank.draw(ctx, image, this.assets);
      }
    });
  }

  drawBullet(ctx) {
    this.checkEnemiesAndEndGame();

    this.enemies.forEach((tank, index) => {
      if (this.shouldDraw(index)) {
        tank.bulletController.draw(ctx, tank);
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
