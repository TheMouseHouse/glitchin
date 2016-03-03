(function(){
	'use strict';

	var _ = require('lodash');

	function simpleRowSort(image){
		console.log('Simple row sort...');

		var sample = image.glitch.rows;

		_.each(sample, function(row, key){
			sample[key] = _.sortBy(row, ['hex']);
		});

		image.glitch.data = _.flatten(sample);
		return image;
	}

	module.exports = simpleRowSort;

})();