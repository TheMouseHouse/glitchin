"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
function ColumnsToData(image) {
    var rows = [];
    lodash_1.each(image.glitch.columns, function (column, colIndex) {
        lodash_1.each(column, function (pixel, pixelIndex) {
            if (lodash_1.isUndefined(rows[pixelIndex])) {
                rows[pixelIndex] = [];
            }
            rows[pixelIndex][colIndex] = pixel;
        });
    });
    return rows;
}
exports["default"] = ColumnsToData;
;
