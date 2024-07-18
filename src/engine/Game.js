import { MenuType, ScreenType } from '../game/constants/game.js';
import { LevelSceneController } from '../game/scenes/LevelSceneController.js';
import { getContext } from './context.js';

export default class Game {
  scene;
  startMenu;

  constructor(width, height) {
    this.context = getContext(width, height);
    this.activateScene = false;
    this.activateStartMenu = true;
    this.setStage = this.setStage.bind(this);
    this.setDisplay = this.setDisplay.bind(this);
    this.createNewLevelSceneController = this.createNewLevelSceneController.bind(this);
  }

  frame = (time) => {
    window.requestAnimationFrame(this.frame);

    if (this.startMenu && this.activateStartMenu) {
      this.startMenu.draw(this.context, this.setStage);
    }

    if (this.activateScene) {
      this.scene.draw(this.context);
    }
  };

  start() {
    window.requestAnimationFrame(this.frame);
  }

  setStage(stage) {
    switch (stage) {
      case MenuType.PLAYER_1:
        this.activateScene = true;
        this.activateStartMenu = false;
        break;
      case MenuType.PLAYERS_2:
        this.activateScene = true;
        break;
    }
  }

  setDisplay(screen) {
    switch (screen) {
      case ScreenType.START_MENU:
        this.activateStartMenu = true;
        this.activateScene = false;
        break;
      case ScreenType.SCENE:
        this.activateStartMenu = false;
        this.activateScene = true;
        break;
    }
  }

  createNewLevelSceneController(assets) {
    this.scene = new LevelSceneController(assets, this.setDisplay);
  }
}
