(function(){
	'use strict';

	var _ = require('lodash'),
		Colors = require('colors'),
		OffsetInRow = require('../modules/offset-in-row.js'),
		Rows = require('../modules/rows.js');

	module.exports = function( image, offset ){
		if(_.isUndefined(image)){ console.log('Image is not defined in Offset function.'.red);}

		var hasOneParameter = false,
			possibleParameters = ['r', 'g', 'b'];

		if( _.isUndefined(offset) || _.size(offset) < 1){
			offset = {};
			_.each(_.sampleSize(possibleParameters, _.random(possibleParameters.length) + 1), function(parameter){
				offset[parameter] = _.random(image.bitmap.width);
			});
		}

		for(var p in possibleParameters){
			if( _.has(offset, possibleParameters[p])){
				hasOneParameter = true;
				break;
			}
		}

		if(hasOneParameter){
			console.log('Offsetting...');

			//_.set(image, 'lookup', _.clone(image.glitch.rows));
			_.set(image, 'lookup', {});

			_.each(offset, function(value, key){
				var key_lookup = _.map(image.glitch.rows, function(row){
					return _.map(row, function(pixel){
						return pixel[key];
					});
				});
				_.set(image.lookup, key, key_lookup);

				if(_.includes(possibleParameters, key)){
					image = OffsetInRow(image, key, value);
				}
			});

			_.unset(image, 'lookup');
		}

		return image;
	}

})();