"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var Jimp = require("jimp");
var Promise = require("bluebird");
function Assemble(layers) {
    if (lodash_1.isNil(layers) || (lodash_1.isArray(layers) && layers.length === 0)) {
        throw new Error('modules/composite: No images');
    }
    console.log('Assembling...');
    return new Promise(function (resolve, reject) {
        var jimps = [];
        lodash_1.each(layers, function (layer, index) {
            if (layer.params.opacity > 0) {
                new Jimp(layer.glitch.width, layer.glitch.height, function (err, image) {
                    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
                        var pixel = layer.glitch.data[idx / 4];
                        image.bitmap.data[idx + 0] = pixel.r;
                        image.bitmap.data[idx + 1] = pixel.g;
                        image.bitmap.data[idx + 2] = pixel.b;
                        image.bitmap.data[idx + 3] = pixel.a;
                    });
                    image.opacity(layer.params.opacity / 100);
                    jimps[index] = image;
                });
            }
        });
        resolve(jimps);
    });
}
exports["default"] = Assemble;
