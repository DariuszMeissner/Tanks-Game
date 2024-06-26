import Scene from '../../engine/Scene.js';
import { AssetsPathsName, AssetsPaths } from '../constants/game.js';

const assetsList = [
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
];

export class LoadingScene extends Scene {
  constructor(onLoadedComplete, assetsService) {
    super();
    this.assetsService = assetsService;

    this.loadAssets(onLoadedComplete);
  }

  async loadAssets(onLoadedComplete) {
    await this.assetsService
      .load(assetsList)
      .catch((error) => {
        console.error('Unable to load assets', error);
      })
      .then(() => {
        console.log('Assets loading complete!');
        onLoadedComplete();
      });
  }
}
