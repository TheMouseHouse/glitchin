"use strict";
exports.__esModule = true;
var constants_1 = require("../config/constants");
var lodash_1 = require("lodash");
var Channels = (function () {
    function Channels() {
    }
    Channels.getChannel = function (glitch, key) {
        if (lodash_1.isNil(glitch)) {
            console.error('Unable to get channel from target: target undefined.');
            return [];
        }
        if (lodash_1.isNil(key)) {
            console.error('Unable to get channel from target: key undefined.');
            return [];
        }
        return glitch[constants_1["default"].CHANNELS][key];
    };
    Channels.mapChannel = function (arr, key) {
        return lodash_1.map(arr, function (column) {
            return lodash_1.map(column, function (pixel) {
                return pixel[key];
            });
        });
    };
    Channels.defineChannels = function (glitch) {
        lodash_1.set(glitch, constants_1["default"].CHANNELS, {});
    };
    Channels.deleteChannels = function (glitch) {
        lodash_1.unset(glitch, constants_1["default"].CHANNELS);
    };
    return Channels;
}());
exports["default"] = Channels;
