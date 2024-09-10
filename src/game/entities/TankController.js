import { animateObject } from '../common/common.js';
import { ImagesPathsName } from '../constants/game.js';
import BulletController from '../entities/BulletController.js';

export default class TankController {
  constructor(lifes, mapController, enemyController, maxTankOnMap, assets) {
    this.enemies = lifes.map((enemy) => {
      enemy.bulletController = new BulletController(mapController, enemyController, assets);
      return enemy;
    });
    this.mapController = mapController;
    this.maxTankOnMap = maxTankOnMap;
    this.assets = assets;
    this.tmpBullet = null;
    this.collisionBulletWithEnemy = false;
  }

  drawTank(ctx, image) {
    this.checkEnemiesAndEndGame();

    this.enemies.forEach((tank, index) => {
      if (this.shouldDraw(index)) {
        tank.draw(ctx, image, this.assets);
      }
    });
  }

  drawBullet(ctx) {
    this.checkEnemiesAndEndGame();

    this.enemies.forEach((tank, index) => {
      if (this.shouldDraw(index)) {
        tank.bulletController.draw(ctx, tank);
      }
    });
  }

  drawTankExplosion(ctx) {
    if (!this.collisionBulletWithEnemy) return;

    this.#drawBigExplosion(ctx, this.tmpBullet);
  }

  checkEnemiesAndEndGame() {
    const noEnemy = this.enemies.length === 0;
    if (noEnemy) {
      this.endGame();
      return;
    }
  }

  #drawBigExplosion(ctx, bullet) {
    ctx.save();
    ctx.translate(bullet.x + bullet.width / 2, bullet.y + bullet.height / 2);
    animateObject(
      ctx,
      5,
      this.assets.get(ImagesPathsName.EXPLOSION),
      -100 / 2,
      -100 / 2,
      100,
      100,
      bullet.frameX,
      0,
      bullet.setFrameX,
      bullet.gameFrame,
      bullet.setGameFrame,
      7,
      132,
      139
    );
    ctx.restore();

    const idTimeout = setTimeout(() => {
      this.collisionBulletWithEnemy = false;
      this.tmpBullet = null;
      this.tmpEnemy = null;
      clearTimeout(idTimeout);
    }, 500);
  }

  shouldDraw(index) {
    return index < this.maxTankOnMap;
  }

  endGame() {
    this.mapController.wonGame = true;
  }
}
