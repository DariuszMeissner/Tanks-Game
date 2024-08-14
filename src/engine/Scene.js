import { Colors, FONT, MapP } from '../game/constants/game.js';
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

  showGameOverInfo(context, stage) {
    const lineHeight = 24;
    if (!stage.gameOver) return;

    context.save();
    context.font = `24px ${FONT}`;
    context.fillStyle = Colors.RED;
    context.textAlign = 'center';
    context.fillText('GAME', MapP.MIDDLE.X, MapP.MIDDLE.Y);
    context.fillText('OVER', MapP.MIDDLE.X, MapP.MIDDLE.Y + lineHeight);
    context.restore();
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
