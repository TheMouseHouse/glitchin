import { each, has, isUndefined, isNil } from 'lodash';
import * as  Promise from 'bluebird';
import {
	Glimage
} from '../config/types';

export default function Render( glimage: Glimage, output: string ) {
	console.log( 'Rendering...' );

	if ( output !== 'base64' ) {
		glimage.write( output );
		console.log( 'Done.' );
	} else {
		return new Promise(( resolve: ( payload: string ) => void, reject: () => void ) => {
			if ( isNil( glimage ) ) {
				reject();
			}

			glimage.getBuffer( glimage.bitmap.mime, ( err: string, buffer: Buffer ) => {
				if ( !isNil( err ) ) {
					resolve( err );
				} else {
					resolve( buffer.toString( 'base64' ) );
				}
				buffer = null;
				glimage = null;
			} );
		} ).catch( error => console.error );
	}
}