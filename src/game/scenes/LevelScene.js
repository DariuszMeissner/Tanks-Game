import Bot from '../entities/Bot.js';
import BotController from '../entities/BotController.js';
import MapController from '../entities/MapController.js';
import PlayersController from '../entities/PlayersController.js';
import Scene from '../../engine/Scene.js';
import { TILE_SIZE_WIDTH, BOT_WIDTH, BOT_HEIGHT, ImagesPathsName, SoundsPathsName } from '../constants/game.js';
import { clearCanvas } from '../../engine/util/ui.js';

const enemies = [
  new Bot(200, 210, BOT_WIDTH, BOT_HEIGHT),
  new Bot(230, 80, BOT_WIDTH, BOT_HEIGHT),
  new Bot(280, 130, BOT_WIDTH, BOT_HEIGHT),
  new Bot(200, 200, BOT_WIDTH, BOT_HEIGHT),
];

export class LevelScene extends Scene {
  constructor(assets, players, stageLevel, maxTankOnMap) {
    super();
    this.player1 = players[0];
    this.assets = assets;
    this.stage = new MapController(stageLevel, TILE_SIZE_WIDTH);
    this.maxTankOnMap = maxTankOnMap;
    this.playersController = new PlayersController(players, this.stage);
    this.botController = new BotController(enemies, this.stage, this.playersController, maxTankOnMap);

    this.fixPlayersBulletsCircularDependency(this.player1);
  }

  draw(context) {
    this.playStartUpSound(this.assets.get(SoundsPathsName.START_UP));

    clearCanvas(context);

    this.playersController.draw(context, this.assets.get(ImagesPathsName.TANK_PLAYER));
    this.botController.draw(context, this.assets.get(ImagesPathsName.TANK_ENEMY));

    this.stage.draw(
      context,
      this.playersController.enemies[0],
      this.playersController.enemies[0]?.bulletController.bullets[0] || null,
      this.maxVisibleEnemies(this.maxTankOnMap),
      this.assets
    );

    this.showWictoryInfo(context, this.stage);

    this.showGameOverInfo(context, this.stage);
  }
}
