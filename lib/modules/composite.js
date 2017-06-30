"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var logger_1 = require("../utils/logger");
var Jimp = require("jimp");
var Promise = require("bluebird");
function Composite(images) {
    if (lodash_1.isNil(images) || (lodash_1.isArray(images) && images.length === 0)) {
        throw new Error('modules/composite: No images');
    }
    logger_1["default"]('log', 'Compositing', images.length, 'images.');
    return new Promise(function (resolve, reject) {
        new Jimp(images[0].bitmap.width, images[0].bitmap.height, function (err, image) {
            lodash_1.each(images, function (comp) {
                image.composite(comp, 0, 0);
            });
            resolve(image);
        });
    });
}
exports["default"] = Composite;
