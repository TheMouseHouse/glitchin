import { isNil } from 'lodash';
import Channels from '../utils/channels';
import Parameters from '../utils/parameters';

export default class Utils {
	static defineChannels = Channels.defineChannels;
	static deleteChannels = Channels.deleteChannels;
	static getChannel = Channels.getChannel;
	static mapChannel = Channels.mapChannel;
	static hasRgbParameter = Parameters.hasRgbParameter;
	static createRgbParameters = Parameters.createRgbParameters;

	static getIndexOffset( index: number, offset: number, size: number ): number {
		if ( isNil( index ) || isNil( offset ) || isNil( size ) || size === 0 ) {
			return 0;
		}

		let actualIndex = index + ( offset % size );

		if ( actualIndex < 0 ) {
			actualIndex += size;
		}

		if ( actualIndex >= size ) {
			actualIndex -= size;
		}

		return actualIndex;
	}
}