import { Glitch, GlitchColumn } from '../config/types';
export declare type RgbaKeys = 'r' | 'g' | 'b' | 'a';
export default class Channels {
    static getChannel(glitch: Glitch, channel: RgbaKeys): number[];
    static mapChannel(arr: GlitchColumn[], channel: RgbaKeys): number[][];
    static defineChannels(glitch: Glitch): void;
    static deleteChannels(glitch: Glitch): void;
}
