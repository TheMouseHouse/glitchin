import { each, isNil, isArray } from 'lodash';
import * as Jimp from 'jimp';
import * as Promise from 'bluebird';

export default function Composite( images: Jimp[] ): Promise<Jimp> {
	if ( isNil( images ) || ( isArray( images ) && images.length === 0 ) ) {
		throw new Error( 'modules/composite: No images' );
	}

	console.log( 'Compositing', images.length, 'images.' );

	return new Promise(( resolve: ( image: Jimp ) => void, reject: ( err: Error ) => void ) => {
		new Jimp( images[ 0 ].bitmap.width, images[ 0 ].bitmap.height, ( err: Error, image: Jimp ) => {
			each( images, comp => {
				image.composite( comp, 0, 0 );
			} );
			resolve( image );
		} );
	} );
}