import BulletController from './BulletController.js';

export default class PlayersController {
  constructor(players, mapController) {
    this.enemies = players.map((player) => {
      player.bulletController = new BulletController(mapController, null);
      return player;
    });
  }

  draw(ctx, image) {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw(ctx, image);
      this.enemies[i].bulletController.draw(ctx, this.enemies[i]);
    }
  }
}
