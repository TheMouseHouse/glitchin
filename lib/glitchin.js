(function(){
	'use strict';

	var _ = require('lodash'),
		Fs = require('fs'),
		Path = require('path'),
		mkdirp = require('mkdirp'),
		Colors = require('colors'),
		options = require('./options.js').get(),
		Promise = require('bluebird'),
		Jimp = require('jimp');

	function onError( e ){
		throw e;
	}

	function Pixel( x, y, idx, data ){
		return {
			x:   x,
			y:   y,
			idx: idx,
			r:   data[idx],
			g:   data[idx + 1],
			b:   data[idx + 2],
			a:   data[idx + 3]
		}
	}

	function processBuffer( image ){
		return new Promise(function( resolve, reject ){
			if( _.isUndefined(image) || _.isNull(image) ){
				reject();
			}

			var temp = {
				data:    image.bitmap.data,
				width:   image.bitmap.width,
				height:  image.bitmap.height,
				rows:    [],
				columns: []
			};

			image.scan(0, 0, image.bitmap.width, image.bitmap.height, function( x, y, idx ){
				if( _.isUndefined(temp.rows[y]) ){
					temp.rows[y] = [];
				}

				if( _.isUndefined(temp.columns[x]) ){
					temp.columns[x] = [];
				}

				temp.rows[y][x] = new Pixel(x, y, idx, this.bitmap.data);
				temp.columns[x][y] = new Pixel(x, y, idx, this.bitmap.data);
			});

			resolve(temp);
		});

	}

	function Glitchin( opts ){
		_.each(opts, function( value, key ){
			options[key] = value;
		});

		var promise = Jimp.read(options.source).then(processBuffer).catch(onError);

		var returnObj = {
			simpleSort: function(){
				return require('./modules/simple-sort')(promise, returnObj);
			},
			sort:       function( customFunction ){
				return require('./modules/sort')(promise, returnObj, customFunction);
			}
		};

		return returnObj;
	}

	module.exports = Glitchin;
})();