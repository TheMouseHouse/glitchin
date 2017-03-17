'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _channels = require('../utils/channels');

var _channels2 = _interopRequireDefault(_channels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Check = require('../utils/checkers'),
    Parameters = require('../utils/parameters');

exports.default = {
	defineChannels: _channels2.default.defineChannels,
	deleteChannels: _channels2.default.deleteChannels,
	getChannel: _channels2.default.getChannel,
	mapChannel: _channels2.default.mapChannel,
	hasRgbParameter: Parameters.hasRgbParameter,
	createRgbParameters: Parameters.createRgbParameters,
	check: {
		image: Check.image
	}
};