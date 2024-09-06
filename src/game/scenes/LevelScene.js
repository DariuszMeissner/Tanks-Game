import MapController from '../entities/MapController.js';
import Scene from '../../engine/Scene.js';
import {
  TILE_SIZE_WIDTH,
  ImagesPathsName,
  SoundsPathsName,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  Colors,
  FONT,
  MenuType,
} from '../constants/game.js';
import { clearCanvas, stopGameSound } from '../common/common.js';
import { Hud } from '../entities/Hud.js';
import { STAGE_INFO_DURATION, SUMMARY_INFO_DURATION } from '../config/config.js';
import { setAndClearTimeout } from '../common/common.js';
import { playSound } from '../../engine/soundHandler.js';
import TankController from '../entities/TankController.js';

export class LevelScene extends Scene {
  constructor(enemies, player1, player2, assets, stageLevel, maxTankOnMap) {
    super();
    this.stageLevel = stageLevel[0].stage;
    this.assets = assets;
    this.stage = new MapController(stageLevel.slice(1), TILE_SIZE_WIDTH, assets);
    this.maxTankOnMap = maxTankOnMap;
    this.player1Controller = new TankController(player1, this.stage, null, 1, assets);
    this.player2Controller = new TankController(player2, this.stage, null, 1, assets);
    this.botController = new TankController(enemies, this.stage, this.player1Controller, maxTankOnMap, assets);
    this.hud = new Hud(this.player1Controller, this.botController, assets, this.stageLevel);
    this.displayingLevelInfo = true;
    this.idTimeoutHideStageInfo = null;
    this.idTimeoutNextLevelInfo = null;
    this.idTimeoutMainMenu = null;
    this.idTimeoutMainMenu = null;
    this.goToNextStage = false;
    this.goToMainMenu = false;
    this.goToGameOverSummary = false;
    this.repeatStage = false;
    this.playedGameOverSound = false;
    this.currentMenuOption = null;

    this.#fixPlayersBulletsCircularDependency(player1);
  }

  draw(context) {
    console.log(this.currentMenuOption);

    if (this.displayingLevelInfo) {
      this.#stageInfo(context);
      return;
    }

    if (this.stage.wonGame) {
      stopGameSound(this.assets);
      this.#summaryLevel(context);
      this.#goToNextLevelInfo();
      return;
    }

    if (this.stage.gameOver && !this.playedGameOverSound) {
      stopGameSound(this.assets);
      this.#playGameOverSound();
      this.#goToGameOverSummary();
    }

    if (this.stage.gameOver && this.goToGameOverSummary) {
      this.#summaryLevel(context);
      this.#goToMainMenu();
      return;
    }

    this.#game(context);
  }

  #fixPlayersBulletsCircularDependency(player1) {
    player1.forEach((player) => {
      player.bulletController.enemyController = this.botController;
      player.bulletController.mapController = this.stage;
    });
  }

  #game(context) {
    this.playStartUpSound(this.assets.get(SoundsPathsName.START_UP));

    clearCanvas(context);

    this.player1Controller.drawTank(context, this.assets.get(ImagesPathsName.PLAYER1_TANK));
    this.botController.drawTank(context, this.assets.get(ImagesPathsName.BOT_TANK));

    if (this.currentMenuOption === MenuType.PLAYERS_2) {
      this.player2Controller.drawTank(context, this.assets.get(ImagesPathsName.PLAYER1_TANK));
    }

    this.stage.draw(
      context,
      this.player1Controller.enemies[0],
      this.player1Controller.enemies[0]?.bulletController.bullets[0] || null,
      this.maxVisibleEnemies(this.maxTankOnMap),
      this.assets
    );

    this.player1Controller.drawBullet(context);
    this.player1Controller.drawTankExplosion(context);
    this.botController.drawBullet(context);
    this.botController.drawTankExplosion(context);

    if (this.currentMenuOption === MenuType.PLAYERS_2) {
      this.player2Controller.drawBullet(context);
      this.player2Controller.drawTankExplosion(context);
    }

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

    this.#hideLevelInfo();
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
  }

  #hideLevelInfo() {
    setAndClearTimeout(
      this.idTimeoutHideStageInfo,
      () => {
        this.displayingLevelInfo = false;
      },
      STAGE_INFO_DURATION
    );
  }

  #goToNextLevelInfo() {
    setAndClearTimeout(
      this.idTimeoutNextLevelInfo,
      () => {
        this.goToNextStage = true;
      },
      SUMMARY_INFO_DURATION
    );
  }

  #goToMainMenu() {
    setAndClearTimeout(
      this.idTimeoutMainMenu,
      () => {
        this.goToMainMenu = true;
      },
      SUMMARY_INFO_DURATION
    );
  }

  #goToGameOverSummary() {
    setAndClearTimeout(
      this.idTimeoutGameOverSummary,
      () => {
        this.goToGameOverSummary = true;
      },
      this.assets.get(SoundsPathsName.GAME_OVER).duration * 1000
    );
  }

  #playGameOverSound() {
    playSound(this.assets.get(SoundsPathsName.PLAYER_TANK_DESTROYED_EAGLE_DESTROYED), 0.5);

    const id = setTimeout(() => {
      playSound(this.assets.get(SoundsPathsName.GAME_OVER), 0.5);
      clearTimeout(id);
    }, this.assets.get(SoundsPathsName.PLAYER_TANK_DESTROYED_EAGLE_DESTROYED).duration * 1000);

    this.playedGameOverSound = true;
  }
}
