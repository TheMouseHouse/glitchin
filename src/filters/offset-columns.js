'use strict';
import { each, set, includes } from 'lodash';
import Constants from '../config/constants';
import Utils from '../modules/utils';

var OffsetInColumn = require( '../modules/offset-in-column' ),
	debug = require( 'debug' )( 'filter/offset-columns' );

export function OffsetRgbCols( image, offset ) {
	Utils.check.image( image, 'Offset Columns' );

	if ( !Utils.hasRgbParameter( offset, image.bitmap.height ) ) {
		offset = Utils.createRgbParameters();
	}

	try {
		Utils.defineChannels( image );

		each( offset, ( value, key ) => {
			set( image[ Constants.CHANNELS ], key, Utils.mapChannel( image.glitch.columns, key ) );

			if ( includes( Constants.POSSIBLE_CHANNELS, key ) ) {
				image = OffsetInColumn( image, key, value );
			}
		} );

		Utils.deleteChannels( image );
	} catch ( e ) {
		debug( 'Error offsetting columns. Attempting to continue. ' + e );
	}

	return image;
};