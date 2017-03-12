import 'babel-polyfill';
import { each, isUndefined } from 'lodash';
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
			if ( layer.opacity > 0 ) {
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
			}
		} );

		Promise.all( this.layers ).then(() => {
			console.log( 'Images loaded. Glitching...' );
			Promise.all( this.promises, () => {
				let output = new Jimp( this.layers[ 0 ].bitmap.width, this.layers[ 0 ].bitmap.height, ( error, image ) => {
					if ( !!error ) {
						return;
					}
					each( this.layers.reverse(), layer => {
						image.opacity( layer.layer.opacity / 100 );
						image.composite( layer.bitmap, 0, 0 );
					} );
					Render( image, config.output );
				} )
			} );
		} );
	}
}