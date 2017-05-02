import * as Promise from 'bluebird';
import { LayerConfig, Glimage } from '../config/types';
export default function Loader(layer: LayerConfig): Promise<Glimage>;
