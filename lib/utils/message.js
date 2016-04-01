'use strict';

var _ = require('lodash'),
	Colors = require('colors');

module.exports = function( type, message, extras ){
	switch(type){
		case 'log':
		case 'info':
			message = message.cyan;
			break;

		case 'warn':
			message = message.yellow;
			break;

		case 'error':
			message = message.underline.red;
			break;

		default:
			message = message.white;
	}

	if( !_.isUndefined(extras) ){
		console[type](message, extras);
	} else {
		console[type](message);
	}
};