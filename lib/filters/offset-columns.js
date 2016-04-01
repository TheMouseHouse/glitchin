'use strict';

var _              = require('lodash'),
	Const          = require('../config/constants'),
	Utils          = require('../modules/utils'),
	OffsetInColumn = require('../modules/offset-in-column');

module.exports = function( image, offset ){
	if( _.isUndefined(image) ){
		throw new Error('Image is not defined in Offset Columns function.');
	}

	if( Utils.hasRgbParameter(offset, image.bitmap.height) ){
		Utils.message('info', 'Offsetting columns...');

		try {
			Utils.defineChannels(image);

			_.each(offset, function( value, key ){
				_.set(image[Const.CHANNELS], key, Utils.mapChannel(image.glitch.columns, key));

				if( _.includes(Const.POSSIBLE_CHANNELS, key) ){
					image = OffsetInColumn(image, key, value);
				}
			});

			Utils.deleteChannels(image);
		} catch( e ){
			Utils.message('error', 'Error offsetting columns. Attempting to continue.', e);
		}
	}

	return image;
};