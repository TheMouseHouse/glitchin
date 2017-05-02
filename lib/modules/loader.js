"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var process_1 = require("./process");
var Jimp = require("jimp");
function Loader(layer) {
    if (lodash_1.isUndefined(layer) || lodash_1.isUndefined(layer.file)) {
        return;
    }
    return Jimp.read(layer.file).then(function (image) {
        var mime;
        var ext = layer.file.substr(-4, 4);
        try {
            if (ext === '.jpg' || ext === 'jpeg') {
                mime = Jimp.MIME_JPEG;
            }
            else if (ext === '.png') {
                mime = Jimp.MIME_PNG;
            }
            else if (ext === '.bmp') {
                mime = Jimp.MIME_BMP;
            }
            image.bitmap.mime = mime;
        }
        catch (e) {
            throw "File type not supported - " + ext;
        }
        return process_1["default"](image, layer.effects);
    })["catch"](function (error) { return console.error; });
}
exports["default"] = Loader;
