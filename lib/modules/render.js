"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var Promise = require("bluebird");
function Render(image, output) {
    console.log('Rendering...');
    if (output !== 'base64') {
        image.write(output);
        console.log('Done.');
    }
    else {
        return new Promise(function (resolve, reject) {
            if (lodash_1.isNil(image)) {
                reject();
            }
            image.getBuffer(image.bitmap.mime, function (err, buffer) {
                if (!lodash_1.isNil(err)) {
                    resolve(err);
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
