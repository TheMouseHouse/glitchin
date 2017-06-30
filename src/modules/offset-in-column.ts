import { each, random, isNil, isNumber, isFunction, isString, isArray } from 'lodash';
import * as Jimp from 'jimp';
import Logger from '../utils/logger';
import Utils from './utils';
import Columns from './columns';
import {
	Glitch,
	GlitchColumn
} from '../config/types';
import { RgbaKeys } from '../utils/channels';
import { Parameter } from '../utils/parameters';
import { GlitchPixel } from '../modules/pixel';

export type OffsetFuction = ( glitch: Glitch, index: number ) => number;

export default function OffsetInColumns( glitch: Glitch, keys: RgbaKeys, offset?: OffsetFuction | Parameter ) {

	if ( isNil( glitch ) ) {
		Logger( 'log', 'Image is not defined in Offset.module.' );
	}

	let offsetValue: number | OffsetFuction | Parameter;
	let baseValue = glitch.height;

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
		Logger( 'log', 'Offsetting ' + keys + ' in columns by ' + offsetValue + ' pixels...' );
	}

	if ( isNil( keys ) ) {
		return glitch;
	}

	let _keys: RgbaKeys[] = [];

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
			let pixelOffset = Utils.getIndexOffset( index, <number>offsetValue, baseValue );
			columns[ colIndex ][ index ] = pixel;

			each( keys, ( k: RgbaKeys ) => {
				columns[ colIndex ][ index ][ k ] = Utils.getChannel( glitch, k )[ colIndex ][ pixelOffset ];
			} );
		} );
	} );

	return Columns( glitch, columns );
}