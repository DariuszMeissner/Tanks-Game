import { Menu } from '../../engine/Menu.js';
import { ImagesPathsName, MenuOptions, MenuType } from '../constants/game.js';

export class StartMenu extends Menu {
  constructor(assets) {
    super();
    this.menuOptions = MenuOptions;
    this.assets = assets;
  }

  draw(context, setStage) {
    this.#clearCanvas(context);

    this.drawLogo(context);

    this.drawMenu(context);

    this.#handlePressEnter(setStage);
  }

  drawLogo(context) {
    context.drawImage(this.assets.get(ImagesPathsName.MAIN_TEXT), 0, 0);
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
