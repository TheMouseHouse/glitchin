"use strict";
exports.__esModule = true;
var channels_1 = require("../utils/channels");
var parameters_1 = require("../utils/parameters");
var Utils = (function () {
    function Utils() {
    }
    Utils.getPixelOffset = function (index, offsetValue, baseValue) {
        var pixelOffset = -offsetValue + index;
        if (pixelOffset >= baseValue) {
            pixelOffset -= baseValue;
        }
        if (pixelOffset < 0) {
            pixelOffset += baseValue;
        }
        return pixelOffset;
    };
    return Utils;
}());
Utils.defineChannels = channels_1["default"].defineChannels;
Utils.deleteChannels = channels_1["default"].deleteChannels;
Utils.getChannel = channels_1["default"].getChannel;
Utils.mapChannel = channels_1["default"].mapChannel;
Utils.hasRgbParameter = parameters_1["default"].hasRgbParameter;
Utils.createRgbParameters = parameters_1["default"].createRgbParameters;
exports["default"] = Utils;
