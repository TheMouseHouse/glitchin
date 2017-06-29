import * as Promise from 'bluebird';
import { LayerConfig, Glitch } from '../config/types';
export default function Loader(layer: LayerConfig): Promise<Glitch>;
export declare function getMime(file: string): string;
