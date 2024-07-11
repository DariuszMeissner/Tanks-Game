import { Panel } from '../../engine/Panel.js';
import { scaleImage } from '../../engine/util/ui.js';
import { Colors, FONT, HudP, ImagesPathsName } from '../constants/game.js';

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
    this.#botsLife(context);
    this.#playerLife(context);
    this.#stageLevel(context);
    context.restore();
  }

  #botsLife(context) {
    const enemy = this.assets.get(ImagesPathsName.ENEMY_LIFE);
    const enemyScale = scaleImage(enemy, 0.7);

    context.save();
    this.botController.enemies.forEach((_, index) => {
      const nextRow = HudP.POSITION.BOTS_LIFE + enemyScale.height * (index / 2);
      const currentRow = HudP.POSITION.BOTS_LIFE + enemyScale.height * (Math.round(index / 2) - 1);

      if (index % 2 == 0) {
        context.drawImage(enemy, HudP.CONTENT.START, nextRow, enemyScale.width, enemyScale.height);
      } else {
        context.drawImage(enemy, HudP.CONTENT.END - enemyScale.width, currentRow, enemyScale.width, enemyScale.height);
      }
    });
    context.restore();
  }

  #playerLife(context) {
    const txtI = 'I';
    const txtP = 'P';
    const playerLifes = this.playersController.enemies.length;
    const player = this.assets.get(ImagesPathsName.PLAYER_LIFE);
    const playerScale = scaleImage(player, 0.65);

    context.save();
    context.fillStyle = Colors.BLACK;
    context.font = `20px ${FONT}`;
    context.textAlign = 'left';
    context.fillText(txtI, HudP.CONTENT.START + 2, HudP.POSITION.PLAYER_FLAG);
    context.restore();

    context.save();
    context.fillStyle = Colors.BLACK;
    context.font = `20px ${FONT}`;
    context.textAlign = 'right';
    context.fillText(txtP, HudP.CONTENT.END - 2, HudP.POSITION.PLAYER_FLAG);
    context.restore();

    context.save();
    context.drawImage(player, HudP.CONTENT.START, HudP.POSITION.PLAYER_LIFES, playerScale.width, playerScale.height);
    context.restore();

    context.save();
    context.font = `20px ${FONT}`;
    context.fillStyle = Colors.BLACK;
    context.textBaseline = 'top';
    context.textAlign = 'right';
    context.fillText(playerLifes, HudP.CONTENT.END, HudP.POSITION.PLAYER_LIFES);
    context.restore();
  }

  #stageLevel(context) {
    const stageFlag = this.assets.get(ImagesPathsName.STAGE_FLAG);
    const stageFlagScale = scaleImage(stageFlag, 0.6);
    const setCenterOnBoardImage = HudP.MIDDLE - stageFlagScale.width / 2;

    context.save();
    context.drawImage(stageFlag, setCenterOnBoardImage, HudP.POSITION.STAGE_FLAG, stageFlagScale.width, stageFlagScale.height);

    context.font = `20px ${FONT}`;
    context.fillStyle = Colors.BLACK;
    context.textAlign = 'right';
    context.fillText(this.stageLevel, HudP.CONTENT.END, HudP.POSITION.STAGE_LEVEL);
    context.restore();
  }
}
