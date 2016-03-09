(function(){
	'use strict';

	var _ = require('lodash'),
		rowsToData = require('./rows-to-data.js'),
		dataToColumns = require('./data-to-columns.js');

	module.exports = function( image, rows ){
		image.glitch.rows = rows;
		image.glitch.data = rowsToData(image);
		image.glitch.columns = dataToColumns(image);
		return image;
	};

})();