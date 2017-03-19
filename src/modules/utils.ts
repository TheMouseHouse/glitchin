import Channels from '../utils/channels';
import Parameters from '../utils/parameters';

export default class Utils {
	static defineChannels = Channels.defineChannels;
	static deleteChannels = Channels.deleteChannels;
	static getChannel = Channels.getChannel;
	static mapChannel = Channels.mapChannel;
	static hasRgbParameter = Parameters.hasRgbParameter;
	static createRgbParameters = Parameters.createRgbParameters;

	static getPixelOffset( index: number, offsetValue: number, baseValue: number ): number {
		let pixelOffset = -offsetValue + index;

		if ( pixelOffset >= baseValue ) {
			pixelOffset -= baseValue;
		}

		if ( pixelOffset < 0 ) {
			pixelOffset += baseValue;
		}

		return pixelOffset;
	}
}