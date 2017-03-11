'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Glitchin = Glitchin;

var _lodash = require('lodash');

var _options = require('./options');

var _jimp = require('jimp');

var Jimp = _interopRequireWildcard(_jimp);

var _pixel = require('./modules/pixel');

var _bluebird = require('bluebird');

var _render = require('./modules/render');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function makeAPI(image) {
	image.render = function (output) {
		// return require( './modules/render' )( image, output );
		return render(image, output);
	};

	// image.rows = function ( rows ) {
	// 	return require( './modules/rows' )( image, rows );
	// };

	// image.columns = function ( columns ) {
	// 	return require( './modules/columns' )( image, columns );
	// };

	// image.dataToRows = function () {
	// 	return require( './modules/data-to-rows' )( image );
	// };

	// image.dataToColumns = function () {
	// 	return require( './modules/data-to-columns' )( image );
	// };

	// image.rowsToData = function () {
	// 	return require( './modules/rows-to-data' )( image );
	// };

	// image.columnsToData = function () {
	// 	return require( './modules/columns-to-data' )( image );
	// };

	// image.simpleRowSort = function () {
	// 	return require( './filters/simple-sort-row' )( image );
	// };

	// image.simpleColumnSort = function () {
	// 	return require( './filters/simple-sort-column' )( image );
	// };

	// image.offsetRows = function ( offset ) {
	// 	return require( './filters/offset-rows' )( image, offset );
	// };

	// image.offsetColumns = function ( offset ) {
	// 	return require( './filters/offset-columns' )( image, offset );
	// };

	// image.custom = function ( customSortFunc ) {
	// 	return customSortFunc( image );
	// };

	return image;
}

function processBuffer(image) {
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

		image.render = function (output) {
			return (0, _render.Render)(image, output);
		};

		resolve(image);
	}).catch(function (error) {
		return console.error;
	});
}

function Glitchin(file, opts) {
	(0, _lodash.each)(opts, function (value, key) {
		_options.options[key] = value;
	});

	return Jimp.read(file).then(function (image) {
		var mime = void 0;

		try {
			var ext = file.substr(-4, 4);

			if (ext === '.jpg' || ext === 'jpeg') {
				mime = Jimp.MIME_JPEG;
			} else if (ext === '.png') {
				mime = Jimp.MIME_PNG;
			} else if (ext === '.bmp') {
				mime = Jimp.MIME_BMP;
			}
		} catch (e) {
			mime = _options.options.mime;
		} finally {
			image.bitmap.mime = mime;
		}

		return processBuffer(image);
	}).catch(function (error) {
		return console.error;
	});
}

module.exports = Glitchin;