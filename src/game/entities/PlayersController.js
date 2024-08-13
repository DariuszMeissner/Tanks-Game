import BulletController from './BulletController.js';

export default class PlayersController {
  constructor(players, mapController, maxTankOnMap, assets) {
    this.enemies = players.map((player) => {
      player.bulletController = new BulletController(mapController, null, assets);
      return player;
    });
    this.mapController = mapController;
    this.maxTankOnMap = maxTankOnMap;
    this.assets = assets;
  }

  drawPlayer(ctx, image) {
    this.checkEnemiesAndEndGame();

    this.enemies.forEach((player, index) => {
      if (this.shouldDraw(index)) {
        player.draw(ctx, image, this.assets);
      }
    });
  }

  drawBullet(ctx) {
    this.checkEnemiesAndEndGame();

    this.enemies.forEach((player, index) => {
      if (this.shouldDraw(index)) {
        player.bulletController.draw(ctx, player);
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
    this.mapController.gameOver = true;
  }
}
