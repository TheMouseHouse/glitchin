'use strict';

var _             = require('lodash'),
	columnsToData = require('../modules/columns-to-data'),
	dataToRows    = require('../modules/data-to-rows');

module.exports = function( image, columns ){
	image.glitch.columns = columns;
	image.glitch.data = columnsToData(image);
	image.glitch.rows = dataToRows(image);
	return image;
};