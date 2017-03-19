"use strict";
exports.__esModule = true;
var constants_1 = require("../config/constants");
var lodash_1 = require("lodash");
var Channels = (function () {
    function Channels() {
    }
    Channels.getChannel = function (target, key) {
        if (lodash_1.isUndefined(target) || lodash_1.isNull(target)) {
            console.error('Unable to get channel from target: target undefined.');
            return [];
        }
        if (lodash_1.isUndefined(key)) {
            console.error('Unable to get channel from target: key undefined.');
            return [];
        }
        return target[constants_1["default"].CHANNELS][key];
    };
    Channels.mapChannel = function (arr, key) {
        return lodash_1.map(arr, function (item) {
            return lodash_1.map(item, function (pixel) {
                return pixel[key];
            });
        });
    };
    Channels.defineChannels = function (target) {
        lodash_1.set(target, constants_1["default"].CHANNELS, {});
    };
    Channels.deleteChannels = function (target) {
        lodash_1.unset(target, constants_1["default"].CHANNELS);
    };
    return Channels;
}());
exports["default"] = Channels;
