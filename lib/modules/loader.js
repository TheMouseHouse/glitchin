"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var process_1 = require("./process");
var Jimp = require("jimp");
function Loader(layer) {
    if (lodash_1.isNil(layer) || lodash_1.isNil(layer.file)) {
        return;
    }
    var jimp = Jimp;
    return jimp.read(layer.file).then(function (image) {
        var ext = layer.file.substr(-4, 4);
        var mime;
        try {
            if (ext === '.jpg' || ext === 'jpeg') {
                mime = jimp.MIME_JPEG;
            }
            else if (ext === '.png') {
                mime = jimp.MIME_PNG;
            }
            else if (ext === '.bmp') {
                mime = jimp.MIME_BMP;
            }
            image.bitmap.mime = mime;
        }
        catch (e) {
            throw "File type not supported - " + ext + ". Error: " + e;
        }
        return process_1["default"](image, layer.effects);
    })["catch"](function (error) { return console.error; });
}
exports["default"] = Loader;
