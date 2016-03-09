(function(){
	'use strict';

	var _ = require('lodash'),
		columnsToData = require('columns-to-data.js'),
		dataToRows = require('data-to-rows.js');

	module.exports = function( image, columns ){
		image.glitch.columns = columns;
		image.glitch.data = columnsToData(image);
		image.glitch.rows = dataToRows(image);
		return image;
	};

})();