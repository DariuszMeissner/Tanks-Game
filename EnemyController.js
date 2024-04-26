export default class EnemyController {
  constructor(enemies, bulletController) {
    this.enemies = enemies;
    this.bulletController = bulletController;
  }

  draw(ctx) {
    this.enemies.forEach(enemy => {
      enemy.draw(ctx);
    });

    this.detectColisionWithBullet();
  }

  detectColisionWithBullet() {
    this.bulletController.bullets.forEach(bullet => {
      this.enemies.forEach((enemy, index) => {
        const isColisionBulletEnemy =
          (bullet.x >= enemy.x)
          && (bullet.y >= enemy.y)
          && (bullet.x + bullet.width <= enemy.x + enemy.width)
          && (bullet.y + bullet.height <= enemy.y + enemy.height)


        if (isColisionBulletEnemy) this.enemies.splice(index, 1)
      })
    });
  }
}