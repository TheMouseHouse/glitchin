(function(){

	'use strict';

	function options(){
		var Path = require('path'),
			cwd = process.cwd();

		var opts = require('nomnom')
		.option('source', {
			default: cwd,
			help:    'Source directory'
		})
		.option('dest', {
			default: 'output',
			help:    'Output directory'
		})
		.parse();

		return opts;
	}

	exports.get = options;

})();