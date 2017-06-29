import { each, isNil, isArray } from 'lodash';
import * as Jimp from 'jimp';
import * as Promise from 'bluebird';
import { Layer, Layers } from '../config/types';
export default function Assemble( layers: Layers ): Promise<Jimp[]> {
	if ( isNil( layers ) || ( isArray( layers ) && layers.length === 0 ) ) {
		throw new Error( 'modules/composite: No images' );
	}

	console.log( 'Assembling...' );

	return new Promise(( resolve: ( images: Jimp[] ) => void, reject: ( err: Error ) => void ) => {
		let jimps: Jimp[] = [];

		each( layers, ( layer: Layer, index: number ) => {
			if ( layer.params.opacity > 0 ) {
				new Jimp( layer.glitch.width, layer.glitch.height, ( err: Error, image: Jimp ) => {
					image.scan(
						0, 0,
						image.bitmap.width,
						image.bitmap.height,

						( x: number, y: number, idx: number ) => {
							const pixel = layer.glitch.data[ idx / 4 ];
							image.bitmap.data[ idx + 0 ] = pixel.r;
							image.bitmap.data[ idx + 1 ] = pixel.g;
							image.bitmap.data[ idx + 2 ] = pixel.b;
							image.bitmap.data[ idx + 3 ] = pixel.a;
						}
					);
					image.opacity( layer.params.opacity / 100 );
					jimps[ index ] = image;
				} );
			}
		} );

		resolve( jimps );
	} );
}