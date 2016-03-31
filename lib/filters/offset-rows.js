'use strict';

var _           = require('lodash'),
	Const       = require('../config/constants'),
	Utils       = require('../modules/utils'),
	Message     = require('../utils/message'),
	OffsetInRow = require('../modules/offset-in-row');

module.exports = function( image, offset ){
	if( _.isUndefined(image) ){
		console.log('Image is not defined in Offset Rows function.');
	}
	if( Utils.hasRgbParameter(offset, image.bitmap.width) ){
		console.log('Offsetting rows...');

		Utils.defineChannels(image);

		_.each(offset, function( value, key ){
			_.set(image[Const.CHANNELS], key, Utils.mapChannel(image.glitch.rows, key));

			if( _.includes(Const.POSSIBLE_CHANNELS, key) ){
				image = OffsetInRow(image, key, value);
			}
		});

		Utils.deleteChannels(image);
	}

	return image;
}