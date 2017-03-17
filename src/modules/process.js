import { each, isUndefined, isNull } from 'lodash';
import { Promise } from 'bluebird';
import { Pixel } from './pixel';

import { OffsetRgbCols } from '../filters/offset-columns';

export function Process( image, effects ) {

	return new Promise(( resolve, reject ) => {
		if ( isUndefined( image ) || isNull( image ) ) {
			reject();
		}

		var data = image.bitmap.data,
			width = image.bitmap.width,
			height = image.bitmap.height,

			glitch = {
				image: image,
				data: [],
				rows: [],
				columns: [],
				width: width,
				height: height
			};

		image.scan( 0, 0, width, height, ( x, y, idx ) => {
			var pixel = new Pixel( x, y, idx, data );
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

		image.glitch = glitch;

		if ( !isUndefined( effects ) && effects.length > 0 ) {
			console.log( 'Applying glitch...' );

			each( effects, effect => {
				switch ( String( effect.type ).toLowerCase() ) {
					case 'offsetrgbcols':
						console.log( effect );
						image.glitch = OffsetRgbCols( image, effect.params );
						break;
				}
			} );
		}

		resolve( image );
	} ).catch( error => console.error );

};