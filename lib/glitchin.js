"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var loader_1 = require("./modules/loader");
var render_1 = require("./modules/render");
var Promise = require("bluebird");
var Jimp = require("jimp");
var Glitchin = (function () {
    function Glitchin(layerConfigs, outputConfig) {
        var _this = this;
        this._promises = [];
        this._layers = [];
        if (lodash_1.isNil(layerConfigs) || lodash_1.isNil(outputConfig)) {
            return;
        }
        lodash_1.each(layerConfigs, function (layer, index) {
            console.log('Loading', layer.file, layer);
            _this._promises.push(new Promise(function (resolve, reject) {
                loader_1["default"](layer).then(function (glimage) {
                    _this._layers[index] = { params: layer, glimage: glimage };
                    resolve();
                })["catch"](function (error) {
                    console.error(error);
                    reject(error);
                });
            }));
        });
        Promise.all(this._promises).then(function () {
            console.log('Compositing...');
            var bitmap = _this._layers[0].glimage.bitmap;
            var output = new Jimp(bitmap.width, bitmap.height, function (error, image) {
                if (!lodash_1.isNil(error)) {
                    return;
                }
                lodash_1.each(_this._layers.reverse(), function (layer) {
                    if (layer.params.opacity > 0) {
                        var glimage = layer.glimage;
                        var layerGlitchData_1 = glimage.glitch && glimage.glitch.data;
                        if (!!layerGlitchData_1) {
                            var index_1 = 0;
                            glimage.scan(0, 0, glimage.bitmap.width, glimage.bitmap.height, function (x, y, idx) {
                                var pixel = layerGlitchData_1[index_1];
                                var layerBitmapData = this.bitmap.data;
                                layerBitmapData[idx + 0] = pixel.r;
                                layerBitmapData[idx + 1] = pixel.g;
                                layerBitmapData[idx + 2] = pixel.b;
                                layerBitmapData[idx + 3] = pixel.a;
                            });
                        }
                        glimage.opacity(layer.params.opacity / 100);
                        image.composite(glimage, 0, 0);
                    }
                });
                render_1["default"](image, outputConfig.output);
            });
        });
    }
    return Glitchin;
}());
exports.Glitchin = Glitchin;
