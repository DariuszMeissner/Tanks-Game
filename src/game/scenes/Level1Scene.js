import Bot from '../entities/Bot.js';
import BotController from '../entities/BotController.js';
import MapController from '../entities/MapController.js';
import PlayersController from '../entities/PlayersController.js';
import Scene from '../../engine/Scene.js';
import { MapLevel1 } from '../constants/levelsMaps.js';
import { TILE_SIZE_WIDTH, BOT_WIDTH, BOT_HEIGHT, AssetsPathsName } from '../constants/game.js';
import { showNotification } from '../../engine/util/notification.js';

const enemies = [
  new Bot(200, 210, BOT_WIDTH, BOT_HEIGHT),
  new Bot(230, 80, BOT_WIDTH, BOT_HEIGHT),
  new Bot(260, 120, BOT_WIDTH, BOT_HEIGHT),
  new Bot(200, 200, BOT_WIDTH, BOT_HEIGHT),
];

export class Level1Scene extends Scene {
  constructor(assets, players) {
    super();
    this.player1 = players[0];
    this.assets = assets;
    this.stage = new MapController(MapLevel1, TILE_SIZE_WIDTH);
    this.playersController = new PlayersController(players, this.stage);
    this.botController = new BotController(enemies, this.stage, this.playersController);

    this.#fixPlayersBulletsCircularDependency();
  }

  draw(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    this.playersController.draw(context, this.assets.get(AssetsPathsName.TANK_PLAYER));
    this.botController.draw(context, this.assets.get(AssetsPathsName.TANK_ENEMY));

    this.stage.draw(
      context,
      this.playersController.enemies[0],
      this.playersController.enemies[0]?.bulletController.bullets[0] || null,
      this.#maxVisibleEnemies(),
      this.assets
    );

    if (this.stage.winGame) {
      showNotification('Victory!', context, 50, 'green');
    }

    if (this.stage.endGame) {
      showNotification('The End!', context, 50, 'red');
    }

    this.drawGameInfo(context, this.botController.enemies.length);
  }

  #fixPlayersBulletsCircularDependency() {
    this.player1.bulletController.enemyController = this.botController;
    this.player1.bulletController.mapController = this.stage;
  }

  #maxVisibleEnemies() {
    return this.botController.enemies.slice(0, 2);
  }
}
