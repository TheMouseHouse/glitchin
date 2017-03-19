"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var pixel_1 = require("./pixel");
var offset_columns_1 = require("../filters/offset-columns");
var Promise = require("bluebird");
function Process(image, effects) {
    return new Promise(function (resolve, reject) {
        if (lodash_1.isUndefined(image) || lodash_1.isNull(image)) {
            reject();
        }
        var data = image.bitmap.data, width = image.bitmap.width, height = image.bitmap.height, glitch = {
            image: image,
            data: [],
            rows: [],
            columns: [],
            width: width,
            height: height
        };
        image.scan(0, 0, width, height, function (x, y, idx) {
            var pixel = pixel_1["default"](x, y, idx, data);
            glitch.data.push(pixel);
            if (lodash_1.isUndefined(glitch.rows[y])) {
                glitch.rows[y] = [];
            }
            if (lodash_1.isUndefined(glitch.columns[x])) {
                glitch.columns[x] = [];
            }
            glitch.rows[y].push(pixel);
            glitch.columns[x].push(pixel);
        });
        image.glitch = glitch;
        if (!lodash_1.isUndefined(effects) && effects.length > 0) {
            console.log('Applying glitch...');
            lodash_1.each(effects, function (effect) {
                switch (String(effect.type).toLowerCase()) {
                    case 'offsetrgbcols':
                        console.log(effect);
                        image.glitch = offset_columns_1["default"](image, effect.params);
                        break;
                }
            });
        }
        resolve(image);
    })["catch"](function (error) { return console.error; });
}
exports["default"] = Process;
;
