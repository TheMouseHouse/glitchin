import Channels from '../utils/channels';
import Parameters from '../utils/parameters';
export default class Utils {
    static defineChannels: typeof Channels.defineChannels;
    static deleteChannels: typeof Channels.deleteChannels;
    static getChannel: typeof Channels.getChannel;
    static mapChannel: typeof Channels.mapChannel;
    static hasRgbParameter: typeof Parameters.hasRgbParameter;
    static createRgbParameters: typeof Parameters.createRgbParameters;
    static getIndexOffset(index: number, offset: number, size: number): number;
}
