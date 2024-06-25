import { MapObject, AssetsPathsName } from './constant/Constant.js';
import MapElement from './MapElement.js';

export default class MapController {
  constructor(map, tileSize) {
    this.map = map;
    this.tileSize = tileSize;
    this.collisionWallWithBullet = false;
    this.endGame = false;
    this.winGame = false;
  }

  draw(ctx, player, playerBullets, enemies, assets) {
    this.#drawMap(ctx, player, playerBullets, enemies, assets);
  }

  #drawMap(ctx, player, playerBullets, enemies, assets) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        const tile = this.map[row][column];
        const x = column * this.tileSize;
        const y = row * this.tileSize;

        switch (tile) {
          case MapObject.WALL:
            this.#handleWall(ctx, x, y, player, playerBullets, enemies, row, column, assets.get(AssetsPathsName.WALL), tile);
            break;
          case MapObject.WATER:
            this.#handleWall(ctx, x, y, player, playerBullets, enemies, row, column, assets.get(AssetsPathsName.WATER), tile);
            break;
          case MapObject.GRASS:
            this.#handleGrass(ctx, x, y, assets.get(AssetsPathsName.GRASS));
            break;
          case MapObject.EAGLE:
            this.#handleEagle(ctx, x, y, playerBullets, row, column, tile, assets.get(AssetsPathsName.EAGLE), enemies, player);
            break;
          case MapObject.EAGLE_DEAD:
            this.#handleEagleDead(ctx, x, y, assets.get(AssetsPathsName.EAGLE_DEAD));
            break;
          case MapObject.ROAD:
            this.#handleRoad(ctx, x, y, player, enemies, assets.get(AssetsPathsName.ROAD));
            break;
          case MapObject.MAP_EDGE:
            this.#handleWall(ctx, x, y, player, playerBullets, enemies, row, column, assets.get(AssetsPathsName.MAP_EDGE), tile);
            break;
          case MapObject.ROCK:
            this.#handleWall(ctx, x, y, player, playerBullets, enemies, row, column, assets.get(AssetsPathsName.ROCK), tile);
            break;
        }
      }
    }
  }

  #handleWall(ctx, x, y, player, playerBullets, enemies, row, column, objectDesign, objectType) {
    const wall = new MapElement(x, y, this.tileSize);

    wall.draw(ctx, objectDesign);
    wall.detectCollisionWithPlayer(wall, player);
    wall.detectCollisionWithBot(wall, enemies);

    this.#handleCollisionWithPlayersBullet(wall, playerBullets, row, column, objectType);
    this.#handleCollisionWithBotsBullet(wall, enemies, row, column, objectType);
  }

  #handleGrass(ctx, x, y, objectDesign) {
    const grass = new MapElement(x, y, this.tileSize);
    grass.draw(ctx, objectDesign);
  }

  #handleEagleDead(ctx, x, y, objectDesign) {
    const eagle = new MapElement(x, y, this.tileSize);
    eagle.draw(ctx, objectDesign);
  }

  #handleEagle(ctx, x, y, playerBullets, row, column, objectType, objectDesign, enemies, player) {
    const eagle = new MapElement(x, y, this.tileSize);
    eagle.draw(ctx, objectDesign);

    eagle.detectCollisionWithPlayer(eagle, player);
    eagle.detectCollisionWithBot(eagle, enemies);

    this.#handleCollisionWithPlayersBullet(eagle, playerBullets, row, column, objectType);
    this.#handleCollisionWithBotsBullet(eagle, enemies, row, column, objectType);
  }

  #handleRoad(ctx, x, y, player, enemies, objectDesign) {
    const road = new MapElement(x, y, this.tileSize);
    road.draw(ctx, objectDesign);

    road.detectCollisionPlayerWithBot(player, enemies);
    road.detectCollisionBotWithPlayer(player, enemies);
    road.detectCollisionsBetweenBots(enemies);
  }

  #handleCollisionWithPlayersBullet(mapElement, playerBullets, row, column, objectType) {
    const isCollisionBullet = mapElement.detectCollisionWithBullet(mapElement, playerBullets);

    if (isCollisionBullet) {
      switch (objectType) {
        case MapObject.WALL:
          this.map[row][column] = MapObject.ROAD;
          this.collisionWallWithBullet = true;
          break;
        case MapObject.MAP_EDGE:
          this.collisionWallWithBullet = true;
          break;
        case MapObject.ROCK:
          this.collisionWallWithBullet = true;
          break;
        case MapObject.EAGLE:
          this.map[row][column] = MapObject.EAGLE_DEAD;
          this.collisionWallWithBullet = true;
          this.endGame = true;
          break;
        default:
          break;
      }
    }
  }

  #handleCollisionWithBotsBullet(mapElement, enemies, row, column, objectType) {
    enemies.forEach((enemy) => {
      const isCollisionBullet = mapElement.detectCollisionWithBullet(mapElement, enemy.bulletController.bullets[0]);
      if (isCollisionBullet) {
        switch (objectType) {
          case MapObject.WALL:
            this.map[row][column] = MapObject.ROAD;
            this.collisionWallWithBullet = true;
            break;
          case MapObject.MAP_EDGE:
            this.collisionWallWithBullet = true;
            break;
          case MapObject.ROCK:
            this.collisionWallWithBullet = true;
            break;
          case MapObject.EAGLE:
            this.map[row][column] = MapObject.EAGLE_DEAD;
            this.collisionWallWithBullet = true;
            this.endGame = true;
            break;
          default:
            break;
        }
      }
    });
  }
}
