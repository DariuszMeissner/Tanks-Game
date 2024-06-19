import { init, main } from './main.js';

function getContext() {
  const canvas = document.getElementById('myCanvas');
  const context = canvas.getContext('2d');

  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;
  context.imageSmoothingEnabled = false;

  return context;
}

function animationFrame(time) {
  window.requestAnimationFrame(animationFrame);
  main(context, main);
}

init();

const context = getContext();
window.requestAnimationFrame(animationFrame);
