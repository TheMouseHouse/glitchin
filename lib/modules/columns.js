'use strict';

var _             = require('lodash'),
	columnsToData = require('../modules/columns-to-data'),
	dataToRows    = require('../modules/data-to-rows');

module.exports = function( image, columns ){
	if( _.isUndefined(image) || _.isNull(image) ){
		throw new Error('modules/columns: image undefined');
	}
	if( _.isUndefined(columns) || _.isNull(columns) ){
		throw new Error('modules/columns: columns undefined');
	}

	image.glitch.columns = columns;
	image.glitch.data = columnsToData(image);
	image.glitch.rows = dataToRows(image);

	return image;
};