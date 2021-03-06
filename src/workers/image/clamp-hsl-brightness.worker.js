import '../image.base';
import { rgb2hsl } from '../../utils/rgb-hsl';

let hsl;

self.options = { h: [0, 100], s: 0, l: 0 };
self.start = function() {
  // console.log(self.options);
};

self.tick = function(px) {
  hsl = rgb2hsl(px);
  if (hsl[0] < self.options.h[0] / 100 || hsl[0] > self.options.h[1] / 100) {
    self.clearPixel(px);
  }
  if (hsl[1] < self.options.s / 100) {
    self.clearPixel(px);
  }
  if (hsl[2] < self.options.l / 100) {
    self.clearPixel(px);
  }
};

self.end = function() {};
