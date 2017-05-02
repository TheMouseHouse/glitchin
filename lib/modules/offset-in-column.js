"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var utils_1 = require("./utils");
var columns_1 = require("./columns");
function OffsetInColumns(image, keys, offset) {
    if (lodash_1.isUndefined(image)) {
        console.log('Image is not defined in Offset.module.');
    }
    var offsetValue;
    var baseValue = image.bitmap.height;
    if (lodash_1.isNumber(offset)) {
        offset = ~~(Math.round(offset));
        if (offset > baseValue || offset < -baseValue) {
            offsetValue = offset % baseValue;
        }
        else {
            offsetValue = offset;
        }
    }
    else if (lodash_1.isUndefined(offset)) {
        offsetValue = lodash_1.random(baseValue);
    }
    if (!lodash_1.isFunction(offset)) {
        console.log('Offsetting ' + keys + ' in columns by ' + offsetValue + ' pixels...');
    }
    if (lodash_1.isUndefined(keys)) {
        return image;
    }
    if (lodash_1.isString(keys)) {
        keys = [keys];
    }
    else if (!lodash_1.isArray(keys)) {
        return image;
    }
    var columns = [];
    lodash_1.each(image.glitch.columns, function (column, colIndex) {
        columns[colIndex] = [];
        if (lodash_1.isFunction(offset)) {
            offsetValue = offset(image, colIndex);
        }
        lodash_1.each(column, function (pixel, index) {
            var pixelOffset = utils_1["default"].getPixelOffset(index, offsetValue, baseValue);
            columns[colIndex][index] = pixel;
            lodash_1.each(keys, function (k) {
                columns[colIndex][index][k] = utils_1["default"].getChannel(image, k)[colIndex][pixelOffset];
            });
        });
    });
    return columns_1["default"](image, columns);
}
exports["default"] = OffsetInColumns;
