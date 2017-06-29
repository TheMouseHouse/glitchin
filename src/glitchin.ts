import { map, each, isNil, has } from 'lodash';
import Loader from './modules/loader';
import Assemble from './modules/assemble';
import Composite from './modules/composite';
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

	private _layers: Layers = [];

	constructor( layerConfigs: LayerConfig[], outputConfig: OutputConfig ) {
		if ( isNil( layerConfigs ) || isNil( outputConfig ) ) {
			return;
		}

		Promise.all( this._mapPromises( layerConfigs ) )
			.then(() => { return Assemble( this._layers ); } )
			.then(( images: Jimp[] ) => { return Composite( images ); } )
			.then(( image: Jimp ) => Render( image, outputConfig.output ) )
			.catch( err => console.log( err ) );
	}

	private _setLayer( index: number, layer: Layer ) {
		this._layers[ index ] = layer;
	}

	private _mapPromises( layerConfigs: LayerConfig[] ): Promise<Jimp>[] {
		let promises = [];

		each( layerConfigs, ( layer: LayerConfig, index: number ) => {
			console.log( 'Loading', layer.file, layer );

			promises.push(
				new Promise(( resolve: () => void, reject: ( error: string ) => void ) => {
					Loader( layer ).then(( glitch: Glitch ) => {
						this._setLayer( index, { params: layer, glitch: glitch } );
						resolve();
					} ).catch(( error: string ) => {
						console.error( error );
						reject( error );
					} );
				} )
			);

		} );

		return promises;
	}
}