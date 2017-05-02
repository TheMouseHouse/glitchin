import Constants from '../config/constants';
import { map, set, unset, isNil } from 'lodash';
import * as Jimp from 'jimp';
import { GlitchPixel } from '../modules/pixel';
import {
	Glitch,
	GlitchColumn
} from '../config/types';

export type RgbKeys = 'r' | 'g' | 'b';

export default class Channels {

	static getChannel( glitch: Glitch, key: RgbKeys ): number[] {
		if ( isNil( glitch ) ) {
			console.error( 'Unable to get channel from target: target undefined.' );
			return [];
		}
		if ( isNil( key ) ) {
			console.error( 'Unable to get channel from target: key undefined.' );
			return [];
		}

		return glitch[ Constants.CHANNELS ][ key ];
	}

	static mapChannel( arr: GlitchColumn[], key: RgbKeys ): number[][] {
		return map( arr, ( column: GlitchColumn ) => {
			return map( column, ( pixel: GlitchPixel ) => {
				return pixel[ key ];
			} );
		} );
	}

	static defineChannels( glitch: Glitch ): void {
		set( glitch, Constants.CHANNELS, {} );
	}

	static deleteChannels( glitch: Glitch ): void {
		unset( glitch, Constants.CHANNELS );
	}
}