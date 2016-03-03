(function(){
	'use strict';

	var _ = require('lodash');

	module.exports = function( image ){
		var width = image.glitch.width,
			height = image.glitch.height,
			rows = image.glitch.rows,
			xIndex = 0;

		image.glitch.columns = [];

		for(var i = 0; i < image.glitch.data.length; i++){
			var pixel = image.glitch.data[i];

			if( _.isUndefined(rows[xIndex]) ){
				rows[xIndex] = [];
			}

			rows[xIndex].push(pixel)

			if(i % height === 0 && i !== 0){
				xIndex++;
			}
		}

		return image;
	};

})();