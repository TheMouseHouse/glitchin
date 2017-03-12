import 'babel-polyfill';
import { each, isUndefined, isNull } from 'lodash';
import Jimp from 'jimp';
import { Promise } from 'bluebird';
import { Loader } from './modules/loader';
import { Render } from './modules/render';

export class Glitchin {
	constructor( layers, config ) {
		if ( isUndefined( layers ) || isUndefined( config ) ) {
			return;
		}

		this.promises = [];
		this.layers = [];

		each( layers, ( layer, index ) => {
			this.promises.push(
				new Promise(( resolve, reject ) => {
					new Loader( layer.file ).then( jimp => {
						this.layers[ index ] = { params: layer, jimp: jimp };
						resolve();
					} ).catch( error => {
						console.error( error );
						resolve( error );
					} );
				} )
			);
		} );

		Promise.all( this.promises ).then(() => {
			console.log( 'Images loaded. Glitching...' );

			const bitmap = this.layers[ 0 ].jimp.bitmap;

			let output = new Jimp( bitmap.width, bitmap.height, ( error, image ) => {
				if ( !isNull( error ) ) {
					return;
				}
				each( this.layers.reverse(), layer => {
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