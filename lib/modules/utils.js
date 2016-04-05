'use strict';

var _          = require('lodash'),
	Channels   = require('../utils/channels'),
	Check      = require('../utils/checkers'),
	Message    = require('../utils/message'),
	Parameters = require('../utils/parameters');

module.exports = {
	message:             Message,
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