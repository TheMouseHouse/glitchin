import { each, isUndefined, isNull, has } from 'lodash';
import Loader from './modules/loader';
import Render from './modules/render';
import * as Promise from 'bluebird';
import * as Jimp from 'jimp';

export type Effect = {
	type: 'offsetRgbCols';
	params: {
		r?: number;
		g?: number;
		b?: number;
		func?: Function;
	}
}

export type Effects = Effect[];

export type ConfigLayer = {
	file: string;
	opacity?: number;
	effects?: Effects;
}

export type Layer = {
	params: ConfigLayer,
	jimp: Jimp
}

export type Layers = Layer[];

export class Glitchin {

	private _promises: Promise<any>[];
	private _layers: Layers;

	constructor( configLayers: ConfigLayer[], config ) {
		if ( isUndefined( configLayers ) || isUndefined( config ) ) {
			return;
		}

		this._promises = [];
		this._layers = [] as Layers;

		each( configLayers, ( layer: ConfigLayer, index: number ) => {
			console.log( 'Loading', layer.file, layer );

			this._promises.push(
				new Promise(( resolve, reject ) => {
					Loader( layer ).then( jimp => {
						this._layers[ index ] = { params: layer, jimp: jimp };
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

			const bitmap = this._layers[ 0 ].jimp.bitmap;
			let output = new Jimp( bitmap.width, bitmap.height, ( error, image ) => {
				if ( !isNull( error ) ) {
					return;
				}
				each( this._layers.reverse(), layer => {
					if ( layer.params.opacity > 0 ) {
						layer.jimp.opacity( layer.params.opacity / 100 );
						image.composite( layer.jimp, 0, 0 );
					}
				} );
				Render( image, config.output );
			} )
		} );
	}
}