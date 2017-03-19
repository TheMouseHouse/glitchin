"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var constants_1 = require("../config/constants");
var utils_1 = require("../modules/utils");
var offset_in_column_1 = require("../modules/offset-in-column");
function OffsetRgbCols(image, offset) {
    if (!utils_1["default"].hasRgbParameter(offset)) {
        offset = utils_1["default"].createRgbParameters();
    }
    try {
        utils_1["default"].defineChannels(image);
        lodash_1.each(offset, function (value, key) {
            lodash_1.set(image[constants_1["default"].CHANNELS], key, utils_1["default"].mapChannel(image.glitch.columns, key));
            if (lodash_1.includes(constants_1["default"].POSSIBLE_CHANNELS, key)) {
                image = offset_in_column_1["default"](image, key, value);
            }
        });
        utils_1["default"].deleteChannels(image);
    }
    catch (e) {
        console.log('Error offsetting columns. Attempting to continue. ' + e);
    }
    return image;
}
exports["default"] = OffsetRgbCols;
;
