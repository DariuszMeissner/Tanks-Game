import { ImagesPathsName, SoundsPathsName } from '../constants/game.js';
import MapElement from './MapElement.js';
import { MapObject } from '../constants/levelsController.js';
import { detectCollisionWithBullet } from '../../engine/util/collision.js';
import { playSound } from '../../engine/soundHandler.js';

export default class MapController {
  constructor(map, tileSize, assets) {
    this.map = map;
    this.assets = assets;
    this.tileSize = tileSize;
    this.gameOver = false;
    this.wonGame = false;
  }

  draw(ctx, player, playerBullets, enemies, assets) {
    this.#update(ctx, player, playerBullets, enemies, assets);
  }

  #update(ctx, player, playerBullets, enemies, assets) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        const tile = this.map[row][column];
        const x = column * this.tileSize;
        const y = row * this.tileSize;

        switch (tile) {
          case MapObject.WALL:
            this.#handleWall(ctx, x, y, player, playerBullets, enemies, row, column, assets.get(ImagesPathsName.WALL), tile);
            break;
          case MapObject.WATER:
            this.#handleWater(ctx, x, y, assets.get(ImagesPathsName.WATER), player, enemies);
            break;
          case MapObject.GRASS:
            this.#handleGrass(ctx, x, y, assets.get(ImagesPathsName.GRASS));
            break;
          case MapObject.EAGLE:
            this.#handleEagle(ctx, x, y, playerBullets, row, column, tile, assets.get(ImagesPathsName.EAGLE), enemies, player);
            break;
          case MapObject.EAGLE_DEAD:
            this.#handleEagleDead(ctx, x, y, assets.get(ImagesPathsName.EAGLE_DEAD));
            break;
          case MapObject.ROAD:
            this.#handleRoad(ctx, x, y, player, enemies, assets.get(ImagesPathsName.ROAD));
            break;
          case MapObject.MAP_EDGE:
            this.#handleWall(ctx, x, y, player, playerBullets, enemies, row, column, assets.get(ImagesPathsName.MAP_EDGE), tile);
            break;
          case MapObject.ROCK:
            this.#handleWall(ctx, x, y, player, playerBullets, enemies, row, column, assets.get(ImagesPathsName.ROCK), tile);
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

    this.#handleCollisionWithPlayersBullet(player, wall, playerBullets, row, column, objectType);
    this.#handleCollisionWithBotsBullet(wall, enemies, row, column, objectType);
  }

  #handleWater(ctx, x, y, objectDesign, player, enemies) {
    const water = new MapElement(x, y, this.tileSize);
    water.draw(ctx, objectDesign);
    water.detectCollisionWithPlayer(water, player);
    water.detectCollisionWithBot(water, enemies);
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

    eagle.detectCollisionWithPlayer(player, eagle, player);
    eagle.detectCollisionWithBot(eagle, enemies);

    this.#handleCollisionWithPlayersBullet(player, eagle, playerBullets, row, column, objectType);
    this.#handleCollisionWithBotsBullet(eagle, enemies, row, column, objectType);
  }

  #handleRoad(ctx, x, y, player, enemies, objectDesign) {
    const road = new MapElement(x, y, this.tileSize);
    road.draw(ctx, objectDesign);

    road.detectCollisionPlayerWithBot(player, enemies);
    road.detectCollisionBotWithPlayer(player, enemies);
    road.detectCollisionsBetweenBots(enemies);
  }

  #handleCollisionWithPlayersBullet(player, mapElement, playerBullets, row, column, objectType) {
    const isCollisionBullet = detectCollisionWithBullet(mapElement, playerBullets);

    if (isCollisionBullet && !playerBullets.collisionDisabled) {
      player.collisionBulletWithObject = true;
      playerBullets.collisionDisabled = true;

      switch (objectType) {
        case MapObject.WALL:
          this.map[row][column] = MapObject.ROAD;
          playSound(this.assets.get(SoundsPathsName.FIRING_AT_THE_BRICKS), 0.8);
          break;
        case MapObject.MAP_EDGE:
          playSound(this.assets.get(SoundsPathsName.FIRING_AT_THE_WALL), 0.5);
          break;
        case MapObject.ROCK:
          playSound(this.assets.get(SoundsPathsName.FIRING_AT_THE_WALL), 0.5);
          break;
        case MapObject.EAGLE:
          this.map[row][column] = MapObject.EAGLE_DEAD;
          this.gameOver = true;
          break;
      }
    }
  }

  #handleCollisionWithBotsBullet(mapElement, enemies, row, column, objectType) {
    enemies.forEach((enemy) => {
      const isCollisionBullet = detectCollisionWithBullet(mapElement, enemy.bulletController.bullets[0]);
      if (isCollisionBullet && !enemy.bulletController.bullets[0].collisionDisabled) {
        enemy.collisionBulletWithObject = true;
        enemy.bulletController.bullets[0].collisionDisabled = true;

        switch (objectType) {
          case MapObject.WALL:
            this.map[row][column] = MapObject.ROAD;
            playSound(this.assets.get(SoundsPathsName.FIRING_AT_THE_BRICKS), 0.5);
            break;
          case MapObject.MAP_EDGE:
            playSound(this.assets.get(SoundsPathsName.FIRING_AT_THE_WALL), 0.5);
            break;
          case MapObject.ROCK:
            playSound(this.assets.get(SoundsPathsName.FIRING_AT_THE_WALL), 0.5);
            break;
          case MapObject.EAGLE:
            this.map[row][column] = MapObject.EAGLE_DEAD;
            this.gameOver = true;
            break;
        }
      }
    });
  }
}
