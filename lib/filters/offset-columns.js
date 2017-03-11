'use strict';

var _ = require('lodash'),
    Const = require('../config/constants'),
    Utils = require('../modules/utils'),
    OffsetInColumn = require('../modules/offset-in-column'),
    debug = require('debug')('filter/offset-columns');

module.exports = function (image, offset) {
	Utils.check.image(image, 'Offset Columns');

	if (!Utils.hasRgbParameter(offset, image.bitmap.height)) {
		offset = Utils.createRgbParameters();
	}

	debug('Offsetting columns...');

	try {
		Utils.defineChannels(image);

		_.each(offset, function (value, key) {
			_.set(image[Const.CHANNELS], key, Utils.mapChannel(image.glitch.columns, key));

			if (_.includes(Const.POSSIBLE_CHANNELS, key)) {
				image = OffsetInColumn(image, key, value);
			}
		});

		Utils.deleteChannels(image);
	} catch (e) {
		debug('Error offsetting columns. Attempting to continue. ' + e);
	}

	return image;
};