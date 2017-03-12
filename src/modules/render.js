import { each, has, isUndefined, isNull } from 'lodash';
import { Promise } from 'bluebird';

export function Render( image, output ) {
	console.log( 'Rendering...' );

	let index = 0,
		bitmap = image.bitmap.data,
		glitch = null;

	if ( has( image, 'glitch' ) ) {
		glitch = image.glitch.data;
	}

	if ( !isNull( glitch ) ) {
		each( glitch, ( pixel ) => {
			bitmap[ index ] = pixel.r;
			bitmap[ index + 1 ] = pixel.g;
			bitmap[ index + 2 ] = pixel.b;
			bitmap[ index + 3 ] = pixel.a;
			index += 4;
		} );
	}

	if ( output !== 'base64' ) {
		image.write( output );
	} else {
		return new Promise(( resolve, reject ) => {
			if ( isUndefined( image ) || isNull( image ) ) {
				reject();
			}

			image.getBuffer( image.bitmap.mime, ( err, buffer ) => {
				if ( !isNull( err ) ) {
					resolve( err );
				} else {
					resolve( buffer.toString( 'base64' ) );
				}
				buffer = null;
				image = null;
				bitmap = null;
			} );
		} ).catch( error => console.error );
	}
};