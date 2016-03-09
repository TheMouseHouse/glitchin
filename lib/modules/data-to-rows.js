(function(){
	'use strict';

	var _ = require('lodash');

	module.exports = function( image ){
		var width = image.glitch.width,
			yIndex = 0,
			rows = [];

		for(var i = 0; i < image.glitch.data.length; i++){
			var pixel = image.glitch.data[i];

			if( _.isUndefined(rows[yIndex]) ){
				rows[yIndex] = [];
			}

			rows[yIndex].push(pixel)

			if(i % width === 0 && i !== 0){
				yIndex++;
			}
		}

		return rows;
	};

})();