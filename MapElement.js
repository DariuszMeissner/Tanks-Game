export default class MapElement {
  constructor(x, y, tileSize, color) {
    this.x = x;
    this.y = y;
    this.height = tileSize;
    this.width = tileSize;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  detectCollision(element1, element2) {
    return element1.x < element2?.x + element2?.width &&
      element1.x + element1.width > element2?.x &&
      element1.y < element2?.y + element2?.height &&
      element1.y + element1.height > element2?.y
  }

  detectCollisionWithPlayer(mapElement, player) {
    const isCollisionPlayer = this.detectCollision(mapElement, player)

    if (isCollisionPlayer) {
      console.log(player.x);
      player.x = player.previousX;
      player.y = player.previousY;
    }
  }

  detectCollisionWithBullet(mapElement, bullet) {
    return this.detectCollision(mapElement, bullet);
  }

  detectCollisionWithBot(mapElement, enemies) {
    for (let i = 0; i < enemies.length; i++) {
      const enemy1 = enemies[i];
      const isCollisionWithWall1 = this.detectCollision(mapElement, enemy1);

      if (isCollisionWithWall1) {
        enemy1.x = enemy1.previousX;
        enemy1.y = enemy1.previousY;
        enemy1.changeDirection();
      }


    }
  }

}