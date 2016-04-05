'use strict';

var _     = require('lodash'),
	Utils = require('../modules/utils');

function checkImage( image, parent ){

	var parentString = '';

	if( !_.isUndefined(parent) ){
		parentString = ' in ' + parent + ' function';
	}

	if( _.isUndefined(image) ){
		throw new Error('Image is not defined' + parentString + '.');
	}
}

module.exports = {
	image: checkImage
};