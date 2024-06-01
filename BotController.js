export default class BotController {
  constructor(enemies) {
    this.enemies = enemies;
  }

  getEnemies() {
    return this.enemies;
  }

  draw(ctx) {
    for (let i = 0; i < this.enemies.length; i++) this.enemies[i].draw(ctx);
  }
}