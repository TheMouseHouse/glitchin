'use strict';

var _           = require('lodash'),
	Const       = require('../config/constants'),
	Utils       = require('../modules/utils'),
	OffsetInRow = require('../modules/offset-in-row'),
	debug       = require('debug')('filter/offset-rows');

module.exports = function( image, offset ){
	Utils.check.image(image, 'Offset Rows');

	var offsetValues = {};

	if( !_.isFunction(offset) ){
		if( !Utils.hasRgbParameter(offset, image.bitmap.width) ){
			offsetValues = Utils.createRgbParameters();
		} else {
			offsetValues = offset;
		}
	}

	debug('info', 'Offsetting rows...');

	try {
		Utils.defineChannels(image);

		if( !_.isFunction(offset) ){
			_.each(offsetValues, function( value, key ){
				_.set(image[Const.CHANNELS], key, Utils.mapChannel(image.glitch.rows, key));

				if( _.includes(Const.POSSIBLE_CHANNELS, key) ){
					image = OffsetInRow(image, key, value);
				}
			});
		}

		Utils.deleteChannels(image);
	} catch( e ){
		debug('Error offsetting rows. Attempting to continue. ' + e);
	}

	return image;
};