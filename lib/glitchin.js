(function(){
	'use strict';

	var _ = require('lodash'),
		Fs = require('fs'),
		Path = require('path'),
		mkdirp = require('mkdirp'),
		Colors = require('colors'),
		options = require('./options.js').get(),
		Promise = require('bluebird'),
		Jimp = require('jimp'),
		Pixel = require('./modules/pixel.js');

	function onError( e ){
		throw e;
	}

	function processBuffer( image ){
		return new Promise(function( resolve, reject ){
			if( _.isUndefined(image) || _.isNull(image) ){
				reject();
			}

			var data = image.bitmap.data,
				width = image.bitmap.width,
				height = image.bitmap.height,

				input = {
					image: image,
					data: [],
					rows: [],
					columns: [],
					width: width,
					height: height
				};

			image.scan(0, 0, width, height, function(x, y, idx){
				var pixel = new Pixel(x, y, idx, data);
				input.data.push(pixel);

				if(_.isUndefined(input.rows[y])){
					input.rows[y] = [];
				}

				if(_.isUndefined(input.columns[x])){
					input.columns[x] = [];
				}

				input.rows[y].push(pixel);
				input.columns[x].push(pixel);
			});

			resolve(input);
		});

	}

	function Glitchin( opts ){
		_.each(opts, function( value, key ){
			options[key] = value;
		});

		var promise = Jimp.read(options.source).then(processBuffer).catch(onError);

		var returnObj = {
			data: {},
			render:     function(output, callback){
				return require('./modules/render')(promise, output, callback);
			},
			simpleSort: function(){
				return require('./filters/simple-sort')(promise, returnObj);
			},
			sort:       function( customFunction ){
				return require('./filters/sort')(promise, returnObj, customFunction);
			}
		};

		return returnObj;
	}

	module.exports = Glitchin;
})();