"use strict";
exports.__esModule = true;
function Pixel(x, y, idx, data) {
    return {
        x: x,
        y: y,
        idx: idx,
        r: data[idx],
        g: data[idx + 1],
        b: data[idx + 2],
        a: data[idx + 3],
        hex: Number('0x' + data[idx + 0].toString(16) + data[idx + 1].toString(16) + data[idx + 2].toString(16))
    };
}
exports["default"] = Pixel;
