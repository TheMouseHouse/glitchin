import * as Jimp from 'jimp';
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
export declare type ConfigLayer = {
    file: string;
    opacity?: number;
    effects?: Effects;
};
export declare type Layer = {
    params: ConfigLayer;
    jimp: Jimp;
};
export declare type Layers = Layer[];
export declare class Glitchin {
    private _promises;
    private _layers;
    constructor(configLayers: ConfigLayer[], config: any);
}
