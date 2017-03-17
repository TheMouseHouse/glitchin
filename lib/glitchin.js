'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Glitchin = Glitchin;

require('babel-polyfill');

var _lodash = require('lodash');

var _jimp = require('jimp');

var _jimp2 = _interopRequireDefault(_jimp);

var _bluebird = require('bluebird');

var _loader = require('./modules/loader');

var _render = require('./modules/render');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Glitchin(layers, config) {
	var _this = this;

	if ((0, _lodash.isUndefined)(layers) || (0, _lodash.isUndefined)(config)) {
		return;
	}

	this.promises = [];
	this.layers = [];

	(0, _lodash.each)(layers, function (layer, index) {
		console.log('Loading', layer.file);

		_this.promises.push(new _bluebird.Promise(function (resolve, reject) {
			new _loader.Loader(layer).then(function (jimp) {
				_this.layers[index] = { params: layer, jimp: jimp };
				resolve();
			}).catch(function (error) {
				console.error(error);
				resolve(error);
			});
		}));
	});

	_bluebird.Promise.all(this.promises).then(function () {
		console.log('Compositing...');

		var bitmap = _this.layers[0].jimp.bitmap;
		var output = new _jimp2.default(bitmap.width, bitmap.height, function (error, image) {
			if (!(0, _lodash.isNull)(error)) {
				return;
			}
			(0, _lodash.each)(_this.layers.reverse(), function (layer) {
				if (layer.params.opacity > 0) {
					layer.jimp.opacity(layer.params.opacity / 100);
					image.composite(layer.jimp, 0, 0);
				}
			});
			(0, _render.Render)(image, config.output);
		});
	});
}