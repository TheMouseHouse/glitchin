import { each, isUndefined, isNull } from 'lodash';
import { Promise } from 'bluebird';

export function Render( image, output ) {

	var index = 0,
		glitch = image.glitch.data,
		bitmap = image.bitmap.data;

	each( glitch, ( pixel ) => {
		bitmap[ index ] = pixel.r;
		bitmap[ index + 1 ] = pixel.g;
		bitmap[ index + 2 ] = pixel.b;
		bitmap[ index + 3 ] = pixel.a;
		index += 4;
	} );

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