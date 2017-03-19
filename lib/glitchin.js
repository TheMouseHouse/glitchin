"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var loader_1 = require("./modules/loader");
var render_1 = require("./modules/render");
var Promise = require("bluebird");
var Jimp = require("jimp");
var Glitchin = (function () {
    function Glitchin(configLayers, config) {
        var _this = this;
        if (lodash_1.isUndefined(configLayers) || lodash_1.isUndefined(config)) {
            return;
        }
        this._promises = [];
        this._layers = [];
        lodash_1.each(configLayers, function (layer, index) {
            console.log('Loading', layer.file, layer);
            _this._promises.push(new Promise(function (resolve, reject) {
                loader_1["default"](layer).then(function (jimp) {
                    _this._layers[index] = { params: layer, jimp: jimp };
                    resolve();
                })["catch"](function (error) {
                    console.error(error);
                    resolve(error);
                });
            }));
        });
        Promise.all(this._promises).then(function () {
            console.log('Compositing...');
            var bitmap = _this._layers[0].jimp.bitmap;
            var output = new Jimp(bitmap.width, bitmap.height, function (error, image) {
                if (!lodash_1.isNull(error)) {
                    return;
                }
                lodash_1.each(_this._layers.reverse(), function (layer) {
                    if (layer.params.opacity > 0) {
                        layer.jimp.opacity(layer.params.opacity / 100);
                        image.composite(layer.jimp, 0, 0);
                    }
                });
                render_1["default"](image, config.output);
            });
        });
    }
    return Glitchin;
}());
exports.Glitchin = Glitchin;
