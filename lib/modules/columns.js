"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var columns_to_data_1 = require("./columns-to-data");
var data_to_rows_1 = require("./data-to-rows");
function Columns(glitch, columns) {
    if (lodash_1.isNil(glitch)) {
        throw new Error('modules/columns: image undefined');
    }
    if (lodash_1.isNil(columns)) {
        throw new Error('modules/columns: columns undefined');
    }
    glitch.columns = columns;
    glitch.data = columns_to_data_1["default"](glitch.columns);
    glitch.rows = data_to_rows_1["default"](glitch);
    return glitch;
}
exports["default"] = Columns;
