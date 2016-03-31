'use strict';

var _             = require('lodash'),
	rowsToData    = require('./rows-to-data'),
	dataToColumns = require('./data-to-columns');

module.exports = function( image, rows ){
	image.glitch.rows = rows;
	image.glitch.data = rowsToData(image);
	image.glitch.columns = dataToColumns(image);
	return image;
};