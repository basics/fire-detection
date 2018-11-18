import '../image.base';
import SmoothBuffer from '../../classes/SmoothBuffer';
import { rgb2hsl } from '../../utils/rgb-hsl';

let buffer = null;
let targetBuffer = null;
let width = null;
self.options = {};

const FACTOR = 5;

function scale(index) {
  let x = index % width;
  let y = Math.floor(index / width);

  x = Math.floor(x / FACTOR);
  y = Math.floor(y / FACTOR);

  return y * (width / FACTOR) + x;
}

self.start = function(imageData) {
  if (!buffer) {
    width = imageData.width;

    buffer = new SmoothBuffer(1, imageData.data.length);

    targetBuffer = new SmoothBuffer(10, imageData.data.length / FACTOR);
  }
};

self.tick = function(px, index) {
  let oldPx = buffer.get(index);
  buffer.set(px, index);

  const sT = rgb2hsl(oldPx)[2];
  const s = rgb2hsl(px)[2];

  const [r, g, b] = px;
  const rT = oldPx[0];

  if (r >= g && g > b && r > rT && s > ((255 - r) * sT) / rT) {
    targetBuffer.set([255, 255, 255, 255], scale(index));
  } else {
    let ref = targetBuffer.get(scale(index));
    targetBuffer.set([255, 255, 255, ref[3] * 0.5], scale(index));
  }

  let ref = targetBuffer.get(scale(index));

  if (ref[3] < 1) {
    self.clearPixel(px);
  }
};

self.end = function() {
  buffer.increment();
  targetBuffer.increment();
};
