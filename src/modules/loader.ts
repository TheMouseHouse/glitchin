import { each, isUndefined, isNull } from 'lodash';
import Process from './process';
import * as Promise from 'bluebird';
import * as Jimp from 'jimp';

export default function Loader( layer ) {

	if ( isUndefined( layer ) || isUndefined( layer.file ) ) {
		return;
	}

	return Jimp.read( layer.file ).then( image => {
		let mime;
		const ext = layer.file.substr( -4, 4 );

		try {
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

		return Process( image, layer.effects );
	} ).catch( error => console.error );
}