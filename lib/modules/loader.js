'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Loader = undefined;

var _lodash = require('lodash');

var _bluebird = require('bluebird');

var _process = require('./process');

var _jimp = require('jimp');

var _jimp2 = _interopRequireDefault(_jimp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loader = exports.Loader = function Loader(layer) {
	_classCallCheck(this, Loader);

	if ((0, _lodash.isUndefined)(layer) || (0, _lodash.isUndefined)(layer.file)) {
		return;
	}

	return _jimp2.default.read(layer.file).then(function (image) {
		var mime = void 0;

		try {
			var _ext = layer.file.substr(-4, 4);

			if (_ext === '.jpg' || _ext === 'jpeg') {
				mime = _jimp2.default.MIME_JPEG;
			} else if (_ext === '.png') {
				mime = _jimp2.default.MIME_PNG;
			} else if (_ext === '.bmp') {
				mime = _jimp2.default.MIME_BMP;
			}

			image.bitmap.mime = mime;
		} catch (e) {
			throw 'File type not supported - ' + ext;
		}

		return (0, _process.Process)(image, layer.effects);
	}).catch(function (error) {
		return console.error;
	});
};

;