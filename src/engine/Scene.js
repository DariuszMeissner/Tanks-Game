import { showNotification } from './util/notification.js';
import { playSound } from './soundHandler.js';

export default class Scene {
  constructor() {}

  drawPanel(context, enemiesLength, playerLifes) {}

  maxVisibleEnemies(botController) {
    return botController.enemies.slice(0, 2);
  }

  fixPlayersBulletsCircularDependency(player1) {
    player1.bulletController.enemyController = this.botController;
    player1.bulletController.mapController = this.stage;
  }

  showWictoryInfo(context, stage) {
    if (stage.winGame) {
      showNotification('Victory!', context, 50, 'green');
    }
  }

  showGameOverInfo(context, stage) {
    if (stage.endGame) {
      showNotification('Game Over!!', context, 50, 'red');
    }
  }

  playStartUpSound(audio) {
    playSound(audio);
  }
}
