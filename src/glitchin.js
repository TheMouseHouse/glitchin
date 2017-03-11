import { each, isUndefined, isNull } from 'lodash';
import { options } from './options';
import * as Jimp from 'jimp';
import { Pixel } from './modules/pixel';
import { Promise } from 'bluebird';

import { Render } from './modules/render';


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

function processBuffer( image ) {
	return new Promise(( resolve, reject ) => {
		if ( isUndefined( image ) || isNull( image ) ) {
			reject();
		}

		var data = image.bitmap.data,
			width = image.bitmap.width,
			height = image.bitmap.height,

			glitch = {
				image: image,
				data: [],
				rows: [],
				columns: [],
				width: width,
				height: height
			};

		image.scan( 0, 0, width, height, ( x, y, idx ) => {
			var pixel = new Pixel( x, y, idx, data );
			glitch.data.push( pixel );

			if ( isUndefined( glitch.rows[ y ] ) ) {
				glitch.rows[ y ] = [];
			}

			if ( isUndefined( glitch.columns[ x ] ) ) {
				glitch.columns[ x ] = [];
			}

			glitch.rows[ y ].push( pixel );
			glitch.columns[ x ].push( pixel );
		} );

		image.glitch = glitch;

		image.render = ( output ) => {
			return Render( image, output );
		};

		resolve( image );
	} ).catch( error => console.error );

}

export function Glitchin( file, opts ) {
	each( opts, ( value, key ) => {
		options[ key ] = value;
	} );

	return Jimp.read( file ).then( image => {
		let mime;

		try {
			const ext = file.substr( -4, 4 );

			if ( ext === '.jpg' || ext === 'jpeg' ) {
				mime = Jimp.MIME_JPEG;
			} else if ( ext === '.png' ) {
				mime = Jimp.MIME_PNG;
			} else if ( ext === '.bmp' ) {
				mime = Jimp.MIME_BMP;
			}
		} catch ( e ) {
			mime = options.mime;
		} finally {
			image.bitmap.mime = mime;
		}

		return processBuffer( image );
	} ).catch( error => console.error );
}

module.exports = Glitchin;