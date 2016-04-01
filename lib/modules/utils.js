'use strict';

var _        = require('lodash'),
	Const    = require('../config/constants'),
	Channels = require('../utils/channels'),
	Message  = require('../utils/message');

function hasRgbParameter( offset, range ){
	var possibleParameters = Const.POSSIBLE_CHANNELS,
		randomRange = (_.isUndefined(range) || !_.isNumber(range)) ? _.random(100) : _.random(range);

	if( _.isUndefined(offset) || _.size(offset) < 1 ){
		offset = {};
		_.each(_.sampleSize(possibleParameters, _.random(possibleParameters.length) + 1), function( parameter ){
			offset[parameter] = randomRange;
		});
	}

	for( var p in possibleParameters ){
		if( _.has(offset, possibleParameters[p]) ){
			return true;
		}
	}

	return false;
}

module.exports = {
	message:         Message,
	defineChannels:  Channels.defineChannels,
	deleteChannels:  Channels.deleteChannels,
	getChannel:      Channels.getChannel,
	mapChannel:      Channels.mapChannel,
	hasRgbParameter: hasRgbParameter
};