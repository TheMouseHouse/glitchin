import { each, isNil, has } from 'lodash';
import Loader from './modules/loader';
import Render from './modules/render';
import Pixel from './modules/pixel';
import * as Promise from 'bluebird';
import * as Jimp from 'jimp';
import { Layer, Layers, LayerConfig, OutputConfig, GJimp, Glitch, JimpBitmap } from './config/types';

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
				new Promise(( resolve: Function, reject: Function ) => {
					Loader( layer ).then(( gjimp: GJimp ) => {
						this._layers[ index ] = { params: layer, jimp: gjimp };
						resolve();
					} ).catch( error => {
						console.error( error );
						resolve( error );
					} );
				} )
			);
		} );

		Promise.all( this._promises ).then(() => {
			console.log( 'Compositing...' );

			let bitmap = ( this._layers[ 0 ].jimp as GJimp ).bitmap;
			let output = new Jimp( bitmap.width, bitmap.height, ( error: string, image: GJimp ) => {
				if ( !isNil( error ) ) { return; }

				each( this._layers.reverse(), ( layer: Layer ) => {
					if ( layer.params.opacity > 0 ) {
						let layerJimp = layer.jimp as GJimp;
						let layerGlitchData = layerJimp.glitch && layerJimp.glitch.data;

						if ( !!layerGlitchData ) {
							let index = 0;

							layerJimp.scan(
								0, 0,
								layerJimp.bitmap.width,
								layerJimp.bitmap.height,

								function ( x: number, y: number, idx: number ) {
									const pixel = layerGlitchData[ index ];
									let layerBitmapData = ( this.bitmap as JimpBitmap ).data;

									layerBitmapData[ idx + 0 ] = pixel.r;
									layerBitmapData[ idx + 1 ] = pixel.g;
									layerBitmapData[ idx + 2 ] = pixel.b;
									layerBitmapData[ idx + 3 ] = pixel.a;
								}
							);
						}

						layerJimp.opacity( layer.params.opacity / 100 );
						image.composite( layerJimp, 0, 0 );
					}
				} );

				Render( image, outputConfig.output );
			} );
		} );
	}
}