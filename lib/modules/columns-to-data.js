(function(){
	'use strict';

	var _ = require('lodash');

	module.exports = function( image ){
		image.glitch.data = _.flatten(image.glitch.columns);
		return image;
	};

})();