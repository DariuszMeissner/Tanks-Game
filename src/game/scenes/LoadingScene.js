import Scene from '../../engine/Scene.js';
import { AssetsPathsName, AssetsPaths, SoundsPathsName, SoundsPaths } from '../constants/game.js';

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
  [SoundsPathsName.ENEMY_DESTROYED, SoundsPaths.ENEMY_DESTROYED],
  [SoundsPathsName.FIRING_AT_THE_BRICKS, SoundsPaths.FIRING_AT_THE_BRICKS],
  [SoundsPathsName.FIRING_AT_THE_WALL, SoundsPaths.FIRING_AT_THE_WALL],
  [SoundsPathsName.FIRING_THE_ENEMY_BIG_TANK, SoundsPaths.FIRING_THE_ENEMY_BIG_TANK],
  [SoundsPathsName.GAME_OVER, SoundsPaths.GAME_OVER],
  [SoundsPathsName.HIGH_SCORE, SoundsPaths.HIGH_SCORE],
  [SoundsPathsName.PAUSE, SoundsPaths.PAUSE],
  [SoundsPathsName.PLAYER_GOT_BONUS_1000_POINTS, SoundsPaths.PLAYER_GOT_BONUS_1000_POINTS],
  [SoundsPathsName.PLAYER_TANK_DESTROYED_EAGLE_DESTROYED, SoundsPaths.PLAYER_TANK_DESTROYED_EAGLE_DESTROYED],
  [SoundsPathsName.PLAYER_TANK_FIRING, SoundsPaths.PLAYER_TANK_FIRING],
  [SoundsPathsName.PLAYER_TANK_IDLE, SoundsPaths.PLAYER_TANK_IDLE],
  [SoundsPathsName.PLAYER_TANK_MOVING, SoundsPaths.PLAYER_TANK_MOVING],
  [SoundsPathsName.POWER_UP_APPEARED, SoundsPaths.POWER_UP_APPEARED],
  [SoundsPathsName.POWER_UP_OBTAINED, SoundsPaths.POWER_UP_OBTAINED],
  [SoundsPathsName.SCORING_SUMMARY_THE_LEVEL, SoundsPaths.SCORING_SUMMARY_THE_LEVEL],
  [SoundsPathsName.SLIDING, SoundsPaths.SLIDING],
  [SoundsPathsName.START_UP, SoundsPaths.START_UP],
  [SoundsPathsName.UP, SoundsPaths.UP],
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
