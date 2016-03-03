(function(){
	'use strict';

	var _ = require('lodash');

	function simpleColumnSort(image){
		console.log('Simple column sort...');

		var columns = image.glitch.columns,
			rows = image.glitch.rows;

		_.each(columns, function(col, key){
			col = _.sortBy(col, ['hex']);
			_.each(col, function(pixel, y){
				rows[y][key] = pixel;
			});
		});

		image.glitch.data = _.flatten(rows);
		return image;
	}

	module.exports = simpleColumnSort;

})();