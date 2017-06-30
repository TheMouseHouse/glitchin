"use strict";
exports.__esModule = true;
function Logger(level) {
    var message = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        message[_i - 1] = arguments[_i];
    }
    console[level].apply(null, (_a = [level]).concat.apply(_a, message));
    var _a;
}
exports["default"] = Logger;
