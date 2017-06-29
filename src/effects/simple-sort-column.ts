// 'use strict';

// var _     = require('lodash'),
// 	Utils = require('../modules/utils'),
// 	Rows  = require('../modules/rows'),
// 	debug = require('debug')('filter/simple-sort-column');

// module.exports = function( image ){
// 	Utils.check.image(image, 'Simple Column Sort');

// 	debug('Simple column sort...');

// 	var columns = image.glitch.columns,
// 		rows = image.glitch.rows;

// 	_.each(columns, function( col, key ){
// 		col = _.sortBy(col, ['hex']);
// 		_.each(col, function( pixel, y ){
// 			rows[y][key] = pixel;
// 		});
// 	});

// 	return Rows(image, rows);
// };