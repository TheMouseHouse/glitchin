"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var Promise = require("bluebird");
function Render(glimage, output) {
    console.log('Rendering...');
    if (output !== 'base64') {
        glimage.write(output);
        console.log('Done.');
    }
    else {
        return new Promise(function (resolve, reject) {
            if (lodash_1.isNil(glimage)) {
                reject();
            }
            glimage.getBuffer(glimage.bitmap.mime, function (err, buffer) {
                if (!lodash_1.isNil(err)) {
                    resolve(err);
                }
                else {
                    resolve(buffer.toString('base64'));
                }
                buffer = null;
                glimage = null;
            });
        })["catch"](function (error) { return console.error; });
    }
}
exports["default"] = Render;
