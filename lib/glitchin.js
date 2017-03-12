'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Glitchin = undefined;

require('babel-polyfill');

var _lodash = require('lodash');

var _jimp = require('jimp');

var _jimp2 = _interopRequireDefault(_jimp);

var _bluebird = require('bluebird');

var _loader = require('./modules/loader');

var _render = require('./modules/render');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Glitchin = exports.Glitchin = function Glitchin(layers, config) {
	var _this = this;

	_classCallCheck(this, Glitchin);

	if ((0, _lodash.isUndefined)(layers) || (0, _lodash.isUndefined)(config)) {
		return;
	}

	this.promises = [];
	this.layers = [];

	(0, _lodash.each)(layers, function (layer, index) {
		if (layer.opacity > 0) {
			_this.promises.push(new _bluebird.Promise(function (resolve, reject) {
				new _loader.Loader(layer.file).then(function (jimp) {
					_this.layers[index] = { params: layer, jimp: jimp };
					resolve();
				}).catch(function (error) {
					console.error(error);
					resolve(error);
				});
			}));
		}
	});

	_bluebird.Promise.all(this.layers).then(function () {
		console.log('Images loaded. Glitching...');
		_bluebird.Promise.all(_this.promises, function () {
			var output = new _jimp2.default(_this.layers[0].bitmap.width, _this.layers[0].bitmap.height, function (error, image) {
				if (!!error) {
					return;
				}
				(0, _lodash.each)(_this.layers.reverse(), function (layer) {
					image.opacity(layer.layer.opacity / 100);
					image.composite(layer.bitmap, 0, 0);
				});
				(0, _render.Render)(image, config.output);
			});
		});
	});
};