'use strict';

var _ = require('lodash'),
	Promise = require('bluebird'),
	debug   = require('debug')('modules/render');

module.exports = function( image, output ){
	debug('Rendering: ' + output);

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

	function destory(){
		image = null;
		bitmap = null;
	}

	if(output !== 'base64'){
		image.write(output);

	} else {
		return new Promise(function( resolve, reject ){
			if( _.isUndefined(image) || _.isNull(image) ){
				reject();
			}

			image.getBuffer(image.bitmap.mime, function(err, buffer){
				if( !_.isNull(err)){
					resolve(err);
				} else {
					resolve(buffer.toString('base64'));
				}
				buffer = null;
				destory();
			});
		});
	}
};