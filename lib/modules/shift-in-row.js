(function(){
	'use strict';

	var _ = require('lodash'),
		Rows = require('../modules/rows.js');

	module.exports = function( image, keys, offset ){
		console.log('Shifting', keys, 'in rows by', offset, 'pixels...');

		if( _.isUndefined(keys)){
			return image;
		}

		var lookup = _.clone(image.glitch.rows);

		if(_.isString(keys)){
			keys = [keys];
		} else if(!_.isArray(keys)){
			return image;
		}

		if( _.isUndefined(offset)){
			offset = Math.floor(Math.random() * image.bitmap.width);
		}

		if(offset > image.bitmap.width){
			offset = offset % image.bitmap.width;
		}

		function getPixelOffset(index){
			var pixelOffset = offset + index;

			if(pixelOffset >= image.bitmap.width){
				pixelOffset -= image.bitmap.width;
			}

			if(pixelOffset < 0){
				pixelOffset += image.bitmap.width;
			}

			return pixelOffset;
		}

		var rows = [];
		_.each(image.glitch.rows, function(row, rowIndex){
			rows[rowIndex] = [];

			_.each(row, function(pixel, index){
				var pixelOffset = getPixelOffset(index);
				rows[rowIndex][index] = pixel;
				_.each(keys, function(k){
					rows[rowIndex][index][k] = lookup[rowIndex][pixelOffset][k];
				});
			});
		});

		return Rows(image, rows);
	};

})();