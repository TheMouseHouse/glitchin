import { Glitch, GlitchColumn } from '../config/types';
export declare type RgbKeys = 'r' | 'g' | 'b';
export default class Channels {
    static getChannel(glitch: Glitch, key: RgbKeys): number[];
    static mapChannel(arr: GlitchColumn[], key: RgbKeys): number[][];
    static defineChannels(glitch: Glitch): void;
    static deleteChannels(glitch: Glitch): void;
}
