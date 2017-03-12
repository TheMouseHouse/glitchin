import { each, isUndefined, isNull } from 'lodash';
import { Promise } from 'bluebird';
import { Process } from './process';
import Jimp from 'jimp';

export class Loader {
	constructor( file ) {

		if ( isUndefined( file ) ) {
			return;
		}

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

				image.bitmap.mime = mime;
			} catch ( e ) {
				throw `File type not supported - ${ext}`;
			}

			return image;// Process( image );
		} ).catch( error => console.error );
	}
};