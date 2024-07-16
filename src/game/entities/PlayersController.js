import BulletController from './BulletController.js';

export default class PlayersController {
  constructor(players, mapController, maxTankOnMap, assets) {
    this.enemies = players.map((player) => {
      player.bulletController = new BulletController(mapController, null);
      return player;
    });
    this.mapController = mapController;
    this.maxTankOnMap = maxTankOnMap;
    this.assets = assets;
  }

  draw(ctx, image) {
    const noLifes = this.enemies.length === 0;
    if (noLifes) {
      this.endGame();
      return;
    }

    this.enemies.forEach((player, index) => {
      if (index < this.maxTankOnMap) {
        player.draw(ctx, image, this.assets);
        player.bulletController.draw(ctx, player);
      }
    });
  }

  endGame() {
    this.mapController.gameOver = true;
  }
}
