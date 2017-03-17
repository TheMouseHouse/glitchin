'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.OffsetRgbCols = OffsetRgbCols;

var _lodash = require('lodash');

var _constants = require('../config/constants');

var _constants2 = _interopRequireDefault(_constants);

var _utils = require('../modules/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OffsetInColumn = require('../modules/offset-in-column'),
    debug = require('debug')('filter/offset-columns');

function OffsetRgbCols(image, offset) {
	_utils2.default.check.image(image, 'Offset Columns');

	if (!_utils2.default.hasRgbParameter(offset, image.bitmap.height)) {
		offset = _utils2.default.createRgbParameters();
	}

	try {
		_utils2.default.defineChannels(image);

		(0, _lodash.each)(offset, function (value, key) {
			(0, _lodash.set)(image[_constants2.default.CHANNELS], key, _utils2.default.mapChannel(image.glitch.columns, key));

			if ((0, _lodash.includes)(_constants2.default.POSSIBLE_CHANNELS, key)) {
				image = OffsetInColumn(image, key, value);
			}
		});

		_utils2.default.deleteChannels(image);
	} catch (e) {
		debug('Error offsetting columns. Attempting to continue. ' + e);
	}

	return image;
};