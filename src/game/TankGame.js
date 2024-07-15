import AssetsService from './service/AssetsService.js';
import Game from '../engine/Game.js';
import { LoadingScene } from './scenes/LoadingScene.js';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './constants/game.js';
import { StartMenu } from './entities/StartMenu.js';
import { LevelSceneController } from './scenes/LevelSceneController.js';

export class TankGame extends Game {
  constructor() {
    super(SCREEN_WIDTH, SCREEN_HEIGHT);

    this.assetsService = new AssetsService();
    this.scene = new LoadingScene(this.onLoadedComplete, this.assetsService);
  }

  onLoadedComplete = () => {
    this.startMenu = new StartMenu(this.assetsService.assets);

    this.scene = new LevelSceneController(this.assetsService.assets);
  };
}
