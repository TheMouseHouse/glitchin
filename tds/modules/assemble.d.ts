import * as Jimp from 'jimp';
import * as Promise from 'bluebird';
import { Layers } from '../config/types';
export default function Assemble(layers: Layers): Promise<Jimp[]>;
