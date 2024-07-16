import BotController from '../entities/BotController.js';
import MapController from '../entities/MapController.js';
import PlayersController from '../entities/PlayersController.js';
import Scene from '../../engine/Scene.js';
import {
  TILE_SIZE_WIDTH,
  ImagesPathsName,
  SoundsPathsName,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  Colors,
  FONT,
} from '../constants/game.js';
import { clearCanvas, stopGameSound } from '../common/common.js';
import { Hud } from '../entities/Hud.js';
import { STAGE_INFO_DURATION, SUMMARY_INFO_DURATION } from '../config/config.js';
import { setAndClearTimeout } from '../common/common.js';

export class LevelScene extends Scene {
  constructor(enemies, players, assets, stageLevel, maxTankOnMap) {
    super();
    this.stageLevel = stageLevel[0].stage;
    this.assets = assets;
    this.stage = new MapController(stageLevel.slice(1), TILE_SIZE_WIDTH, assets);
    this.maxTankOnMap = maxTankOnMap;
    this.playersController = new PlayersController(players, this.stage, 1, assets);
    this.botController = new BotController(enemies, this.stage, this.playersController, maxTankOnMap);
    this.hud = new Hud(this.playersController, this.botController, assets, this.stageLevel);
    this.displayingLevelInfo = true;
    this.idTimeoutHideStageInfo = null;
    this.idTimeoutHideSummaryInfo = null;
    this.goToNextStage = false;
    this.repeatStage = false;

    this.fixPlayersBulletsCircularDependency(players);
  }

  draw(context) {
    if (this.displayingLevelInfo) {
      this.#stageInfo(context);
      return;
    }

    if (this.stage.wonGame) {
      stopGameSound(this.assets);
      this.#summaryLevel(context);
      return;
    }

    if (this.stage.gameOver) {
      console.log('game over');
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

    this.#hideStageInfo();
  }

  #summaryLevel(context) {
    context.save();
    context.fillStyle = Colors.BLACK;
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    context.restore();

    context.save();
    context.font = `20px ${FONT}`;
    context.fillStyle = Colors.WHITE;
    context.textAlign = 'center';
    context.fillText(`SUMMARY   ${this.stageLevel}`, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    context.restore();

    this.#hideSummaryInfo();
  }

  #hideStageInfo() {
    setAndClearTimeout(
      this.idTimeoutHideStageInfo,
      () => {
        this.displayingLevelInfo = false;
      },
      STAGE_INFO_DURATION
    );
  }

  #hideSummaryInfo() {
    setAndClearTimeout(
      this.idTimeoutHideSummaryInfo,
      () => {
        this.goToNextStage = true;
      },
      SUMMARY_INFO_DURATION
    );
  }
}
