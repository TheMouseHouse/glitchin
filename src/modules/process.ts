import { each, isNil } from 'lodash';
import Pixel from './pixel';
import OffsetRgbCols from '../filters/offset-columns';
import * as Promise from 'bluebird';
import * as Jimp from 'jimp';
import {
	Glimage,
	Glitch,
	Effects
} from '../config/types';

export default function Process( glimage: Glimage, effects: Effects ): Glimage {

	return new Promise(( resolve: ( glimage: Glimage ) => void, reject: () => void ) => {
		if ( isNil( glimage ) ) { reject(); }

		const data = glimage.bitmap.data;
		const width = glimage.bitmap.width;
		const height = glimage.bitmap.height;

		let glitch: Glitch = {
			image: glimage,
			data: [],
			rows: [],
			columns: [],
			width: width,
			height: height
		};

		glimage.scan( 0, 0, width, height, ( x: number, y: number, idx: number ) => {
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
			glimage.glitch = glitch;

			each( effects, effect => {
				console.log( effect );

				switch ( String( effect.type ).toLowerCase() ) {
					case 'offsetrgbcols':
						glimage.glitch = OffsetRgbCols( glimage.glitch, effect.params );
						break;
				}
			} );
		} else {
			glimage.getBuffer( glimage.bitmap.mime, ( buffer: Buffer ) => glimage.bitmap.data = buffer );
		}

		resolve( glimage );
	} ).catch( error => console.error );

}