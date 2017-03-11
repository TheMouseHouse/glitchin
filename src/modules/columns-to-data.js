'use strict';

var _             = require('lodash'),
	ColumnsToRows = require('../modules/columns-to-rows');

module.exports = function( image ){
	return _.flatten(ColumnsToRows(image));
};