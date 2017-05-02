import { each, set, includes } from 'lodash';
import Constants from '../config/constants';
import Utils from '../modules/utils';
import OffsetInColumn from '../modules/offset-in-column';
import * as Jimp from 'jimp';

export default function OffsetRgbCols( image: Jimp, offset: { r?: number, g?: number, b?: number } ) {
	if ( !Utils.hasRgbParameter( offset ) ) {
		offset = Utils.createRgbParameters();
	}

	try {
		Utils.defineChannels( image );

		each( offset, ( value: number, key: string ) => {
			set( image[ Constants.CHANNELS ], key, Utils.mapChannel( image.glitch.columns, key ) );

			if ( includes( Constants.POSSIBLE_CHANNELS, key ) ) {
				image = OffsetInColumn( image, key, value );
			}
		} );

		Utils.deleteChannels( image );
	} catch ( e ) {
		console.log( 'Error offsetting columns. Attempting to continue. ' + e );
	}

	return image;
}