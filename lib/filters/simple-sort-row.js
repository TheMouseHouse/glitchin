'use strict';

var _     = require('lodash'),
	Utils = require('../modules/utils'),
	Rows  = require('../modules/rows');

module.exports = function( image ){
	Utils.check.image(image, 'Simple Row Sort');

	Utils.message('info', 'Simple row sort...');

	var sample = _.clone(image.glitch.rows);

	_.each(sample, function( row, key ){
		sample[key] = _.sortBy(row, ['hex']);
	});

	return Rows(image, sample);
};