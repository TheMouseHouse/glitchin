import Constants from '../config/constants';
import { map, set, unset, isNil } from 'lodash';
import * as Jimp from 'jimp';

export default class Channels {

	static getChannel( target, key ) {
		if ( isNil( target ) ) {
			console.error( 'Unable to get channel from target: target undefined.' );
			return [];
		}
		if ( isNil( key ) ) {
			console.error( 'Unable to get channel from target: key undefined.' );
			return [];
		}

		return target[ Constants.CHANNELS ][ key ];
	}

	static mapChannel( arr, key: string ) {
		return map( arr, item => {
			return map( item, pixel => {
				return pixel[ key ];
			} );
		} );
	}

	static defineChannels( target: Jimp ): void {
		set( target, Constants.CHANNELS, {} );
	}

	static deleteChannels( target: Jimp ): void {
		unset( target, Constants.CHANNELS );
	}
}