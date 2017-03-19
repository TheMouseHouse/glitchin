"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var Promise = require("bluebird");
function Render(image, output) {
    console.log('Rendering...');
    var index = 0, bitmap = image.bitmap.data, glitch = null;
    if (lodash_1.has(image, 'glitch')) {
        glitch = image.glitch.data;
    }
    if (!lodash_1.isNull(glitch)) {
        lodash_1.each(glitch, function (pixel) {
            console.log(pixel);
            image.bitmap[index] = pixel.r;
            image.bitmap[index + 1] = pixel.g;
            image.bitmap[index + 2] = pixel.b;
            image.bitmap[index + 3] = pixel.a;
            index += 4;
        });
    }
    if (output !== 'base64') {
        image.write(output);
        console.log('Done.');
    }
    else {
        return new Promise(function (resolve, reject) {
            if (lodash_1.isUndefined(image) || lodash_1.isNull(image)) {
                reject();
            }
            image.getBuffer(image.bitmap.mime, function (err, buffer) {
                if (!lodash_1.isNull(err)) {
                    resolve(err);
                }
                else {
                    resolve(buffer.toString('base64'));
                }
                buffer = null;
                image = null;
                bitmap = null;
            });
        })["catch"](function (error) { return console.error; });
    }
}
exports["default"] = Render;
;
