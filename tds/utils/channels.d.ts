import * as Jimp from 'jimp';
export default class Channels {
    static getChannel(target: any, key: any): any;
    static mapChannel(arr: any, key: string): any;
    static defineChannels(target: Jimp): void;
    static deleteChannels(target: Jimp): void;
}
