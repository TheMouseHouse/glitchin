"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var process_1 = require("./process");
var Promise = require("bluebird");
var Jimp = require("jimp");
function Loader(layer) {
    if (lodash_1.isNil(layer) || lodash_1.isNil(layer.file)) {
        return Promise.reject();
    }
    return Jimp.read(layer.file).then(function (image) {
        var mime = getMime(layer.file);
        return process_1["default"](image, mime, layer.effects);
    });
}
exports["default"] = Loader;
function getMime(file) {
    var extension = file.substr(-4, 4);
    try {
        if (extension === '.jpg' || extension === 'jpeg') {
            return Jimp.MIME_JPEG;
        }
        else if (extension === '.png') {
            return Jimp.MIME_PNG;
        }
        else if (extension === '.bmp') {
            return Jimp.MIME_BMP;
        }
    }
    catch (e) {
        throw "File type not supported - " + extension + ". Error: " + e;
    }
}
exports.getMime = getMime;
