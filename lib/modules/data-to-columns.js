"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
function DataToColumns(image) {
    var width = image.glitch.width;
    var columns = [];
    for (var i = 0; i < image.glitch.data.length; i++) {
        var pixel = image.glitch.data[i];
        var colIndex = i % width;
        if (lodash_1.isUndefined(columns[colIndex])) {
            columns[colIndex] = [];
        }
        columns[colIndex].push(pixel);
    }
    return columns;
}
exports["default"] = DataToColumns;
;
