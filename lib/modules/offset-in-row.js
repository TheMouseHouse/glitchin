'use strict';

var _     = require('lodash'),
	Utils = require('../modules/utils'),
	Rows  = require('../modules/rows');

module.exports = function( image, keys, offset ){
	if( _.isUndefined(image) ){
		console.log('Image is not defined in Offset.module.');
	}

	var offsetValue,
		baseValue = image.bitmap.width;

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

		if( pixelOffset >= baseValue ){
			pixelOffset -= baseValue;
		}

		if( pixelOffset < 0 ){
			pixelOffset += baseValue;
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
				rows[rowIndex][index][k] = Utils.getChannel(image, k)[rowIndex][pixelOffset];
			});
		});
	});

	return Rows(image, rows);
};