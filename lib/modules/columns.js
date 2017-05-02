"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var columns_to_data_1 = require("./columns-to-data");
var data_to_rows_1 = require("./data-to-rows");
function Columns(image, columns) {
    if (lodash_1.isUndefined(image) || lodash_1.isNull(image)) {
        throw new Error('modules/columns: image undefined');
    }
    if (lodash_1.isUndefined(columns) || lodash_1.isNull(columns)) {
        throw new Error('modules/columns: columns undefined');
    }
    image.glitch.columns = columns;
    image.glitch.data = columns_to_data_1["default"](image);
    image.glitch.rows = data_to_rows_1["default"](image);
    return image;
}
exports["default"] = Columns;
