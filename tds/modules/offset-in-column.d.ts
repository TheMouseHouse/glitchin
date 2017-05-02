import { Glitch } from '../config/types';
import { RgbKeys } from '../utils/channels';
import { Parameter } from '../utils/parameters';
export declare type OffsetFuction = (glitch: Glitch, index: number) => number;
export default function OffsetInColumns(glitch: Glitch, keys: RgbKeys, offset: void | OffsetFuction | Parameter): Glitch;
