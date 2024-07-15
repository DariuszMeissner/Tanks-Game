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
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  Colors,
  FONT,
} from '../constants/game.js';
import { clearCanvas } from '../../engine/util/ui.js';
import Player from '../entities/Player.js';
import { Hud } from '../entities/Hud.js';
import { BotRespawn, PlayerRespawn, STAGE_INFO_DURATION } from '../config/config.js';

const enemies = [
  new Bot(BotRespawn.LEFT.X, BotRespawn.LEFT.Y, BOT_WIDTH, BOT_HEIGHT),
  new Bot(BotRespawn.MIDDLE.X, BotRespawn.MIDDLE.Y, BOT_WIDTH, BOT_HEIGHT),
  new Bot(BotRespawn.RIGHT.X, BotRespawn.RIGHT.Y, BOT_WIDTH, BOT_HEIGHT),
  new Bot(BotRespawn.LEFT.X, BotRespawn.LEFT.Y, BOT_WIDTH, BOT_HEIGHT),
  new Bot(BotRespawn.MIDDLE.X, BotRespawn.MIDDLE.Y, BOT_WIDTH, BOT_HEIGHT),
  new Bot(BotRespawn.RIGHT.X, BotRespawn.RIGHT.Y, BOT_WIDTH, BOT_HEIGHT),
  new Bot(BotRespawn.LEFT.X, BotRespawn.LEFT.Y, BOT_WIDTH, BOT_HEIGHT),
  new Bot(BotRespawn.MIDDLE.X, BotRespawn.MIDDLE.Y, BOT_WIDTH, BOT_HEIGHT),
  new Bot(BotRespawn.RIGHT.X, BotRespawn.RIGHT.Y, BOT_WIDTH, BOT_HEIGHT),
  new Bot(BotRespawn.LEFT.X, BotRespawn.LEFT.Y, BOT_WIDTH, BOT_HEIGHT),
  new Bot(BotRespawn.MIDDLE.X, BotRespawn.MIDDLE.Y, BOT_WIDTH, BOT_HEIGHT),
  new Bot(BotRespawn.RIGHT.X, BotRespawn.RIGHT.Y, BOT_WIDTH, BOT_HEIGHT),
  new Bot(BotRespawn.LEFT.X, BotRespawn.LEFT.Y, BOT_WIDTH, BOT_HEIGHT),
  new Bot(BotRespawn.MIDDLE.X, BotRespawn.MIDDLE.Y, BOT_WIDTH, BOT_HEIGHT),
  new Bot(BotRespawn.RIGHT.X, BotRespawn.RIGHT.Y, BOT_WIDTH, BOT_HEIGHT),
  new Bot(BotRespawn.LEFT.X, BotRespawn.LEFT.Y, BOT_WIDTH, BOT_HEIGHT),
  new Bot(BotRespawn.MIDDLE.X, BotRespawn.MIDDLE.Y, BOT_WIDTH, BOT_HEIGHT),
  new Bot(BotRespawn.RIGHT.X, BotRespawn.RIGHT.Y, BOT_WIDTH, BOT_HEIGHT),
  new Bot(BotRespawn.LEFT.X, BotRespawn.LEFT.Y, BOT_WIDTH, BOT_HEIGHT),
  new Bot(BotRespawn.MIDDLE.X, BotRespawn.MIDDLE.Y, BOT_WIDTH, BOT_HEIGHT),
];

const life1 = new Player(PlayerRespawn.X, PlayerRespawn.Y, PLAYER_WIDTH, PLAYER_HEIGHT, null);
const life2 = new Player(PlayerRespawn.X, PlayerRespawn.Y, PLAYER_WIDTH, PLAYER_HEIGHT, null);
const life3 = new Player(PlayerRespawn.X, PlayerRespawn.Y, PLAYER_WIDTH, PLAYER_HEIGHT, null);

const players = [life1, life2, life3];

export class LevelScene extends Scene {
  constructor(assets, stageLevel, maxTankOnMap) {
    super();
    this.stageLevel = stageLevel[0].stage;
    this.assets = assets;
    this.stage = new MapController(stageLevel.slice(1), TILE_SIZE_WIDTH, assets);
    this.maxTankOnMap = maxTankOnMap;
    this.playersController = new PlayersController(players, this.stage, 1);
    this.botController = new BotController(enemies, this.stage, this.playersController, maxTankOnMap);
    this.hud = new Hud(this.playersController, this.botController, assets, this.stageLevel);
    this.endedDisplayLevelInfo = false;
    this.idTimeoutHideStageInfo = null;

    this.fixPlayersBulletsCircularDependency(players);
  }

  draw(context) {
    if (!this.endedDisplayLevelInfo) {
      this.#stageInfo(context);

      this.#hideStageInfo();
      return;
    }

    this.#game(context);
  }

  #game(context) {
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

    this.showGameOverInfo(context, this.stage);

    this.hud.draw(context);
  }

  #stageInfo(context) {
    context.save();
    context.fillStyle = Colors.GRAY;
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    context.restore();

    context.save();
    context.font = `20px ${FONT}`;
    context.fillStyle = Colors.BLACK;
    context.textAlign = 'center';
    context.fillText(`STAGE   ${this.stageLevel}`, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    context.restore();
  }

  #hideStageInfo() {
    if (this.idTimeoutHideStageInfo) return;

    this.idTimeoutHideStageInfo = setTimeout(() => {
      clearTimeout(this.idTimeoutHideStageInfo);
      this.endedDisplayLevelInfo = true;
    }, STAGE_INFO_DURATION);
  }
}
