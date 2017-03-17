'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Effects = undefined;

var _lodash = require('lodash');

var _bluebird = require('bluebird');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Effects = exports.Effects = function Effects(layer) {
	_classCallCheck(this, Effects);

	if ((0, _lodash.isUndefined)(layer)) {
		return;
	}

	return Jimp.read(file).then(function (image) {
		var mime = void 0;

		try {
			var _ext = file.substr(-4, 4);

			if (_ext === '.jpg' || _ext === 'jpeg') {
				mime = Jimp.MIME_JPEG;
			} else if (_ext === '.png') {
				mime = Jimp.MIME_PNG;
			} else if (_ext === '.bmp') {
				mime = Jimp.MIME_BMP;
			}

			image.bitmap.mime = mime;
		} catch (e) {
			throw 'File type not supported - ' + ext;
		}

		return Process(image);
	}).catch(function (error) {
		return console.error;
	});
};

;