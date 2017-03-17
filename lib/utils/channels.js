'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Channels = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../config/constants');

var _constants2 = _interopRequireDefault(_constants);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Channels = exports.Channels = function () {
	function Channels() {
		_classCallCheck(this, Channels);
	}

	_createClass(Channels, null, [{
		key: 'getChannel',
		value: function getChannel(target, key) {
			if ((0, _lodash.isUndefined)(target) || (0, _lodash.isNull)(target)) {
				console.error('Unable to get channel from target: target undefined.');
				return [];
			}
			if ((0, _lodash.isUndefined)(key)) {
				console.error('Unable to get channel from target: key undefined.');
				return [];
			}

			return target[_constants2.default.CHANNELS][key];
		}
	}, {
		key: 'mapChannel',
		value: function mapChannel(arr, key) {
			return (0, _lodash.map)(arr, function (item) {
				return (0, _lodash.map)(item, function (pixel) {
					return pixel[key];
				});
			});
		}
	}, {
		key: 'defineChannels',
		value: function defineChannels(target) {
			(0, _lodash.set)(target, _constants2.default.CHANNELS, {});
		}
	}, {
		key: 'deleteChannels',
		value: function deleteChannels(target) {
			(0, _lodash.unset)(target, _constants2.default.CHANNELS);
		}
	}]);

	return Channels;
}();