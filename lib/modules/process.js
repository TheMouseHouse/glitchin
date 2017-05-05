"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var pixel_1 = require("./pixel");
var offset_columns_1 = require("../filters/offset-columns");
var Promise = require("bluebird");
function Process(glimage, effects) {
    return new Promise(function (resolve, reject) {
        if (lodash_1.isNil(glimage)) {
            reject();
        }
        var data = glimage.bitmap.data;
        var width = glimage.bitmap.width;
        var height = glimage.bitmap.height;
        var glitch = {
            image: glimage,
            data: [],
            rows: [],
            columns: [],
            width: width,
            height: height
        };
        glimage.scan(0, 0, width, height, function (x, y, idx) {
            var pixel = pixel_1["default"](x, y, idx, data);
            glitch.data.push(pixel);
            if (lodash_1.isNil(glitch.rows[y])) {
                glitch.rows[y] = [];
            }
            if (lodash_1.isNil(glitch.columns[x])) {
                glitch.columns[x] = [];
            }
            glitch.rows[y].push(pixel);
            glitch.columns[x].push(pixel);
        });
        glimage.glitch = glitch;
        if (!lodash_1.isNil(effects) && effects.length > 0) {
            console.log('Applying effects...');
            lodash_1.each(effects, function (effect) {
                console.log(effect);
                switch (String(effect.type).toLowerCase()) {
                    case 'offsetrgbcols':
                        glimage.glitch = offset_columns_1["default"](glimage.glitch, effect.params);
                        break;
                }
            });
        }
        resolve(glimage);
    })["catch"](function (error) { return console.error; });
}
exports["default"] = Process;
