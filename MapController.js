import { MAP_OBJECT } from "./Constant.js";
import MapElement from "./MapElement.js";

export default class MapController {
  constructor(map, tileSize) {
    this.map = map;
    this.tileSize = tileSize;
    this.canvasHeight = map.length * tileSize;
    this.canvasWidth = map[0].length * tileSize;
    this.collisionWallWithBullet = false;

    // Create an off-screen canvas
    this.offScreenCanvas = document.createElement("canvas");
    this.offScreenCanvas.width = this.canvasWidth;
    this.offScreenCanvas.height = this.canvasHeight;
    this.offScreenCtx = this.offScreenCanvas.getContext("2d");
  }

  draw(canvas, ctx, player, bullet, enemies) {
    this.#setCanvasSize(canvas);
    this.#drawMap(this.offScreenCtx, player, bullet, enemies);

    // Copy the off-screen canvas to the main canvas
    ctx.drawImage(this.offScreenCanvas, 0, 0);
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
            this.#handleWall(ctx, x, y, player, bullet, enemies, row, column, "./assets/brick_square.png", tile);
            break;
          case MAP_OBJECT.water:
            this.#handleWall(ctx, x, y, player, bullet, enemies, row, column, "./assets/water_square.png", tile);
            break;
          case MAP_OBJECT.grass:
            this.#handleGrass(ctx, x, y);
            break;
          case MAP_OBJECT.eagle:
            this.#handleEagle(ctx, x, y, bullet, row, column);
            break;
          case MAP_OBJECT.road:
            this.#handleRoad(ctx, x, y, player, enemies);
            break;
          case MAP_OBJECT.mapEdge:
            this.#handleWall(ctx, x, y, player, bullet, enemies, row, column, "./assets/rock_square.png", tile);
            break;
          case MAP_OBJECT.rock:
            this.#handleWall(ctx, x, y, player, bullet, enemies, row, column, "./assets/rock_square.png", tile);
            break;
        }
      }
    }
  }

  #handleCollisionWithBullet(mapElement, bullet, row, column) {
    const isCollisionBullet = mapElement.detectCollisionWithBullet(mapElement, bullet);

    if (isCollisionBullet) {
      this.map[row][column] = MAP_OBJECT.road;
      this.collisionWallWithBullet = true;
    }
  }

  #handleWall(ctx, x, y, player, bullet, enemies, row, column, objectDesign, object) {
    const wall = new MapElement(x, y, this.tileSize, objectDesign);
    wall.draw(ctx);
    wall.detectCollisionWithPlayer(wall, player);
    wall.detectCollisionWithBot(wall, enemies);

    if (object === MAP_OBJECT.wall) {
      this.#handleCollisionWithBullet(wall, bullet, row, column);
    }
  }

  #handleGrass(ctx, x, y) {
    const grass = new MapElement(x, y, this.tileSize, "./assets/grass_square.png");
    grass.draw(ctx);
  }

  #handleEagle(ctx, x, y, bullet, row, column) {
    const eagle = new MapElement(x, y, this.tileSize, "./assets/eagle_live.png");
    eagle.draw(ctx);

    const isCollisionBullet = eagle.detectCollisionWithBullet(eagle, bullet);

    if (isCollisionBullet) {
      this.map[row][column] = MAP_OBJECT.road;
      this.collisionWallWithBullet = true;
    }
  }

  #handleRoad(ctx, x, y, player, enemies) {
    const road = new MapElement(x, y, this.tileSize, "");
    road.draw(ctx);
    road.detectCollisionPlayerWithBot(player, enemies);
    road.detectCollisionBotWithPlayer(player, enemies);
    road.detectCollisionsBetweenBots(enemies);
  }
}
