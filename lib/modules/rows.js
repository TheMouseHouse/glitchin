"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var rows_to_data_1 = require("./rows-to-data");
var data_to_columns_1 = require("./data-to-columns");
function Rows(image, rows) {
    if (lodash_1.isUndefined(image) || lodash_1.isNull(image)) {
        throw new Error('modules/rows: image undefined');
    }
    if (lodash_1.isUndefined(rows) || lodash_1.isNull(rows)) {
        throw new Error('modules/rows: rows undefined');
    }
    image.glitch.rows = rows;
    image.glitch.data = rows_to_data_1["default"](image);
    image.glitch.columns = data_to_columns_1["default"](image);
    return image;
}
exports["default"] = Rows;
