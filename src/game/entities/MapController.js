import { ImagesPathsName, SoundsPathsName } from '../constants/game.js';
import MapElement from './MapElement.js';
import { MapObject } from '../constants/game.js';
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

  draw(ctx, player1, player1Bullets, player2, player2Bullets, enemies, assets) {
    this.#update(ctx, player1, player1Bullets, player2, player2Bullets, enemies, assets);
  }

  #update(ctx, player1, player1Bullets, player2, player2Bullets, enemies, assets) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        const tile = this.map[row][column];
        const x = column * this.tileSize;
        const y = row * this.tileSize;

        switch (tile) {
          case MapObject.WALL:
            this.#handleWall(
              ctx,
              x,
              y,
              player1,
              player1Bullets,
              player2,
              player2Bullets,
              enemies,
              row,
              column,
              assets.get(ImagesPathsName.WALL),
              tile
            );
            break;
          case MapObject.WATER:
            this.#handleWater(ctx, x, y, assets.get(ImagesPathsName.WATER), player1, player2, enemies);
            break;
          case MapObject.GRASS:
            this.#handleGrass(ctx, x, y, assets.get(ImagesPathsName.GRASS));
            break;
          case MapObject.EAGLE:
            this.#handleEagle(
              ctx,
              x,
              y,
              row,
              column,
              tile,
              assets.get(ImagesPathsName.EAGLE),
              enemies,
              player1,
              player1Bullets,
              player2,
              player2Bullets
            );
            break;
          case MapObject.EAGLE_DEAD:
            this.#handleEagleDead(ctx, x, y, assets.get(ImagesPathsName.EAGLE_DEAD));
            break;
          case MapObject.ROAD:
            this.#handleRoad(ctx, x, y, player1, player2, enemies, assets.get(ImagesPathsName.ROAD));
            break;
          case MapObject.MAP_EDGE:
            this.#handleWall(
              ctx,
              x,
              y,
              player1,
              player1Bullets,
              player2,
              player2Bullets,
              enemies,
              row,
              column,
              assets.get(ImagesPathsName.MAP_EDGE),
              tile
            );
            break;
          case MapObject.ROCK:
            this.#handleWall(
              ctx,
              x,
              y,
              player1,
              player1Bullets,
              player2,
              player2Bullets,
              enemies,
              row,
              column,
              assets.get(ImagesPathsName.ROCK),
              tile
            );
            break;
        }
      }
    }
  }

  #handleWall(ctx, x, y, player1, player1Bullets, player2, player2Bullets, enemies, row, column, objectDesign, objectType) {
    const wall = new MapElement(x, y, this.tileSize);

    wall.draw(ctx, objectDesign);
    wall.detectCollisionWithPlayer(wall, player1);
    wall.detectCollisionWithPlayer(wall, player2);
    wall.detectCollisionWithBot(wall, enemies);

    this.#handleCollisionWithPlayersBullet(player1, wall, player1Bullets, row, column, objectType);
    this.#handleCollisionWithPlayersBullet(player2, wall, player2Bullets, row, column, objectType);
    this.#handleCollisionWithBotsBullet(wall, enemies, row, column, objectType);
  }

  #handleWater(ctx, x, y, objectDesign, player1, player2, enemies) {
    const water = new MapElement(x, y, this.tileSize);
    water.draw(ctx, objectDesign);
    water.detectCollisionWithPlayer(water, player1);
    water.detectCollisionWithPlayer(water, player2);
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

  #handleEagle(ctx, x, y, row, column, objectType, objectDesign, enemies, player1, player1Bullets, player2, player2Bullets) {
    const eagle = new MapElement(x, y, this.tileSize);
    eagle.draw(ctx, objectDesign);

    eagle.detectCollisionWithPlayer(eagle, player1);
    eagle.detectCollisionWithPlayer(eagle, player2);
    eagle.detectCollisionWithBot(eagle, enemies);

    this.#handleCollisionWithPlayersBullet(player1, eagle, player1Bullets, row, column, objectType);
    this.#handleCollisionWithPlayersBullet(player2, eagle, player2Bullets, row, column, objectType);
    this.#handleCollisionWithBotsBullet(eagle, enemies, row, column, objectType);
  }

  #handleRoad(ctx, x, y, player1, player2, enemies, objectDesign) {
    const road = new MapElement(x, y, this.tileSize);
    road.draw(ctx, objectDesign);

    road.detectCollisionPlayerWithBot(player1, enemies);
    road.detectCollisionBotWithPlayer(player1, enemies);
    road.detectCollisionPlayerWithBot(player2, enemies);
    road.detectCollisionBotWithPlayer(player2, enemies);
    road.detectCollisionsBetweenBots(enemies);
  }

  #handleCollisionWithPlayersBullet(player, mapElement, playerBullets, row, column, objectType) {
    const isCollisionBullet = detectCollisionWithBullet(mapElement, playerBullets);

    if (isCollisionBullet && !playerBullets.collisionDisabled) {
      player.collisionBulletWithObject = true;
      playerBullets.collisionDisabled = true;
      player.typeObjectCollision = objectType;

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
    enemies.forEach((bot) => {
      const isCollisionBullet = detectCollisionWithBullet(mapElement, bot.bulletController.bullets[0]);
      if (isCollisionBullet && !bot.bulletController.bullets[0].collisionDisabled) {
        bot.collisionBulletWithObject = true;
        bot.bulletController.bullets[0].collisionDisabled = true;
        bot.typeObjectCollision = objectType;

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
