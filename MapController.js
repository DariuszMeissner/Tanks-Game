import { MAP_OBJECT } from "./Constant.js";
import MapElement from "./MapElement.js";

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
        const x = column * this.tileSize;
        const y = row * this.tileSize;

        switch (tile) {
          case MAP_OBJECT.wall:
            this.#handleWall(ctx, x, y, player, bullet, enemies, row, column);
            break;
          // case mapObject.water:
          //   this.#handleWater(ctx, x, y, player, enemies);
          //   break;
          case MAP_OBJECT.grass:
            this.#handleGrass(ctx, x, y);
            break;
          case MAP_OBJECT.eagle:
            this.#handleEagle(ctx, x, y, bullet, row, column);
            break;
          case MAP_OBJECT.road:
            this.#handleRoad(ctx, x, y, player, enemies);
            break;
        }
      }
    }
  }

  #handleWall(ctx, x, y, player, bullet, enemies, row, column) {
    const wall = new MapElement(x, y, this.tileSize, "brown");
    wall.draw(ctx);
    wall.detectCollisionWithPlayer(wall, player);
    wall.detectCollisionWithBot(wall, enemies);

    const isCollisionBullet = wall.detectCollisionWithBullet(wall, bullet);

    if (isCollisionBullet) {
      this.map[row][column] = mapObject.road;
      this.collisionWallWithBullet = true;
    }
  }

  #handleWater(ctx, x, y, player, enemies) {
    const water = new MapElement(x, y, this.tileSize, "blue");
    water.draw(ctx);
    water.detectCollisionWithPlayer(water, player);
    water.detectCollisionWithBot(water, enemies);
  }
  //
  #handleGrass(ctx, x, y) {
    const grass = new MapElement(x, y, this.tileSize, "#58d30da1");
    grass.draw(ctx);
  }

  #handleEagle(ctx, x, y, bullet, row, column) {
    const eagle = new MapElement(x, y, this.tileSize, "gray");
    eagle.draw(ctx);

    const isCollisionBullet = eagle.detectCollisionWithBullet(eagle, bullet);

    if (isCollisionBullet) {
      this.map[row][column] = mapObject.road;
      this.collisionWallWithBullet = true;
    }
  }

  #handleRoad(ctx, x, y, player, enemies) {
    const road = new MapElement(x, y, this.tileSize, "black");
    road.draw(ctx);
    // road.detectCollisionPlayerWithBot(player, enemies);
    // road.detectCollisionBotWithPlayer(player, enemies);
    road.detectCollisionsBetweenBots(enemies);
  }
}
