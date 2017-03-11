'use strict';

var _          = require('lodash'),
	Channels   = require('../utils/channels'),
	Check      = require('../utils/checkers'),
	Parameters = require('../utils/parameters');

module.exports = {
	defineChannels:      Channels.defineChannels,
	deleteChannels:      Channels.deleteChannels,
	getChannel:          Channels.getChannel,
	mapChannel:          Channels.mapChannel,
	hasRgbParameter:     Parameters.hasRgbParameter,
	createRgbParameters: Parameters.createRgbParameters,
	check:               {
		image: Check.image
	}
};