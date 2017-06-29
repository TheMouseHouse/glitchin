import { each, has, isUndefined, isNil } from 'lodash';
import * as  Promise from 'bluebird';
import * as Jimp from 'jimp';
import { getMime } from '../modules/loader';

export default function Render( image: Jimp, output: string ) {
	console.log( 'Rendering...' );

	if ( output !== 'base64' ) {
		image.write( output );
		console.log( 'Done.' );
	} else {
		return new Promise(( resolve: ( payload: string ) => void, reject: ( err: Error ) => void ) => {
			if ( isNil( image ) ) {
				reject( new Error( 'Render() - Object "image" undefined.' ) );
			}

			image.getBuffer( getMime( output ), ( err: Error, buffer: Buffer ) => {
				if ( !isNil( err ) ) {
					reject( err );
				} else {
					resolve( buffer.toString( 'base64' ) );
				}
				buffer = null;
				image = null;
			} );
		} ).catch( error => console.error );
	}
}