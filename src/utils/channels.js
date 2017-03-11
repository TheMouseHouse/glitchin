'use strict';

var _     = require('lodash'),
	Const = require('../config/constants'),
	debug = require('debug'),
	error = debug('app:error');

function getChannel( target, key ){
	if( _.isUndefined(target) || _.isNull(target) ){
		error('Unable to get channel from target: target undefined.');
		return [];
	}
	if( _.isUndefined(key) ){
		error('Unable to get channel from target: key undefined.');
		return [];
	}

	return target[Const.CHANNELS][key];
}

function mapChannel( arr, key ){
	return _.map(arr, function( item ){
		return _.map(item, function( pixel ){
			return pixel[key];
		});
	});
}

function defineChannels( target ){
	_.set(target, Const.CHANNELS, {});
}

function deleteChannels( target ){
	_.unset(target, Const.CHANNELS);
}

module.exports = {
	defineChannels: defineChannels,
	deleteChannels: deleteChannels,
	getChannel:     getChannel,
	mapChannel:     mapChannel
};