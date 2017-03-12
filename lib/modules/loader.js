'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Loader = undefined;

var _lodash = require('lodash');

var _bluebird = require('bluebird');

var _process = require('./process');

var _jimp = require('jimp');

var Jimp = _interopRequireWildcard(_jimp);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loader = exports.Loader = function Loader(file) {
	_classCallCheck(this, Loader);

	// each( opts, ( value, key ) => {
	// 	options[ key ] = value;
	// } );

	if ((0, _lodash.isUndefined)(file)) {
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

		return new _process.Process(image);
	}).catch(function (error) {
		return console.error;
	});
};

;