"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var utils_1 = require("./utils");
var rows_1 = require("./rows");
function OffsetInRows(image, keys, offset) {
    if (lodash_1.isUndefined(image)) {
        console.log('Image is not defined in Offset.module.');
    }
    var offsetValue;
    var baseValue = image.bitmap.width;
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
    if (lodash_1.isUndefined(keys)) {
        return image;
    }
    if (lodash_1.isString(keys)) {
        keys = [keys];
    }
    else if (!lodash_1.isArray(keys)) {
        return image;
    }
    var rows = [];
    lodash_1.each(image.glitch.rows, function (row, rowIndex) {
        rows[rowIndex] = [];
        if (lodash_1.isFunction(offset)) {
            offsetValue = offset(image, rowIndex);
        }
        lodash_1.each(row, function (pixel, index) {
            var pixelOffset = utils_1["default"].getIndexOffset(index, offsetValue, baseValue);
            rows[rowIndex][index] = pixel;
            lodash_1.each(keys, function (k) {
                rows[rowIndex][index][k] = utils_1["default"].getChannel(image.glitch, k)[rowIndex][pixelOffset];
            });
        });
    });
    return rows_1["default"](image, rows);
}
exports["default"] = OffsetInRows;
