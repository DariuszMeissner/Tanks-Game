import { Menu } from '../../engine/Menu.js';
import { ImagesPaths, MenuOptions, MenuType } from '../constants/game.js';

export class StartMenu extends Menu {
  constructor() {
    super();
    this.menuOptions = MenuOptions;
    this.logoImg = new Image();
    this.logoImg.src = ImagesPaths.MAIN_TEXT;
  }

  draw(context, setStage) {
    this.#clearCanvas(context);

    this.drawLogo(context);

    this.drawMenu(context);

    this.#handlePressEnter(setStage);
  }

  drawLogo(context) {
    context.drawImage(this.logoImg, 0, 0);
  }

  #handlePressEnter(setStage) {
    if (this.keyStates.Enter) {
      this.selectedOptions === 0 && setStage(MenuType.PLAYER_1);
      this.selectedOptions === 1 && setStage(MenuType.PLAYERS_2);

      this.keyStates.Enter = false;
    }
  }

  #clearCanvas(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }
}
