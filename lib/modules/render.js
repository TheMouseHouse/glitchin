(function(){
	'use strict';

	var _ = require('lodash');

	function render( promise, output, callback ){
		promise.then(function( data ){
			var index = 0;

			_.each(data, function( pixel ){
				data.image.bitmap.data[index] = pixel.r;
				data.image.bitmap.data[index + 1] = pixel.g;
				data.image.bitmap.data[index + 2] = pixel.b;
				data.image.bitmap.data[index + 3] = pixel.a;
				index += 4;
			});
			data.image.write( output );

			(callback && callback(output));
		});
	}

	module.exports = render;

})();