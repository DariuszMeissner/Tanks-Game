import { Menu } from '../../engine/Menu.js';
import { MenuOptions, MenuType } from '../constants/game.js';

export class StartMenu extends Menu {
  constructor() {
    super();
    this.menuOptions = MenuOptions;
  }

  draw(context, setStage) {
    this.drawMenu(context);

    this.handlePressEnter(setStage);
  }

  handlePressEnter(setStage) {
    if (this.keyStates.Enter) {
      this.selectedOptions === 0 && setStage(MenuType.PLAYER_1);
      this.selectedOptions === 1 && setStage(MenuType.PLAYERS_2);

      this.keyStates.Enter = false;
    }
  }
}
