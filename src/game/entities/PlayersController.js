import BulletController from './BulletController.js';

export default class PlayersController {
  constructor(players, mapController) {
    this.enemies = players.map((player) => {
      player.bulletController = new BulletController(mapController, null);
      return player;
    });
  }

  draw(ctx, image) {
    this.enemies.forEach((player) => {
      player.draw(ctx, image);
      player.bulletController.draw(ctx, player);
    });
  }
}
