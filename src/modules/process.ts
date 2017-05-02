import { each, isUndefined, isNil } from 'lodash';
import Pixel from './pixel';
import OffsetRgbCols from '../filters/offset-columns';
import * as Promise from 'bluebird';
import * as Jimp from 'jimp';

export default function Process( image, effects ) {

	return new Promise(( resolve, reject ) => {
		if ( isNil( image ) ) { reject(); }

		const data = image.bitmap.data;
		const width = image.bitmap.width;
		const height = image.bitmap.height;

		let glitch = {
			image: image,
			data: [],
			rows: [],
			columns: [],
			width: width,
			height: height
		};

		image.scan( 0, 0, width, height, ( x, y, idx ) => {
			let pixel = Pixel( x, y, idx, data );
			glitch.data.push( pixel );

			if ( isUndefined( glitch.rows[ y ] ) ) {
				glitch.rows[ y ] = [];
			}

			if ( isUndefined( glitch.columns[ x ] ) ) {
				glitch.columns[ x ] = [];
			}

			glitch.rows[ y ].push( pixel );
			glitch.columns[ x ].push( pixel );
		} );



		if ( !isUndefined( effects ) && effects.length > 0 ) {
			console.log( 'Applying effects...' );
			image.glitch = glitch;

			each( effects, effect => {
				console.log( effect );

				switch ( String( effect.type ).toLowerCase() ) {
					case 'offsetrgbcols':
						image.glitch = OffsetRgbCols( image.glitch, effect.params );
						break;
				}
			} );
		} else {
			image.glitch = image;
		}

		resolve( image );
	} ).catch( error => console.error );

}