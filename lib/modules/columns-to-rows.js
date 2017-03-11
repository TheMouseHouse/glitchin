'use strict';

var _ = require('lodash');

module.exports = function (image) {
	var rows = [];

	_.each(image.glitch.columns, function (column, colIndex) {
		_.each(column, function (pixel, pixelIndex) {
			if (_.isUndefined(rows[pixelIndex])) {
				rows[pixelIndex] = [];
			}
			rows[pixelIndex][colIndex] = pixel;
		});
	});

	return rows;
};