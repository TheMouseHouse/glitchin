'use strict';

var _ = require('lodash'),
	Promise = require('bluebird'),
	Message = require('../modules/utils').message;

module.exports = function( image, output ){
	Message('log', 'Rendering:', output);

	var index = 0,
		glitch = image.glitch.data,
		bitmap = image.bitmap.data;

	_.each(glitch, function( pixel ){
		bitmap[index] = pixel.r;
		bitmap[index + 1] = pixel.g;
		bitmap[index + 2] = pixel.b;
		bitmap[index + 3] = pixel.a;
		index += 4;
	});

	if(output !== 'base64'){
		image.write(output);
	} else {
		return new Promise(function( resolve, reject ){
			if( _.isUndefined(image) || _.isNull(image) ){
				reject();
			}

			image.getBuffer(image.bitmap.mime, function(err, buffer){
				resolve(buffer.toString('base64'));
			});
		});
	}

	Message('log', '');
};