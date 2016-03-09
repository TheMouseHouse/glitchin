(function(){
	'use strict';

	var _ = require('lodash');

	module.exports = function( image ){
		var width = image.glitch.width,
			columns = [];

		for(var i = 0; i < image.glitch.data.length; i++){
			var pixel = image.glitch.data[i],
				colIndex = i % width;

			if( _.isUndefined(columns[colIndex]) ){
				columns[colIndex] = [];
			}

			columns[colIndex].push(pixel);
		}

		return columns;
	};

})();