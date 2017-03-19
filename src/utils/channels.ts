import Constants from '../config/constants';
import { map, set, unset, isUndefined, isNull } from 'lodash';

export default class Channels {

	static getChannel( target, key ) {
		if ( isUndefined( target ) || isNull( target ) ) {
			console.error( 'Unable to get channel from target: target undefined.' );
			return [];
		}
		if ( isUndefined( key ) ) {
			console.error( 'Unable to get channel from target: key undefined.' );
			return [];
		}

		return target[ Constants.CHANNELS ][ key ];
	}

	static mapChannel( arr, key ) {
		return map( arr, item => {
			return map( item, pixel => {
				return pixel[ key ];
			} );
		} );
	}

	static defineChannels( target ) {
		set( target, Constants.CHANNELS, {} );
	}

	static deleteChannels( target ) {
		unset( target, Constants.CHANNELS );
	}
}