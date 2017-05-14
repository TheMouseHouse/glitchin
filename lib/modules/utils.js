"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var channels_1 = require("../utils/channels");
var parameters_1 = require("../utils/parameters");
var Utils = (function () {
    function Utils() {
    }
    Utils.getIndexOffset = function (index, offset, size) {
        if (lodash_1.isNil(index) || lodash_1.isNil(offset) || lodash_1.isNil(size) || size === 0) {
            return 0;
        }
        var actualIndex = index + (offset % size);
        if (actualIndex < 0) {
            actualIndex += size;
        }
        if (actualIndex >= size) {
            actualIndex -= size;
        }
        return actualIndex;
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
