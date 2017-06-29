"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var utils_1 = require("./utils");
var columns_1 = require("./columns");
function OffsetInColumns(glitch, keys, offset) {
    if (lodash_1.isNil(glitch)) {
        console.log('Image is not defined in Offset.module.');
    }
    var offsetValue;
    var baseValue = glitch.height;
    if (lodash_1.isNumber(offset)) {
        offset = ~~(Math.round(offset));
        if (offset > baseValue || offset < -baseValue) {
            offsetValue = offset % baseValue;
        }
        else {
            offsetValue = offset;
        }
    }
    else if (lodash_1.isNil(offset)) {
        offsetValue = lodash_1.random(baseValue);
    }
    if (!lodash_1.isFunction(offset)) {
        console.log('Offsetting ' + keys + ' in columns by ' + offsetValue + ' pixels...');
    }
    if (lodash_1.isNil(keys)) {
        return glitch;
    }
    var _keys = [];
    if (lodash_1.isString(keys)) {
        _keys = [keys];
    }
    else if (!lodash_1.isArray(keys)) {
        return glitch;
    }
    var columns = [];
    lodash_1.each(glitch.columns, function (column, colIndex) {
        columns[colIndex] = [];
        if (lodash_1.isFunction(offset)) {
            offsetValue = offset(glitch, colIndex);
        }
        lodash_1.each(column, function (pixel, index) {
            var pixelOffset = utils_1["default"].getIndexOffset(index, offsetValue, baseValue);
            columns[colIndex][index] = pixel;
            lodash_1.each(keys, function (k) {
                columns[colIndex][index][k] = utils_1["default"].getChannel(glitch, k)[colIndex][pixelOffset];
            });
        });
    });
    return columns_1["default"](glitch, columns);
}
exports["default"] = OffsetInColumns;
