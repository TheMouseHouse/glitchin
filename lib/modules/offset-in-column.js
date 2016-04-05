'use strict';

var _       = require('lodash'),
	Utils   = require('../modules/utils'),
	Columns = require('../modules/columns');

module.exports = function( image, keys, offset ){
	if( _.isUndefined(image) ){
		console.log('Image is not defined in Offset.module.');
	}

	var offsetValue,
		baseValue = image.bitmap.height;

	if( _.isNumber(offset) ){
		offset = ~~(Math.round(offset));
		if( offset > baseValue || offset < -baseValue ){
			offsetValue = offset % baseValue;
		} else {
			offsetValue = offset;
		}
	} else if( _.isUndefined(offset) ){
		offsetValue = _.random(baseValue);
	}

	if( !_.isFunction(offset) ){
		console.log('Offsetting', keys, 'in columns by', offsetValue, 'pixels...');
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

		if( pixelOffset >= baseValue ){
			pixelOffset -= baseValue;
		}

		if( pixelOffset < 0 ){
			pixelOffset += baseValue;
		}

		return pixelOffset;
	}

	var columns = [];
	_.each(image.glitch.columns, function( column, colIndex ){
		columns[colIndex] = [];

		if( _.isFunction(offset) ){
			offsetValue = offset(image, colIndex);
		}

		_.each(column, function( pixel, index ){
			var pixelOffset = getPixelOffset(index);
			columns[colIndex][index] = pixel;

			_.each(keys, function( k ){
				columns[colIndex][index][k] = Utils.getChannel(image, k)[colIndex][pixelOffset];
			});
		});
	});

	return Columns(image, columns);
};