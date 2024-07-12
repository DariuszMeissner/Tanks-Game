import { Menu } from '../../engine/Menu.js';
import { alignCenterImage, clearCanvas, scaleImage } from '../../engine/util/ui.js';
import { Colors, FONT, ImagesPathsName, MapP, MenuOptions, MenuType, SCREEN_HEIGHT } from '../constants/game.js';

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
    context.save();
    const lineHeight = 40;
    const offsetMenu = 40;

    this.menuOptions.forEach((option, index) => {
      this.#cursorOption(index, context);

      context.font = `20px ${FONT}`;
      context.fillStyle = Colors.WHITE;
      context.textAlign = 'left';
      context.fillText(option, MapP.MIDDLE.X - offsetMenu, MapP.MIDDLE.Y + index * lineHeight);
    });
    context.restore();
  }

  #cursorOption(index, context) {
    const cursor = this.assets.get(ImagesPathsName.CURSOR);
    const cursorScale = scaleImage(cursor, 0.065);
    const offset = 100;
    const lineHeight = 40;

    if (index === this.selectedOptions) {
      context.drawImage(
        cursor,
        MapP.MIDDLE.X - offset,
        MapP.MIDDLE.Y - cursorScale.height / 1.25 + index * lineHeight,
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
