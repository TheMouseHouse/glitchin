import { each, isNil } from 'lodash';
import Pixel from './pixel';
import OffsetRgbCols from '../filters/offset-columns';
import * as Promise from 'bluebird';
import * as Jimp from 'jimp';
import {
	Glitch,
	Effects
} from '../config/types';

export default function Process( image: Jimp, mime: string, effects: Effects ): Promise<Glitch> {
	return new Promise(( resolve: ( glitch: Glitch ) => void, reject: () => void ) => {
		if ( isNil( image ) ) { reject(); }

		const data = image.bitmap.data;
		const width = image.bitmap.width;
		const height = image.bitmap.height;

		let glitch: Glitch = {
			data: [],
			rows: [],
			columns: [],
			mime: mime,
			width: width,
			height: height
		};

		image.scan( 0, 0, width, height, ( x: number, y: number, idx: number ) => {
			const pixel = Pixel( x, y, idx, data );
			glitch.data.push( pixel );

			if ( isNil( glitch.rows[ y ] ) ) {
				glitch.rows[ y ] = [];
			}

			if ( isNil( glitch.columns[ x ] ) ) {
				glitch.columns[ x ] = [];
			}

			glitch.rows[ y ].push( pixel );
			glitch.columns[ x ].push( pixel );
		} );

		if ( !isNil( effects ) && effects.length > 0 ) {
			console.log( 'Applying effects...' );

			each( effects, effect => {
				console.log( effect );

				switch ( String( effect.type ).toLowerCase() ) {
					case 'offsetrgbcols':
						glitch = OffsetRgbCols( glitch, effect.params );
						break;
				}
			} );
		}

		resolve( glitch );
	} ).catch( error => console.error );

}