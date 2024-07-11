import { showNotification } from './util/ui.js';
import { playSound } from './soundHandler.js';

export default class Scene {
  player1;
  assets;
  stage;
  playersController;
  botController;

  constructor() {
    this.startupSoundStarted = false;
  }

  fixPlayersBulletsCircularDependency(players) {
    players.forEach((player) => {
      player.bulletController.enemyController = this.botController;
      player.bulletController.mapController = this.stage;
    });
  }

  showWictoryInfo(context, stage) {
    if (stage.winGame) {
      showNotification('Victory!', context, 50, 'green');
    }
  }

  showGameOverInfo(context, stage) {
    if (stage.gameOver) {
      showNotification('Game Over!!', context, 50, 'red');
    }
  }

  playStartUpSound(audio) {
    if (this.startupSoundStarted) return;

    playSound(audio);
    this.startupSoundStarted = true;
  }

  maxVisibleEnemies(maxTankOnMap) {
    return this.botController.enemies.slice(0, maxTankOnMap);
  }
}
