import { each, random, isUndefined, isNumber, isFunction, isString, isArray } from 'lodash';
import Jimp from 'jimp';
import Utils from './utils';
import Columns from './columns';

export default function OffsetInColumns( image: Jimp, keys, offset ) {

	if ( isUndefined( image ) ) {
		console.log( 'Image is not defined in Offset.module.' );
	}

	let offsetValue;
	let baseValue = image.bitmap.height;

	if ( isNumber( offset ) ) {
		offset = ~~( Math.round( offset ) );
		if ( offset > baseValue || offset < -baseValue ) {
			offsetValue = offset % baseValue;
		} else {
			offsetValue = offset;
		}
	} else if ( isUndefined( offset ) ) {
		offsetValue = random( baseValue );
	}

	if ( !isFunction( offset ) ) {
		console.log( 'Offsetting ' + keys + ' in columns by ' + offsetValue + 'pixels...' );
	}

	if ( isUndefined( keys ) ) {
		return image;
	}

	if ( isString( keys ) ) {
		keys = [ keys ];
	} else if ( !isArray( keys ) ) {
		return image;
	}

	var columns = [];
	each( image.glitch.columns, function ( column, colIndex ) {
		columns[ colIndex ] = [];

		if ( isFunction( offset ) ) {
			offsetValue = offset( image, colIndex );
		}

		each( column, function ( pixel, index ) {
			var pixelOffset = Utils.getPixelOffset( index, offsetValue, baseValue );
			columns[ colIndex ][ index ] = pixel;

			each( keys, k => {
				columns[ colIndex ][ index ][ k ] = Utils.getChannel( image, k )[ colIndex ][ pixelOffset ];
			} );
		} );
	} );

	return Columns( image, columns );
};