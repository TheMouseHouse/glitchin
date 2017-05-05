"use strict";
exports.__esModule = true;
var constants_1 = require("../config/constants");
var lodash_1 = require("lodash");
var Channels = (function () {
    function Channels() {
    }
    Channels.getChannel = function (glitch, channel) {
        var message = {
            method: 'Channels#getChannel()',
            glitch: '- Glitch undefined',
            channel: '- Unable to get channel from glitch: channel undefined or not "r", "g", "b" nor "a"... Was:',
            tail: 'Returning empty array []'
        };
        if (lodash_1.isNil(glitch)) {
            console.error(message.method, message.glitch, message.tail);
            return [];
        }
        if (lodash_1.isNil(channel) || constants_1["default"].POSSIBLE_CHANNELS.indexOf(channel) === -1) {
            console.error(message.method, message.channel, channel, '.', message.tail);
            return [];
        }
        return glitch[constants_1["default"].CHANNELS][channel];
    };
    Channels.mapChannel = function (arr, channel) {
        if (constants_1["default"].POSSIBLE_CHANNELS.indexOf(channel) === -1) {
            return [];
        }
        return lodash_1.map(arr, function (column) {
            return lodash_1.map(column, function (pixel) {
                return pixel[channel];
            });
        });
    };
    Channels.defineChannels = function (glitch) {
        if (lodash_1.isNil(glitch)) {
            return;
        }
        lodash_1.set(glitch, constants_1["default"].CHANNELS, {});
    };
    Channels.deleteChannels = function (glitch) {
        if (lodash_1.isNil(glitch)) {
            return;
        }
        lodash_1.unset(glitch, constants_1["default"].CHANNELS);
    };
    return Channels;
}());
exports["default"] = Channels;
