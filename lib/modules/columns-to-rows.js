"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
function ColumnsToData(columns) {
    var rows = [];
    lodash_1.each(columns, function (column, colIndex) {
        lodash_1.each(column, function (pixel, pixelIndex) {
            if (lodash_1.isNil(rows[pixelIndex])) {
                rows[pixelIndex] = [];
            }
            rows[pixelIndex][colIndex] = pixel;
        });
    });
    return rows;
}
exports["default"] = ColumnsToData;
