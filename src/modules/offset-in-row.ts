import { each, random, isUndefined, isNumber, isFunction, isString, isArray } from 'lodash';
import Logger from '../utils/logger';
import * as Jimp from 'jimp';
import Utils from './utils';
import Rows from './rows';
import { Glimage } from '../config/types';

export default function OffsetInRows( image: Glimage, keys, offset ) {
	if ( isUndefined( image ) ) {
		Logger( 'log', 'Image is not defined in Offset.module.' );
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
			const pixelOffset = Utils.getIndexOffset( index, offsetValue, baseValue );
			rows[ rowIndex ][ index ] = pixel;

			each( keys, k => {
				rows[ rowIndex ][ index ][ k ] = Utils.getChannel( image.glitch, k )[ rowIndex ][ pixelOffset ];
			} );
		} );
	} );

	return Rows( image, rows );
}