import { each, set, includes } from 'lodash';
import Constants from '../config/constants';
import Utils from '../modules/utils';
import OffsetInColumn from '../modules/offset-in-column';
import { RgbaKeys } from '../utils/channels';
import * as Jimp from 'jimp';
import { Parameter } from '../utils/parameters';
import {
	Glitch
} from '../config/types';

export default function OffsetRgbCols( glitch: Glitch, offset: Parameter ): Glitch {
	if ( !Utils.hasRgbParameter( offset ) ) {
		offset = Utils.createRgbParameters();
	}

	try {
		Utils.defineChannels( glitch );

		each( offset, ( value: number, key: RgbaKeys ) => {
			set( glitch[ Constants.CHANNELS ], key, Utils.mapChannel( glitch.columns, key ) );

			if ( includes( Constants.POSSIBLE_CHANNELS, key ) ) {
				glitch = OffsetInColumn( glitch, key, value );
			}
		} );

		Utils.deleteChannels( glitch );
	} catch ( e ) {
		console.log( 'Error offsetting columns. Attempting to continue. ' + e );
	}

	return glitch;
}