"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var offset_columns_1 = require("../effects/offset-columns");
exports.EffectsMap = {
    offsetrgbcols: function (glitch, offset) { return offset_columns_1["default"](glitch, offset); }
};
function EffectProvider(effect, glitch, params) {
    effect = String(effect.type).toLowerCase();
    if (lodash_1.isNil(effect) || lodash_1.isNil(glitch) || !exports.EffectsMap[effect]) {
        return glitch;
    }
    return exports.EffectsMap[effect](glitch, params);
}
exports["default"] = EffectProvider;
