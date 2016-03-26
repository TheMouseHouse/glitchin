(function(){
	'use strict';

	var _ = require('lodash'),
		Rows = require('../modules/rows.js');

	module.exports = function( image, keys, offset ){
		if( _.isUndefined(image) ){
			console.log('Image is not defined in Offset.module.');
		}

		var offsetValue;

		if( _.isNumber(offset) ){
			offset = ~~(Math.round(offset));
			if( offset > image.bitmap.width || offset < -image.bitmap.width ){
				offsetValue = offset % image.bitmap.width;
			} else {
				offsetValue = offset;
			}
		} else if( _.isUndefined(offset) ){
			offsetValue = _.random(image.bitmap.width);
		}

		if( !_.isFunction(offset) ){
			console.log('Offsetting', keys, 'in rows by', offsetValue, 'pixels...');
		}

		if( _.isUndefined(keys) ){
			return image;
		}

		if( _.isString(keys) ){
			keys = [keys];
		} else if( !_.isArray(keys) ){
			return image;
		}

		function getPixelOffset( index ){
			var pixelOffset = -offsetValue + index;

			if( pixelOffset >= image.bitmap.width ){
				pixelOffset -= image.bitmap.width;
			}

			if( pixelOffset < 0 ){
				pixelOffset += image.bitmap.width;
			}

			return pixelOffset;
		}

		var rows = [];
		_.each(image.glitch.rows, function( row, rowIndex ){
			rows[rowIndex] = [];

			if( _.isFunction(offset) ){
				offsetValue = offset(image, rowIndex);
			}

			_.each(row, function( pixel, index ){
				var pixelOffset = getPixelOffset(index);
				rows[rowIndex][index] = pixel;

				_.each(keys, function( k ){
					rows[rowIndex][index][k] = image.lookup[k][rowIndex][pixelOffset];
				});
			});
		});

		return Rows(image, rows);
	};

})();