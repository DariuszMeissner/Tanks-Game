import { clearCanvas, generateBots, generatePlayers } from '../common/common.js';
import { LEVEL_INIT } from '../config/config.js';
import { FONT, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/game.js';
import { MAP_LEVELS } from '../constants/levelsMaps.js';
import { LevelScene } from './LevelScene.js';

const EnemiesInit = generateBots(2);

const PlayersInit = generatePlayers(3);

export class LevelSceneController {
  constructor(assets) {
    this.assets = assets;
    this.currentLevel = LEVEL_INIT;
    this.stageController = new LevelScene(EnemiesInit, PlayersInit, assets, MAP_LEVELS.get(this.currentLevel.toString()), 1);
    this.endGame = false;
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
    const players = generatePlayers(3);
    this.stageController = new LevelScene(enemies, players, this.assets, currentLevelData, 1);
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
}
