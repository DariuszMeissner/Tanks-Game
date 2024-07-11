import { Panel } from '../../engine/Panel.js';
import { scaleImage } from '../../engine/util/ui.js';
import { Colors, FONT, HudP, ImagesPathsName, MAP_WIDTH, TILE_SIZE_WIDTH } from '../constants/game.js';

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
    context.save();
    this.#botLife(context);
    // this.#playerLife(context);
    // this.#stageLevel(context);
    context.restore();
  }

  #botLife(context) {
    context.save();
    const enemy = this.assets.get(ImagesPathsName.ENEMY_LIFE);
    const enemyScale = scaleImage(enemy, 0.7);
    const alignFirstColumn = HudP.MIDDLE - enemyScale.width;
    const alignSecondColumn = HudP.MIDDLE;

    this.botController.enemies.forEach((_, index) => {
      const nextRow = 40 + enemyScale.height * (index / 2);
      const currentRow = 40 + enemyScale.height * (Math.round(index / 2) - 1);

      if (index % 2 == 0) {
        context.drawImage(enemy, alignFirstColumn, nextRow, enemyScale.width, enemyScale.height);
      } else {
        context.drawImage(enemy, alignSecondColumn, currentRow, enemyScale.width, enemyScale.height);
      }
    });
    context.restore();
  }

  #playerLife(context) {
    context.save();
    context.font = `20px ${FONT}`;
    context.resoter();
  }

  #stageLevel(context) {
    context.save();
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
    context.restore();
  }
}
