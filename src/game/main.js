import Player from './Player.js';
import Bot from './Bot.js';
import BulletController from './BulletController.js';
import BotController from './BotController.js';
import MapController from './MapController.js';
import AssetsService from './service/AssetsService.js';
import { AssetsPaths, AssetsPathsName, GameSettings, Map } from './config/Constant.js';

const assetsService = new AssetsService();

const mapController = new MapController(Map, GameSettings.TILE_SIZE);
const enemies = [
  new Bot(1, 160, 180, GameSettings.TILE_SIZE, GameSettings.TILE_SIZE),
  new Bot(2, 130, 60, GameSettings.TILE_SIZE, GameSettings.TILE_SIZE),
  new Bot(3, 260, 120, GameSettings.TILE_SIZE, GameSettings.TILE_SIZE),
];
const botController = new BotController(enemies);
const playerBulletController = new BulletController(mapController, botController);
const player = new Player(160, 120, GameSettings.TILE_SIZE, GameSettings.TILE_SIZE, playerBulletController);

// const bot1BulletController = new BulletController(mapController, [player]);
// const bot2BulletController = new BulletController(mapController, [player]);
// const bot3BulletController = new BulletController(mapController, [player]);

export async function init() {
  await assetsService.load([
    [AssetsPathsName.ROAD, AssetsPaths.ROAD],
    [AssetsPathsName.WALL, AssetsPaths.WALL],
    [AssetsPathsName.WATER, AssetsPaths.WATER],
    [AssetsPathsName.GRASS, AssetsPaths.GRASS],
    [AssetsPathsName.EAGLE, AssetsPaths.EAGLE],
    [AssetsPathsName.EAGLE_DEAD, AssetsPaths.EAGLE_DEAD],
    [AssetsPathsName.MAP_EDGE, AssetsPaths.MAP_EDGE],
    [AssetsPathsName.ROCK, AssetsPaths.ROCK],
    [AssetsPathsName.TANK_PLAYER, AssetsPaths.TANK_PLAYER],
    [AssetsPathsName.TANK_ENEMY, AssetsPaths.TANK_ENEMY],
  ]);
}

export function main(context, time) {
  const imageRoad = assetsService.assets.get(AssetsPathsName.ROAD);
  const imageWall = assetsService.assets.get(AssetsPathsName.WALL);
  const imageWater = assetsService.assets.get(AssetsPathsName.WATER);
  const imageGrass = assetsService.assets.get(AssetsPathsName.GRASS);
  const imageEagle = assetsService.assets.get(AssetsPathsName.EAGLE);
  const imageEagleDead = assetsService.assets.get(AssetsPathsName.EAGLE_DEAD);
  const imageMapEdge = assetsService.assets.get(AssetsPathsName.MAP_EDGE);
  const imageRock = assetsService.assets.get(AssetsPathsName.ROCK);
  const imageTankPlayer = assetsService.assets.get(AssetsPathsName.TANK_PLAYER);
  const imageTankEnemy = assetsService.assets.get(AssetsPathsName.TANK_ENEMY);

  if (
    !imageRoad &&
    !imageWall &&
    !imageWater &&
    !imageGrass &&
    !imageEagle &&
    !imageEagleDead &&
    !imageMapEdge &&
    !imageRock &&
    !imageTankPlayer &&
    !imageTankEnemy
  )
    return;

  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  player.draw(context, imageTankPlayer);
  botController.draw(context, imageTankEnemy);
  mapController.draw(context, player, playerBulletController.bullets[0], botController.enemies, assetsService.assets);
  playerBulletController.draw(context, player);
}
