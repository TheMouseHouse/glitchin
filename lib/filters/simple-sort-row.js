(function(){
	'use strict';

	var _ = require('lodash'),
		Rows = require('../modules/rows.js');

	module.exports = function (image){
		console.log('Simple row sort...');

		var sample = _.clone(image.glitch.rows);

		_.each(sample, function(row, key){
			sample[key] = _.sortBy(row, ['hex']);
		});

		return Rows(image, sample);
	};

})();