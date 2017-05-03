import { each, isNil, has } from 'lodash';
import Loader from './modules/loader';
import Render from './modules/render';
import Pixel from './modules/pixel';
import * as Promise from 'bluebird';
import * as Jimp from 'jimp';
import {
	Layer,
	Layers,
	LayerConfig,
	OutputConfig,
	JimpLike,
	GJimp,
	Glimage,
	Glitch,
	JimpImage,
	GlimageBitmap
} from './config/types';

export class Glitchin {

	private _promises: Promise<void>[] = [];
	private _layers: Layers = [];

	constructor( layerConfigs: LayerConfig[], outputConfig: OutputConfig ) {
		if ( isNil( layerConfigs ) || isNil( outputConfig ) ) {
			return;
		}

		each( layerConfigs, ( layer: LayerConfig, index: number ) => {
			console.log( 'Loading', layer.file, layer );

			this._promises.push(
				new Promise(( resolve: () => void, reject: ( error: string ) => void ) => {
					Loader( layer ).then(( glimage: Glimage ) => {
						this._layers[ index ] = { params: layer, glimage: glimage };
						resolve();
					} ).catch(( error: string ) => {
						console.error( error );
						reject( error );
					} );
				} )
			);
		} );

		Promise.all( this._promises ).then(() => {
			console.log( 'Compositing...' );

			let bitmap = this._layers[ 0 ].glimage.bitmap;
			let output = new Jimp( bitmap.width, bitmap.height, ( error: string, image: JimpImage ) => {
				if ( !isNil( error ) ) { return; }

				each( this._layers.reverse(), ( layer: Layer ) => {
					if ( layer.params.opacity > 0 ) {
						let glimage = layer.glimage;

						if ( !!glimage.glitch && !!glimage.glitch.data ) {
							let index = 0;

							glimage.scan(
								0, 0,
								glimage.bitmap.width,
								glimage.bitmap.height,

								function ( x: number, y: number, idx: number ) {
									const pixel = glimage.glitch.data[ index ];
									this.bitmap.data[ idx + 0 ] = pixel.r;
									this.bitmap.data[ idx + 1 ] = pixel.g;
									this.bitmap.data[ idx + 2 ] = pixel.b;
									this.bitmap.data[ idx + 3 ] = pixel.a;
								}
							);
						}

						glimage.opacity( layer.params.opacity / 100 );
						image.composite( glimage, 0, 0 );
					}
				} );

				Render( <Glimage>image, outputConfig.output );
			} );
		} );
	}
}