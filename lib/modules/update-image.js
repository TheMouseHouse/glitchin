'use strict';

var _ = require('lodash');

module.exports = function (image) {
	var index = 0;

	_.each(image.input, function (pixel) {
		image.bitmap.data[index] = pixel.r;
		image.bitmap.data[index + 1] = pixel.g;
		image.bitmap.data[index + 2] = pixel.b;
		image.bitmap.data[index + 3] = pixel.a;
		index += 4;
	});
	image.write(output);

	callback && callback(output);
};