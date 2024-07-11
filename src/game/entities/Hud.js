import { Panel } from '../../engine/Panel.js';
import { scaleImage } from '../../engine/util/ui.js';
import { Colors, FONT, ImagesPathsName, MAP_WIDTH, TILE_SIZE_WIDTH } from '../constants/game.js';

export class Hud extends Panel {
  constructor(playersController, botController, assets, stageLevel) {
    super();
    this.playersController = playersController;
    this.botController = botController;
    this.assets = assets;
    this.stageLevel = stageLevel;
  }

  draw(context) {
    this.#panel(context);
  }

  #panel(context) {
    context.font = `16px ${FONT}`;
    context.fillStyle = Colors.BLACK;

    this.botController.enemies.forEach((_, index) => {
      context.fillText('|', TILE_SIZE_WIDTH * MAP_WIDTH - TILE_SIZE_WIDTH / 1.5, 100 + 20 * index);
    });

    this.#playerLifeInfo(context);
    this.#stageLevelInfo(context);
  }

  #stageLevelInfo(context) {
    const stageFlag = this.assets.get(ImagesPathsName.STAGE_FLAG);
    const stageFlagScale = scaleImage(stageFlag, 0.6);
    const setCenterOnBoardImage = TILE_SIZE_WIDTH * (MAP_WIDTH - 1) - stageFlagScale.width / 2;
    const setCenterOnBoardText = TILE_SIZE_WIDTH * (MAP_WIDTH - 1) + stageFlagScale.width / 2;

    context.font = `20px ${FONT}`;

    context.fillText('I P', (TILE_SIZE_WIDTH * (MAP_WIDTH - 1) + TILE_SIZE_WIDTH * (MAP_WIDTH - 2)) / 2, 180);
    context.fillText(
      this.playersController.enemies.length,
      (TILE_SIZE_WIDTH * (MAP_WIDTH - 1) + TILE_SIZE_WIDTH * (MAP_WIDTH - 2)) / 2,
      220
    );

    context.drawImage(stageFlag, setCenterOnBoardImage, 220, stageFlagScale.width, stageFlagScale.height);

    context.fillStyle = Colors.BLACK;
    context.textAlign = 'right';

    context.fillText(this.stageLevel, setCenterOnBoardText, 280);
  }

  #playerLifeInfo(context) {
    context.font = `20px ${FONT}`;
  }
}
