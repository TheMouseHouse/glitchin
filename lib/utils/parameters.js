"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var constants_1 = require("../config/constants");
var Parameters = (function () {
    function Parameters() {
    }
    Parameters.createRgbParameters = function (range) {
        console.log('Creating random parameters...');
        var possibleParameters = constants_1["default"].POSSIBLE_CHANNELS, randomRange = (lodash_1.isUndefined(range) || !lodash_1.isNumber(range)) ? lodash_1.random(100) : lodash_1.random(range), offset = {};
        if (lodash_1.isUndefined(offset) || lodash_1.size(offset) < 1) {
            var sampleLength = lodash_1.random(possibleParameters.length - 1);
            if (sampleLength <= 0) {
                sampleLength = 1;
            }
            lodash_1.each(lodash_1.sampleSize(possibleParameters, sampleLength), function (parameter) {
                offset[parameter] = randomRange;
            });
        }
        return offset;
    };
    Parameters.hasRgbParameter = function (offset) {
        for (var p in constants_1["default"].POSSIBLE_CHANNELS) {
            if (lodash_1.has(offset, constants_1["default"].POSSIBLE_CHANNELS[p])) {
                return true;
            }
        }
        return false;
    };
    return Parameters;
}());
exports["default"] = Parameters;
