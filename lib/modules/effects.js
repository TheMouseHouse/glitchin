"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var offset_columns_1 = require("../effects/offset-columns");
exports.EffectsMap = {
    offsetrgbcols: function (glitch, offset) { return offset_columns_1["default"](glitch, offset); }
};
var Effect = (function () {
    function Effect(image) {
        if (lodash_1.isNil(image)) {
            return;
        }
    }
    return Effect;
}());
exports.Effect = Effect;
