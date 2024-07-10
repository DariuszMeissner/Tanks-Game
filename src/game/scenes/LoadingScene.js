import Scene from '../../engine/Scene.js';
import { ImagesPathsName, ImagesPaths, SoundsPathsName, SoundsPaths, FontsPathsName, FontsPaths } from '../constants/game.js';

const assetsList = [
  [ImagesPathsName.ROAD, ImagesPaths.ROAD],
  [ImagesPathsName.WALL, ImagesPaths.WALL],
  [ImagesPathsName.WATER, ImagesPaths.WATER],
  [ImagesPathsName.GRASS, ImagesPaths.GRASS],
  [ImagesPathsName.EAGLE, ImagesPaths.EAGLE],
  [ImagesPathsName.EAGLE_DEAD, ImagesPaths.EAGLE_DEAD],
  [ImagesPathsName.MAP_EDGE, ImagesPaths.MAP_EDGE],
  [ImagesPathsName.ROCK, ImagesPaths.ROCK],
  [ImagesPathsName.TANK_PLAYER, ImagesPaths.TANK_PLAYER],
  [ImagesPathsName.TANK_ENEMY, ImagesPaths.TANK_ENEMY],
  [ImagesPathsName.MAIN_TEXT, ImagesPaths.MAIN_TEXT],
  [ImagesPathsName.CURSOR, ImagesPaths.CURSOR],
  [ImagesPathsName.STAGE_FLAG, ImagesPaths.STAGE_FLAG],
  [ImagesPathsName.PLAYER_LIFE, ImagesPaths.PLAYER_LIFE],
  [ImagesPathsName.ENEMY_LIFE, ImagesPaths.ENEMY_LIFE],
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
  [FontsPathsName.DIGITS_4x7, FontsPaths.DIGITS_4x7],
  [FontsPathsName.FONT_7x7, FontsPaths.FONT_7x7],
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
