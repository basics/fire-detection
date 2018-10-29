import '../pipeline.base';
import glur from 'glur';

self.options = { radius: 3 };

self.process = function([imageData]) {
  glur(imageData.data, imageData.width, imageData.height, self.options.radius);
  return imageData;
};
