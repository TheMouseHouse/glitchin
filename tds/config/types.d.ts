/// <reference types="node" />
import * as Jimp from 'jimp';
import { GlitchPixel } from '../modules/pixel';
export declare type Effect = {
    type: 'offsetRgbCols';
    params: {
        r?: number;
        g?: number;
        b?: number;
        func?: Function;
    };
};
export declare type Effects = Effect[];
export declare type LayerConfig = {
    file: string;
    opacity?: number;
    effects?: Effects;
};
export declare type OutputConfig = {
    output: string;
};
export declare type Layer = {
    params: LayerConfig;
    glitch: Glitch;
};
export declare type Layers = Layer[];
export declare type GlitchRow = GlitchPixel[];
export declare type GlitchColumn = GlitchPixel[];
export declare type Glitch = {
    data: GlitchPixel[];
    rows: GlitchRow[];
    columns: GlitchColumn[];
    mime: string;
    width: number;
    height: number;
    channels?: {
        r: number[];
        g: number[];
        b: number[];
    };
};
export declare type GlimageBitmap = JimpImageBitmap & {
    mime?: string;
};
export declare type Glimage = JimpImage & {
    glitch: Glitch;
    bitmap: GlimageBitmap;
};
export declare type JimpImage = {
    bitmap: JimpImageBitmap;
    scan(x: number, y: number, width: number, height: number, callback: (x: number, y: number, idx: number) => void): void;
    write(path: string, callback?: (error: string) => void): void;
    getBuffer(mime, callback: (err: string, image: Buffer) => void): void;
    getBase64(mime, callback: (base64: string) => void): void;
    quality(n: number): void;
    rgba(bool: boolean): void;
    filterType(value: number): void;
    deflateLevel(value: number): void;
    convolution(matrix: JimpMatrix): void;
    getPixelColor(x: number, y: number): number;
    setPixelColor(hex: number, x: number, y: number): void;
    hash(base?: number): string;
    clone(): Jimp;
    contain(width: number, height: number, alignBits?: boolean, mode?: string): void;
    cover(width: number, height: number, alignBits?: boolean, mode?: string): void;
    resize(width: number, height: number, mode?: string): void;
    scale(factor: number, mode?: string): void;
    scaleToFit(width: number, height: number, mode?: string);
    color(params: JimpColorParams[]): void;
    autocrop(): void;
    crop(x: number, y: number, width: number, height: number): void;
    blit(src: Jimp | Buffer, x: number, y: number, srcx?: number, srcy?: number, srcw?: number, srch?: number): void;
    composite(src: Jimp | Buffer, x: number, y: number): void;
    mask(src: Jimp | Buffer, x: number, y: number): void;
    flip(horz: boolean, vert: boolean): void;
    mirror(horz: boolean, vert: boolean): void;
    rotate(deg: number, mode?: string): void;
    brightness(val: number): void;
    contrast(val: number): void;
    dither565(): void;
    greyscale(): void;
    invert(): void;
    normalize(): void;
    fade(factor: number): void;
    opacity(factor: number): void;
    opaque(): void;
    background(hex: number): void;
    gaussian(rad: number): void;
    blur(rad: number): void;
    posterize(level: number): void;
    sepia(): void;
};
export declare type GJimp = JimpLike & {
    glitch?: Glitch;
};
export declare type JimpLike = {
    AUTO: -1;
    RESIZE_NEAREST_NEIGHBOR: 'nearestNeighbor';
    RESIZE_BILINEAR: 'bilinearInterpolation';
    RESIZE_BICUBIC: 'bicubicInterpolation';
    RESIZE_HERMITE: 'hermiteInterpolation';
    RESIZE_BEZIER: 'bezierInterpolation';
    HORIZONTAL_ALIGN_LEFT: 1;
    HORIZONTAL_ALIGN_CENTER: 2;
    HORIZONTAL_ALIGN_RIGHT: 4;
    VERTICAL_ALIGN_TOP: 8;
    VERTICAL_ALIGN_MIDDLE: 16;
    VERTICAL_ALIGN_BOTTOM: 32;
    FONT_SANS_8_BLACK: string;
    FONT_SANS_16_BLACK: string;
    FONT_SANS_32_BLACK: string;
    FONT_SANS_64_BLACK: string;
    FONT_SANS_128_BLACK: string;
    FONT_SANS_8_WHITE: string;
    FONT_SANS_16_WHITE: string;
    FONT_SANS_32_WHITE: string;
    FONT_SANS_64_WHITE: string;
    FONT_SANS_128_WHITE: string;
    MIME_PNG: 'image/png';
    MIME_JPEG: 'image/jpeg';
    MIME_BMP: 'image/bmp';
    PNG_FILTER_AUTO: -1;
    PNG_FILTER_NONE: 0;
    PNG_FILTER_SUB: 1;
    PNG_FILTER_UP: 2;
    PNG_FILTER_AVERAGE: 3;
    PNG_FILTER_PAETH: 4;
    read(file: string, callback?: (error: string, image: Jimp) => void): Promise<Jimp>;
    deflateStrategy(value: number): void;
    rgbaToInt(r: number, g: number, b: number, a: number): number;
    intToRGBA(hex: number): {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    distance(image1: Jimp | Buffer, image2: Jimp | Buffer): number;
    diff(image1: Jimp | Buffer, image2: Jimp | Buffer, threshold: number): {
        image: Buffer;
        percent: number;
    };
    loadFont(path: string): Promise<any>;
};
export declare type JimpMatrixTuple = [number, number, number];
export declare type JimpMatrix = [JimpMatrixTuple, JimpMatrixTuple, JimpMatrixTuple];
export declare type JimpImageBitmap = {
    data: Buffer;
    width: number;
    height: number;
};
export declare type JimpColorParams = {
    apply: 'lighten' | 'brighten' | 'darken' | 'desaturate' | 'saturate' | 'greyscale' | 'spin' | 'hue' | 'mix' | 'tint' | 'shade' | 'xor' | 'red' | 'green' | 'blue';
    params: string[] | number[];
};
