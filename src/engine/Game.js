import { MenuType } from '../game/constants/game.js';
import { getContext } from './context.js';

export default class Game {
  scene;
  startMenu;

  constructor(width, height) {
    this.context = getContext(width, height);
    this.activateScene = false;
    this.activateStartMenu = true;
    this.setStage = this.setStage.bind(this);
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
}
