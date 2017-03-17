'use strict';

var _ = require('lodash'),
    debug = require('debug'),
    error = debug('app:error');

function checkImage(image, parent) {

	var parentString = '';

	if (!_.isUndefined(parent)) {
		parentString = ' in ' + parent + ' function';
	}

	if (_.isUndefined(image)) {
		var errStr = 'Image is not defined' + parentString + '.';
		error(errStr);
		throw new Error(errStr);
	}
}

module.exports = {
	image: checkImage
};