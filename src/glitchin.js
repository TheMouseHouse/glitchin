import 'babel-polyfill';
import { each, isUndefined } from 'lodash';
import * as Jimp from 'jimp';
import { Promise } from 'bluebird';
import { Loader } from './modules/loader';


function makeAPI( image ) {
	image.render = ( output ) => {
		// return require( './modules/render' )( image, output );
		return render( image, output );
	};

	// image.rows = function ( rows ) {
	// 	return require( './modules/rows' )( image, rows );
	// };

	// image.columns = function ( columns ) {
	// 	return require( './modules/columns' )( image, columns );
	// };

	// image.dataToRows = function () {
	// 	return require( './modules/data-to-rows' )( image );
	// };

	// image.dataToColumns = function () {
	// 	return require( './modules/data-to-columns' )( image );
	// };

	// image.rowsToData = function () {
	// 	return require( './modules/rows-to-data' )( image );
	// };

	// image.columnsToData = function () {
	// 	return require( './modules/columns-to-data' )( image );
	// };

	// image.simpleRowSort = function () {
	// 	return require( './filters/simple-sort-row' )( image );
	// };

	// image.simpleColumnSort = function () {
	// 	return require( './filters/simple-sort-column' )( image );
	// };

	// image.offsetRows = function ( offset ) {
	// 	return require( './filters/offset-rows' )( image, offset );
	// };

	// image.offsetColumns = function ( offset ) {
	// 	return require( './filters/offset-columns' )( image, offset );
	// };

	// image.custom = function ( customSortFunc ) {
	// 	return customSortFunc( image );
	// };

	return image;
}

export class Glitchin {

	constructor( config ) {
		if ( isUndefined( config ) ) {
			return;
		}

		this.layers = [];

		each( config, c => {
			console.log( c.file, c.opacity );

			this.layers.push(
				new Promise(( resolve, reject ) => {
					new Loader( c.file ).then( image => {
						resolve( image );
					} ).catch( error => {
						console.error( error );
						resolve( error );
					} );
				} )
			);
		} );

		Promise.all( this.layers ).then(() => {
			console.log( 'All done. Layers length: ', this.layers.length );
			console.log( this.layers[ 0 ] );
		} );
	}
}

// module.exports = Glitchin_;