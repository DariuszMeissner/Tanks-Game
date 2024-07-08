import AssetsService from './service/AssetsService.js';
import { LevelScene } from './scenes/LevelScene.js';
import Game from '../engine/Game.js';
import { LoadingScene } from './scenes/LoadingScene.js';
import { PLAYER_HEIGHT, PLAYER_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from './constants/game.js';
import Player from './entities/Player.js';
import { StartMenu } from './entities/StartMenu.js';
import { MapLevel1 } from './constants/levelsMaps.js';

const player1 = new Player(160, 120, PLAYER_WIDTH, PLAYER_HEIGHT, null);
const players = [player1];

export class TankGame extends Game {
  constructor() {
    super(SCREEN_WIDTH, SCREEN_HEIGHT);

    this.assetsService = new AssetsService();
    this.scene = new LoadingScene(this.onLoadedComplete, this.assetsService);
    this.players = players;
  }

  onLoadedComplete = () => {
    this.startMenu = new StartMenu(this.assetsService.assets);

    this.scene = new LevelScene(this.assetsService.assets, players, MapLevel1, 3);
  };
}
