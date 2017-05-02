"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
function DataToRows(glitch) {
    var width = glitch.width;
    var yIndex = 0;
    var rows = [];
    for (var i = 0; i < glitch.data.length; i++) {
        var pixel = glitch.data[i];
        if (lodash_1.isNil(rows[yIndex])) {
            rows[yIndex] = [];
        }
        rows[yIndex].push(pixel);
        if (i % width === 0 && i !== 0) {
            yIndex++;
        }
    }
    return rows;
}
exports["default"] = DataToRows;
