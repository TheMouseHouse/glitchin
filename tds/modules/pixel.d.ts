/// <reference types="node" />
export declare type GlitchPixel = {
    x: number;
    y: number;
    idx: number;
    r: number;
    g: number;
    b: number;
    a: number;
    hex: number;
};
export default function Pixel(x: number, y: number, idx: number, data: Buffer): GlitchPixel;
