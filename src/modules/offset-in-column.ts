import { each, random, isNil, isNumber, isFunction, isString, isArray } from 'lodash';
import Jimp from 'jimp';
import Utils from './utils';
import Columns from './columns';
import {
	Glitch,
	GlitchColumn
} from '../config/types';
import { RgbKeys } from '../utils/channels';
import { Parameter } from '../utils/parameters';
import { GlitchPixel } from '../modules/pixel';

export type OffsetFuction = ( glitch: Glitch, index: number ) => number;

export default function OffsetInColumns( glitch: Glitch, keys: RgbKeys, offset: void | OffsetFuction | Parameter ) {

	if ( isNil( glitch ) ) {
		console.log( 'Image is not defined in Offset.module.' );
	}

	let offsetValue;
	let baseValue = glitch.image.bitmap.height;

	if ( isNumber( offset ) ) {
		offset = ~~( Math.round( <number>offset ) );
		if ( offset > baseValue || offset < -baseValue ) {
			offsetValue = <number>offset % baseValue;
		} else {
			offsetValue = offset;
		}
	} else if ( isNil( offset ) ) {
		offsetValue = random( baseValue );
	}

	if ( !isFunction( offset ) ) {
		console.log( 'Offsetting ' + keys + ' in columns by ' + offsetValue + ' pixels...' );
	}

	if ( isNil( keys ) ) {
		return glitch;
	}

	let _keys: RgbKeys[] = [];

	if ( isString( keys ) ) {
		_keys = [ keys ];
	} else if ( !isArray( keys ) ) {
		return glitch;
	}

	let columns = [];

	each( glitch.columns, ( column: GlitchColumn, colIndex: number ) => {
		columns[ colIndex ] = [];

		if ( isFunction( offset ) ) {
			offsetValue = ( offset as OffsetFuction )( glitch, colIndex );
		}

		each( column, ( pixel: GlitchPixel, index: number ) => {
			let pixelOffset = Utils.getPixelOffset( index, offsetValue, baseValue );
			columns[ colIndex ][ index ] = pixel;

			each( keys, ( k: RgbKeys ) => {
				columns[ colIndex ][ index ][ k ] = Utils.getChannel( glitch, k )[ colIndex ][ pixelOffset ];
			} );
		} );
	} );

	return Columns( glitch, columns );
}