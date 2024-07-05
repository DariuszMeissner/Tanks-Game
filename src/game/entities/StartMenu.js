import { Menu } from '../../engine/Menu.js';
import { alignCenterImage, clearCanvas, scaleImage } from '../../engine/util/ui.js';
import { Colors, FONT, ImagesPathsName, MenuOptions, MenuType, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/game.js';

export class StartMenu extends Menu {
  constructor(assets) {
    super();
    this.menuOptions = MenuOptions;
    this.assets = assets;
  }

  draw(context, setStage) {
    clearCanvas(context);

    this.#logo(context);

    this.menu(context);

    this.#handlePressEnter(setStage);
  }

  menu(context) {
    this.#setStyles(context);
    this.move();
  }

  #logo(context) {
    const logo = this.assets.get(ImagesPathsName.MAIN_TEXT);
    const logoScale = scaleImage(logo, 1);
    const center = alignCenterImage(logoScale.width);

    context.drawImage(logo, center, SCREEN_HEIGHT / 6, logoScale.width, logoScale.height);
  }

  #setStyles(context) {
    context.font = `20px ${FONT}`;

    this.menuOptions.forEach((option, index) => {
      this.#cursorOption(index, context);

      context.fillStyle = Colors.WHITE;
      context.textAlign = 'left';
      context.fillText(option, SCREEN_WIDTH / 2.5, SCREEN_HEIGHT / 2 + index * 40);
    });
  }

  #cursorOption(index, context) {
    const cursor = this.assets.get(ImagesPathsName.CURSOR);
    const cursorScale = scaleImage(cursor, 0.065);
    const offset = 120;

    if (index === this.selectedOptions) {
      context.drawImage(
        cursor,
        SCREEN_WIDTH / 2 - offset,
        SCREEN_HEIGHT / 2 - cursorScale.height / 1.25 + index * 40,
        cursorScale.width,
        cursorScale.height
      );
    }
  }

  #handlePressEnter(setStage) {
    if (this.keyStates.Enter) {
      this.selectedOptions === 0 && setStage(MenuType.PLAYER_1);
      this.selectedOptions === 1 && setStage(MenuType.PLAYERS_2);

      this.keyStates.Enter = false;
    }
  }
}
