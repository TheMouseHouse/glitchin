'use strict';

var _       = require('lodash'),
	Const   = require('../config/constants'),
	debug = require('debug')('utils/parameters');

function createRgbParameters( range ){
	debug('Creating random parameters...');

	var possibleParameters = Const.POSSIBLE_CHANNELS,
		randomRange = (_.isUndefined(range) || !_.isNumber(range)) ? _.random(100) : _.random(range),
		offset = {};

	if( _.isUndefined(offset) || _.size(offset) < 1 ){
		var sampleLength = _.random(possibleParameters.length - 1);
		if( sampleLength <= 0){
			sampleLength = 1
		}
		_.each(_.sampleSize(possibleParameters, sampleLength), function( parameter ){
			offset[parameter] = randomRange;
		});
	}

	return offset;
}

function hasRgbParameter( offset ){
	var possibleParameters = Const.POSSIBLE_CHANNELS;

	for( var p in possibleParameters ){
		if( _.has(offset, possibleParameters[p]) ){
			return true;
		}
	}

	return false;
}

module.exports = {
	createRgbParameters: createRgbParameters,
	hasRgbParameter:     hasRgbParameter
};