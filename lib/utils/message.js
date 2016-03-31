(function(){
	'use strict';

	var _ = require('lodash'),
		Colors = require('colors');

	function Logger(){
		return JSON.stringify(arguments);
	}

	function error(){
		console.error(Logger(arguments).red);
	}

	function log(){
		console.log(Logger(arguments).green);
	}

	function info(){
		console.info(Logger(arguments).blue);
	}

	module.exports = {
		error: error,
		log:   log,
		info:  info
	}

})();