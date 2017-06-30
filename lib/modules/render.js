"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var Promise = require("bluebird");
var logger_1 = require("../utils/logger");
var loader_1 = require("../modules/loader");
function Render(image, output) {
    logger_1["default"]('log', 'Rendering...');
    if (output !== 'base64') {
        image.write(output);
        logger_1["default"]('log', 'Done.');
    }
    else {
        return new Promise(function (resolve, reject) {
            if (lodash_1.isNil(image)) {
                reject(new Error('Render() - Object "image" undefined.'));
            }
            image.getBuffer(loader_1.getMime(output), function (err, buffer) {
                if (!lodash_1.isNil(err)) {
                    reject(err);
                }
                else {
                    resolve(buffer.toString('base64'));
                }
                buffer = null;
                image = null;
            });
        });
    }
}
exports["default"] = Render;
