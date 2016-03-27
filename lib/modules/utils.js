(function(){
	'use strict';

	var _ = require('lodash'),
		Const = require('../config/constants');

	function getChannel( target, key ){
		if( _.isUndefined(target) || _.isNull(target) ){
			console.log('Unable to get channel from target: target undefined.');
			return [];
		}
		if( _.isUndefined(key) ){
			console.log('Unable to get channel from target: key undefined.');
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

})();