'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Render = Render;

var _lodash = require('lodash');

var _bluebird = require('bluebird');

function Render(image, output) {
	console.log('Rendering...');

	var index = 0,
	    bitmap = image.bitmap.data,
	    glitch = null;

	if ((0, _lodash.has)(image, 'glitch')) {
		glitch = image.glitch.data;
	}

	if (!(0, _lodash.isNull)(glitch)) {
		(0, _lodash.each)(glitch, function (pixel) {
			bitmap[index] = pixel.r;
			bitmap[index + 1] = pixel.g;
			bitmap[index + 2] = pixel.b;
			bitmap[index + 3] = pixel.a;
			index += 4;
		});
	}

	if (output !== 'base64') {
		image.write(output);
	} else {
		return new _bluebird.Promise(function (resolve, reject) {
			if ((0, _lodash.isUndefined)(image) || (0, _lodash.isNull)(image)) {
				reject();
			}

			image.getBuffer(image.bitmap.mime, function (err, buffer) {
				if (!(0, _lodash.isNull)(err)) {
					resolve(err);
				} else {
					resolve(buffer.toString('base64'));
				}
				buffer = null;
				image = null;
				bitmap = null;
			});
		}).catch(function (error) {
			return console.error;
		});
	}
};