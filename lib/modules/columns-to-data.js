"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var columns_to_rows_1 = require("./columns-to-rows");
function ColumnsToData(columns) {
    return lodash_1.flatten(columns_to_rows_1["default"](columns));
}
exports["default"] = ColumnsToData;
