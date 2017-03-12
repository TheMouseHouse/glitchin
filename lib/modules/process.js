'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Process = Process;

var _lodash = require('lodash');

var _bluebird = require('bluebird');

var _pixel = require('./pixel');

function Process(image) {

	return new _bluebird.Promise(function (resolve, reject) {
		if ((0, _lodash.isUndefined)(image) || (0, _lodash.isNull)(image)) {
			reject();
		}

		var data = image.bitmap.data,
		    width = image.bitmap.width,
		    height = image.bitmap.height,
		    glitch = {
			image: image,
			data: [],
			rows: [],
			columns: [],
			width: width,
			height: height
		};

		image.scan(0, 0, width, height, function (x, y, idx) {
			var pixel = new _pixel.Pixel(x, y, idx, data);
			glitch.data.push(pixel);

			if ((0, _lodash.isUndefined)(glitch.rows[y])) {
				glitch.rows[y] = [];
			}

			if ((0, _lodash.isUndefined)(glitch.columns[x])) {
				glitch.columns[x] = [];
			}

			glitch.rows[y].push(pixel);
			glitch.columns[x].push(pixel);
		});

		image.glitch = glitch;

		resolve(image);
	}).catch(function (error) {
		return console.error;
	});
};