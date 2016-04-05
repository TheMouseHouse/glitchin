'use strict';

var _           = require('lodash'),
	Const       = require('../config/constants'),
	Utils       = require('../modules/utils'),
	OffsetInRow = require('../modules/offset-in-row');

module.exports = function( image, offset ){
	Utils.check.image(image, 'Offset Rows');

	if( !Utils.hasRgbParameter(offset, image.bitmap.width) ){
		offset = Utils.createRgbParameters();
	}

	Utils.message('info', 'Offsetting rows...');

	try {
		Utils.defineChannels(image);

		_.each(offset, function( value, key ){
			_.set(image[Const.CHANNELS], key, Utils.mapChannel(image.glitch.rows, key));

			if( _.includes(Const.POSSIBLE_CHANNELS, key) ){
				image = OffsetInRow(image, key, value);
			}
		});

		Utils.deleteChannels(image);
	} catch( e ){
		Utils.message('error', 'Error offsetting rows. Attempting to continue.', e);
	}

	return image;
};