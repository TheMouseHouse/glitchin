"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var Promise = require("bluebird");
var loader_1 = require("../modules/loader");
function Render(image, output) {
    console.log('Rendering...');
    if (output !== 'base64') {
        image.write(output);
        console.log('Done.');
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
        })["catch"](function (error) { return console.error; });
    }
}
exports["default"] = Render;
