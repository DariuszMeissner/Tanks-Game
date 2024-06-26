import { getContext } from './context.js';

export default class Game {
  scene;

  constructor(width, height) {
    this.context = getContext(width, height);
  }

  frame = (time) => {
    window.requestAnimationFrame(this.frame);

    if (this.scene.draw) this.scene.draw(this.context);
  };

  start() {
    window.requestAnimationFrame(this.frame);
  }
}
