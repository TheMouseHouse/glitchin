"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
function RowsToData(image) {
    return lodash_1.flatten(image.glitch.rows);
}
exports["default"] = RowsToData;
