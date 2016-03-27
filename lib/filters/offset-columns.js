(function(){
	'use strict';

	var _ = require('lodash'),
		Const = require('../config/constants'),
		Utils = require('../modules/utils'),
		OffsetInColumn = require('../modules/offset-in-column.js');

	module.exports = function( image, offset ){
		if(_.isUndefined(image)){ console.log('Image is not defined in Offset Columns function.');}

		var hasOneParameter = false,
			possibleParameters = ['r', 'g', 'b'];

		if( _.isUndefined(offset) || _.size(offset) < 1){
			offset = {};
			_.each(_.sampleSize(possibleParameters, _.random(possibleParameters.length) + 1), function(parameter){
				offset[parameter] = _.random(image.bitmap.height);
			});
		}

		for(var p in possibleParameters){
			if( _.has(offset, possibleParameters[p])){
				hasOneParameter = true;
				break;
			}
		}

		if(hasOneParameter){
			console.log('Offsetting columns...');

			Utils.defineChannels(image);

			_.each(offset, function(value, key){
				_.set(image[Const.CHANNELS], key, Utils.mapChannel(image.glitch.columns, key));

				if(_.includes(possibleParameters, key)){
					image = OffsetInColumn(image, key, value);
				}
			});

			Utils.deleteChannels(image);
		}

		return image;
	}

})();