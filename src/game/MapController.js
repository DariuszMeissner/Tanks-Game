import { ASSETS, COMPENSE_MAP_EDGE_SIZE, MAP_OBJECT } from "./Constant.js";
import MapElement from "./MapElement.js";

export default class MapController {
  constructor(map, tileSize) {
    this.map = map;
    this.tileSize = tileSize;
    this.canvasHeight = (map.length - COMPENSE_MAP_EDGE_SIZE) * tileSize;
    this.canvasWidth = (map[0].length - COMPENSE_MAP_EDGE_SIZE) * tileSize;
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
            this.#handleWall(ctx, x, y, player, bullet, enemies, row, column, ASSETS.wall, tile);
            break;
          case MAP_OBJECT.water:
            this.#handleWall(ctx, x, y, player, bullet, enemies, row, column, ASSETS.water, tile);
            break;
          case MAP_OBJECT.grass:
            this.#handleGrass(ctx, x, y);
            break;
          case MAP_OBJECT.eagle:
            this.#handleEagle(ctx, x, y, bullet, row, column, tile);
            break;
          case MAP_OBJECT.eagleDead:
            this.#handleEagleDead(ctx, x, y, bullet, row, column);
            break;
          case MAP_OBJECT.road:
            this.#handleRoad(ctx, x, y, player, enemies);
            break;
          case MAP_OBJECT.mapEdge:
            this.#handleWall(ctx, x, y, player, bullet, enemies, row, column, ASSETS.mapEdge, tile);
            break;
          case MAP_OBJECT.rock:
            this.#handleWall(ctx, x, y, player, bullet, enemies, row, column, ASSETS.rock, tile);
            break;
        }
      }
    }
  }

  #handleCollisionWithBullet(mapElement, bullet, row, column, objectType) {
    const isCollisionBullet = mapElement.detectCollisionWithBullet(mapElement, bullet);

    if (isCollisionBullet) {
      switch (objectType) {
        case MAP_OBJECT.wall:
          this.map[row][column] = MAP_OBJECT.road;
          this.collisionWallWithBullet = true;
          break;
        case MAP_OBJECT.mapEdge:
          this.collisionWallWithBullet = true;
          break;
        case MAP_OBJECT.rock:
          this.collisionWallWithBullet = true;
          break;
        case MAP_OBJECT.eagle:
          this.map[row][column] = MAP_OBJECT.eagleDead;
          this.collisionWallWithBullet = true;
          break;
        default:
          break;
      }
    }
  }

  #handleWall(ctx, x, y, player, bullet, enemies, row, column, objectDesign, objectType) {
    const wall = new MapElement(x, y, objectType === MAP_OBJECT.mapEdge ? 2 : this.tileSize, objectDesign);

    wall.draw(ctx);
    wall.detectCollisionWithPlayer(wall, player);
    wall.detectCollisionWithBot(wall, enemies);

    this.#handleCollisionWithBullet(wall, bullet, row, column, objectType);
  }

  #handleGrass(ctx, x, y) {
    const grass = new MapElement(x, y, this.tileSize, ASSETS.grass);
    grass.draw(ctx);
  }

  #handleEagleDead(ctx, x, y) {
    const eagle = new MapElement(x, y, this.tileSize, ASSETS.eagleDead);
    eagle.draw(ctx);
  }

  #handleEagle(ctx, x, y, bullet, row, column, object) {
    const eagle = new MapElement(x, y, this.tileSize, ASSETS.eagle);
    eagle.draw(ctx);
    this.#handleCollisionWithBullet(eagle, bullet, row, column, object);
  }

  #handleRoad(ctx, x, y, player, enemies) {
    const road = new MapElement(x, y, this.tileSize, ASSETS.road);
    road.draw(ctx);
    road.detectCollisionPlayerWithBot(player, enemies);
    road.detectCollisionBotWithPlayer(player, enemies);
    road.detectCollisionsBetweenBots(enemies);
  }
}
