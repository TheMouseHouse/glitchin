import { LayerConfig, OutputConfig } from './config/types';
export declare class Glitchin {
    private _layers;
    constructor(layerConfigs: LayerConfig[], outputConfig: OutputConfig);
    private _setLayer(index, layer);
    private _mapPromises(layerConfigs);
}
