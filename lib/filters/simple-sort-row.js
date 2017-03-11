'use strict';

var _ = require('lodash'),
    Utils = require('../modules/utils'),
    Rows = require('../modules/rows'),
    debug = require('debug')('filter/simple-sort-row');

module.exports = function (image) {
	Utils.check.image(image, 'Simple Row Sort');

	debug('Simple row sort...');

	var sample = _.clone(image.glitch.rows);

	_.each(sample, function (row, key) {
		sample[key] = _.sortBy(row, ['hex']);
	});

	return Rows(image, sample);
};