'use strict';

var _             = require('lodash'),
	rowsToData    = require('./rows-to-data'),
	dataToColumns = require('./data-to-columns');

module.exports = function( image, rows ){
	if( _.isUndefined(image) || _.isNull(image) ){
		throw new Error('modules/rows: image undefined');
	}
	if( _.isUndefined(rows) || _.isNull(rows) ){
		throw new Error('modules/rows: rows undefined');
	}

	image.glitch.rows = rows;
	image.glitch.data = rowsToData(image);
	image.glitch.columns = dataToColumns(image);

	return image;
};