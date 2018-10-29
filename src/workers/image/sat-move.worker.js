import '../image.base';
import SmoothBuffer from '../../classes/SmoothBuffer';
import { rgb2hsl } from '../../utils/rgb-hsl';

let buffer = null;
self.options = {};

self.start = function(imageData) {
  if (!buffer) {
    buffer = new SmoothBuffer(1, imageData.data.length);
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
    // do noting
  } else {
    self.clearPixel(px);
  }
};

self.end = function() {
  buffer.increment();
};
