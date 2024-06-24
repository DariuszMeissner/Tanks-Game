import Player from './Player.js';
import Bot from './Bot.js';
import BotController from './BotController.js';
import MapController from './MapController.js';
import AssetsService from './service/AssetsService.js';
import { AssetsPaths, AssetsPathsName, GameSettings, Map, CanvasSize } from './config/Constant.js';
import PlayersController from './PlayersController.js';

const assetsService = new AssetsService();
const mapController = new MapController(Map, GameSettings.TILE_SIZE);

const enemies = [
  new Bot(1, 160, 180, GameSettings.TILE_SIZE - 4, GameSettings.TILE_SIZE - 4),
  new Bot(2, 130, 80, GameSettings.TILE_SIZE - 4, GameSettings.TILE_SIZE - 4),
  new Bot(3, 260, 120, GameSettings.TILE_SIZE - 4, GameSettings.TILE_SIZE - 4),
];
const players = [new Player(160, 120, GameSettings.TILE_SIZE - 4, GameSettings.TILE_SIZE - 4, mapController, null)];

const playersController = new PlayersController(players, mapController);
const botController = new BotController(enemies, mapController, playersController);

players[0].bulletController.enemyController = botController;

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

export function main(ctx, time) {
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

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  playersController.draw(ctx, imageTankPlayer);
  // botController.draw(ctx, imageTankEnemy);
  mapController.draw(
    ctx,
    playersController.enemies[0],
    playersController.enemies[0]?.bulletController.bullets[0] || null,
    botController.enemies,
    assetsService.assets
  );
}
