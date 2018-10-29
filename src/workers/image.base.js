import './pipeline.base';
import { pixel2Bytes, bytes2Pixel } from '../utils/pixel';

self.process = function([imageData]) {
  const data = new Uint32Array(imageData.data.buffer);
  self.start(imageData);
  // const pos = { x: 0, y: 0 };
  for (let i = data.length; i >= 0; i--) {
    let px = bytes2Pixel(data[i]);
    if (px[3]) {
      // updatePosByIndex(pos, imageData.width, i);
      self.tick(px, i);
      data[i] = pixel2Bytes(px);
    }
  }
  self.end(imageData);
  return imageData;
};

self.clearPixel = function(px) {
  // px[0] = 0;
  // px[1] = 0;
  // px[2] = 0;
  px[3] = 0;
};

self.start = function() {};
self.tick = function() {};
self.end = function() {};

// function updatePosByIndex(pos, width, i) {
//   pos.x = i % width;
//   pos.y = Math.floor(i / width);
// }
