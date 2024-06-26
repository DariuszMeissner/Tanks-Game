export function getContext(canvasWidth, canvasHeight) {
  const canvas = document.getElementById('myCanvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Unable to find canvas context');
  }

  context.canvas.width = canvasWidth;
  context.canvas.height = canvasHeight;
  context.imageSmoothingEnabled = false;

  return context;
}
