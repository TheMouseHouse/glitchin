'use strict';

var _              = require('lodash'),
	Const          = require('../config/constants'),
	Utils          = require('../modules/utils'),
	OffsetInColumn = require('../modules/offset-in-column');

module.exports = function( image, offset ){
	if( _.isUndefined(image) ){
		console.log('Image is not defined in Offset Columns function.');
	}

	if( Utils.hasRgbParameter(offset, image.bitmap.height) ){
		console.log('Offsetting columns...');

		Utils.defineChannels(image);

		_.each(offset, function( value, key ){
			_.set(image[Const.CHANNELS], key, Utils.mapChannel(image.glitch.columns, key));

			if( _.includes(Const.POSSIBLE_CHANNELS, key) ){
				image = OffsetInColumn(image, key, value);
			}
		});

		Utils.deleteChannels(image);
	}

	return image;
}