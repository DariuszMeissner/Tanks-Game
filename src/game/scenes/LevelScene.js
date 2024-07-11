import Bot from '../entities/Bot.js';
import BotController from '../entities/BotController.js';
import MapController from '../entities/MapController.js';
import PlayersController from '../entities/PlayersController.js';
import Scene from '../../engine/Scene.js';
import {
  TILE_SIZE_WIDTH,
  BOT_WIDTH,
  BOT_HEIGHT,
  ImagesPathsName,
  SoundsPathsName,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
} from '../constants/game.js';
import { clearCanvas } from '../../engine/util/ui.js';
import Player from '../entities/Player.js';
import { Hud } from '../entities/Hud.js';

const enemies = [
  new Bot(200, 210, BOT_WIDTH, BOT_HEIGHT),
  new Bot(230, 80, BOT_WIDTH, BOT_HEIGHT),
  new Bot(280, 130, BOT_WIDTH, BOT_HEIGHT),
  new Bot(200, 210, BOT_WIDTH, BOT_HEIGHT),
];

const life1 = new Player(160, 120, PLAYER_WIDTH, PLAYER_HEIGHT, null);
const life2 = new Player(160, 120, PLAYER_WIDTH, PLAYER_HEIGHT, null);
const life3 = new Player(160, 120, PLAYER_WIDTH, PLAYER_HEIGHT, null);

const players = [life1, life2, life3];

export class LevelScene extends Scene {
  constructor(assets, stageLevel, maxTankOnMap) {
    super();
    this.stageLevel = stageLevel[0].stage;
    this.assets = assets;
    this.stage = new MapController(stageLevel.slice(1), TILE_SIZE_WIDTH);
    this.maxTankOnMap = maxTankOnMap;
    this.playersController = new PlayersController(players, this.stage, 1);
    this.botController = new BotController(enemies, this.stage, this.playersController, maxTankOnMap);
    this.hud = new Hud(this.playersController, this.botController, assets, this.stageLevel);

    this.fixPlayersBulletsCircularDependency(players);
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

    this.hud.draw(context);
  }
}
