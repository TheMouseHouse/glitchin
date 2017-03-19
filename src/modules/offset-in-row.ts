import { each, random, isUndefined, isNumber, isFunction, isString, isArray } from 'lodash';
import * as Jimp from 'jimp';
import Utils from './utils';
import Rows from './rows';

export default function OffsetInRows( image: Jimp, keys, offset ) {
	if ( isUndefined( image ) ) {
		console.log( 'Image is not defined in Offset.module.' );
	}

	let offsetValue;
	let baseValue = image.bitmap.width;

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

	if ( isUndefined( keys ) ) {
		return image;
	}

	if ( isString( keys ) ) {
		keys = [ keys ];
	} else if ( !isArray( keys ) ) {
		return image;
	}

	let rows = [];
	each( image.glitch.rows, ( row, rowIndex ) => {
		rows[ rowIndex ] = [];

		if ( isFunction( offset ) ) {
			offsetValue = offset( image, rowIndex );
		}

		each( row, function ( pixel, index ) {
			const pixelOffset = Utils.getPixelOffset( index, offsetValue, baseValue );
			rows[ rowIndex ][ index ] = pixel;

			each( keys, k => {
				rows[ rowIndex ][ index ][ k ] = Utils.getChannel( image, k )[ rowIndex ][ pixelOffset ];
			} );
		} );
	} );

	return Rows( image, rows );
}