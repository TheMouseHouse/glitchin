'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Glitchin = undefined;

require('babel-polyfill');

var _lodash = require('lodash');

var _jimp = require('jimp');

var Jimp = _interopRequireWildcard(_jimp);

var _bluebird = require('bluebird');

var _loader = require('./modules/loader');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var Glitchin = exports.Glitchin = function Glitchin(config) {
	var _this = this;

	_classCallCheck(this, Glitchin);

	if ((0, _lodash.isUndefined)(config)) {
		return;
	}

	this.layers = [];

	(0, _lodash.each)(config, function (c) {
		console.log(c.file, c.opacity);

		_this.layers.push(new _bluebird.Promise(function (resolve, reject) {
			new _loader.Loader(c.file).then(function (image) {
				resolve(image);
			}).catch(function (error) {
				console.error(error);
				resolve(error);
			});
		}));
	});

	_bluebird.Promise.all(this.layers).then(function () {
		console.log('All done. Layers length: ', _this.layers.length);
		console.log(_this.layers[0]);
	});
};

// module.exports = Glitchin_;