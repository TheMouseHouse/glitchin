(function(){
	'use strict';

	var _ = require('lodash');

	module.exports = function( image, output ){
		console.log('Rendering:', output);

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
		image.write( output );
	};

})();