"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var constants_1 = require("../config/constants");
var utils_1 = require("../modules/utils");
var offset_in_column_1 = require("../modules/offset-in-column");
function OffsetRgbCols(glitch, offset) {
    if (!utils_1["default"].hasRgbParameter(offset)) {
        offset = utils_1["default"].createRgbParameters();
    }
    try {
        utils_1["default"].defineChannels(glitch);
        lodash_1.each(offset, function (value, key) {
            lodash_1.set(glitch[constants_1["default"].CHANNELS], key, utils_1["default"].mapChannel(glitch.columns, key));
            if (lodash_1.includes(constants_1["default"].POSSIBLE_CHANNELS, key)) {
                glitch = offset_in_column_1["default"](glitch, key, value);
            }
        });
        console.info('channels', glitch.channels);
        utils_1["default"].deleteChannels(glitch);
    }
    catch (e) {
        console.log('Error offsetting columns. Attempting to continue. ' + e);
    }
    return glitch;
}
exports["default"] = OffsetRgbCols;
