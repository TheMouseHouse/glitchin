"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var loader_1 = require("./modules/loader");
var assemble_1 = require("./modules/assemble");
var composite_1 = require("./modules/composite");
var render_1 = require("./modules/render");
var Promise = require("bluebird");
var Glitchin = (function () {
    function Glitchin(layerConfigs, outputConfig) {
        var _this = this;
        this._layers = [];
        if (lodash_1.isNil(layerConfigs) || lodash_1.isNil(outputConfig)) {
            return;
        }
        Promise.all(this._mapPromises(layerConfigs))
            .then(function () { return assemble_1["default"](_this._layers); })
            .then(function (images) { return composite_1["default"](images); })
            .then(function (image) { return render_1["default"](image, outputConfig.output); })["catch"](function (err) { return console.log(err); });
    }
    Glitchin.prototype._setLayer = function (index, layer) {
        this._layers[index] = layer;
    };
    Glitchin.prototype._mapPromises = function (layerConfigs) {
        var _this = this;
        var promises = [];
        lodash_1.each(layerConfigs, function (layer, index) {
            console.log('Loading', layer.file, layer);
            promises.push(new Promise(function (resolve, reject) {
                loader_1["default"](layer).then(function (glitch) {
                    _this._setLayer(index, { params: layer, glitch: glitch });
                    resolve();
                })["catch"](function (error) {
                    console.error(error);
                    reject(error);
                });
            }));
        });
        return promises;
    };
    return Glitchin;
}());
exports.Glitchin = Glitchin;
