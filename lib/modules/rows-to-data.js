'use strict';

var _ = require('lodash');

module.exports = function (image) {
	return _.flatten(image.glitch.rows);
};