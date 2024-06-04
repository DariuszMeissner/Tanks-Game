import MapElement from "./MapElement.js";
import { mapObject } from "./main.js";

export default class MapController {
  constructor(map, tileSize) {
    this.map = map;
    this.tileSize = tileSize;
    this.canvasHeight = map.length * tileSize;
    this.canvasWidth = map[0].length * tileSize;
    this.collisionWallWithBullet = false;
  }

  draw(canvas, ctx, player, bullet, enemies) {
    this.#setCanvasSize(canvas);
    this.#drawMap(ctx, player, bullet, enemies);
  }

  #setCanvasSize(canvas) {
    canvas.height = this.canvasHeight;
    canvas.width = this.canvasWidth;
  }

  #drawMap(ctx, player, bullet, enemies) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        const tile = this.map[row][column];

        switch (tile) {
          case mapObject.wall:
            const wall = new MapElement(column * this.tileSize, row * this.tileSize, this.tileSize, "brown");
            wall.draw(ctx);
            wall.detectCollisionWithPlayer(wall, player);
            wall.detectCollisionWithBot(wall, enemies);

            const isCollisionBullet = wall.detectCollisionWithBullet(wall, bullet);

            if (isCollisionBullet) {
              this.map[row][column] = mapObject.road;
              this.collisionWallWithBullet = true;
            }
            break;
          case mapObject.water:
            const water = new MapElement(column * this.tileSize, row * this.tileSize, this.tileSize, "blue");
            water.draw(ctx);
            water.detectCollisionWithPlayer(water, player);
            water.detectCollisionWithBot(water, enemies);
            break;
          case mapObject.grass:
            const grass = new MapElement(column * this.tileSize, row * this.tileSize, this.tileSize, "#58d30da1");
            grass.draw(ctx);
            break;
          case mapObject.eagle:
            const eagle = new MapElement(column * this.tileSize, row * this.tileSize, this.tileSize, "gray");
            eagle.draw(ctx);
            break;
          case mapObject.road:
            const road = new MapElement(column * this.tileSize, row * this.tileSize, this.tileSize, "black");
            road.detectCollisionPlayerWithBot(player, enemies);
            break;
        }
      }
    }
  }
}
