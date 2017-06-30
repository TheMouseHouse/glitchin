import Logger from '../utils/logger';
import Constants from '../config/constants';
import { map, set, unset, isNil } from 'lodash';
import * as Jimp from 'jimp';
import { GlitchPixel } from '../modules/pixel';
import {
	Glitch,
	GlitchColumn
} from '../config/types';

export type RgbaKeys = 'r' | 'g' | 'b' | 'a';

export default class Channels {

	static getChannel( glitch: Glitch, channel: RgbaKeys ): number[] {
		const message = {
			method: 'Channels#getChannel()',
			glitch: '- Glitch undefined',
			channel: '- Unable to get channel from glitch: channel undefined or not "r", "g", "b" nor "a"... Was:',
			tail: 'Returning empty array []'
		};

		if ( isNil( glitch ) ) {
			Logger( 'error', message.method, message.glitch, message.tail );
			return [];
		}
		if ( isNil( channel ) || Constants.POSSIBLE_CHANNELS.indexOf( channel ) === -1 ) {
			Logger( 'error', message.method, message.channel, channel, '.', message.tail );
			return [];
		}

		return glitch[ Constants.CHANNELS ][ channel ];
	}

	static mapChannel( arr: GlitchColumn[], channel: RgbaKeys ): number[][] {
		if ( Constants.POSSIBLE_CHANNELS.indexOf( channel ) === -1 ) {
			return [];
		}
		return map( arr, column => {
			return map( column, pixel => {
				return pixel[ channel ];
			} );
		} );
	}

	static defineChannels( glitch: Glitch ): void {
		if ( isNil( glitch ) ) { return; }
		set( glitch, Constants.CHANNELS, {} );
	}

	static deleteChannels( glitch: Glitch ): void {
		if ( isNil( glitch ) ) { return; }
		unset( glitch, Constants.CHANNELS );
	}
}