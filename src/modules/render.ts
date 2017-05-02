import { each, has, isUndefined, isNil } from 'lodash';
import * as  Promise from 'bluebird';

export default function Render( image, output ) {
	console.log( 'Rendering...' );

	if ( output !== 'base64' ) {
		image.write( output );
		console.log( 'Done.' );
	} else {
		return new Promise(( resolve, reject ) => {
			if ( isNil( image ) ) {
				reject();
			}

			image.getBuffer( image.bitmap.mime, ( err, buffer ) => {
				if ( !isNil( err ) ) {
					resolve( err );
				} else {
					resolve( buffer.toString( 'base64' ) );
				}
				buffer = null;
				image = null;
			} );
		} ).catch( error => console.error );
	}
}