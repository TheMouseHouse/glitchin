import * as Promise from 'bluebird';
import * as Jimp from 'jimp';
import { Glitch, Effects } from '../config/types';
export default function Process(image: Jimp, mime: string, effects: Effects): Promise<Glitch>;
