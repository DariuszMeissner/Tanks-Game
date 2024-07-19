import { clearCanvas, generateBots, generatePlayers } from '../common/common.js';
import { LEVEL_INIT, PlayerRespawn } from '../config/config.js';
import { Control } from '../constants/controls.js';
import { FONT, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/game.js';
import { MAP_LEVELS } from '../constants/levelsMaps.js';
import { LevelScene } from './LevelScene.js';

const ENEMIES_INIT = generateBots(2);
const PLAYERS_INIT = generatePlayers(1);

export class LevelSceneController {
  constructor(assets, setDisplayCallback) {
    this.players = PLAYERS_INIT;
    this.enemies = ENEMIES_INIT;
    this.assets = assets;
    this.currentLevel = LEVEL_INIT;
    this.stageController = new LevelScene(this.enemies, this.players, assets, MAP_LEVELS.get(this.currentLevel.toString()), 1);
    this.endGame = false;
    this.setDisplay = setDisplayCallback;

    this.#resetPlayerPosition();
  }

  draw(context) {
    if (this.endGame) {
      clearCanvas(context);
      this.#endGame(context);
      return;
    }

    if (this.stageController.goToNextStage) {
      this.advanceToNextStage();
      return;
    }

    this.stageController.draw(context);
  }

  advanceToNextStage() {
    this.currentLevel += LEVEL_INIT;
    const currentLevelData = MAP_LEVELS.get(this.currentLevel.toString());

    if (!currentLevelData) {
      this.endGame = true;
      return;
    }

    const enemies = generateBots(20);
    this.#resetPlayerPosition();
    this.stageController = new LevelScene(enemies, this.players, this.assets, currentLevelData, 1);
  }

  #resetPlayerPosition() {
    this.players = this.#getThePlayersLifeCount();
    this.players.forEach((player) => {
      player.x = PlayerRespawn.X;
      player.y = PlayerRespawn.Y;
      player.direction = Control.UP;
    });
  }

  #endGame(context) {
    const lineHeight = 40;
    context.save();
    context.font = `20px ${FONT}`;
    context.textAlign = 'center';
    context.fillText('THANK YOU FOR THE GAME!', SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    context.fillText('CREATED BY DARIUSZ MEISSNER.', SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 + lineHeight);
    context.restore();
  }

  #getThePlayersLifeCount() {
    return this.stageController.playersController.enemies;
  }
}
