(function(){
	'use strict';

	var _ = require('lodash'),
		ShiftInRow = require('../modules/shift-in-row.js'),
		Rows = require('../modules/rows.js');

	module.exports = function( image, offset, randomize ){
		return ShiftInRow(image, 'r', offset);
	}

})();