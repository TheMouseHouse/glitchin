import { isNil } from 'lodash';
import Process from './process';
import * as Promise from 'bluebird';
import * as Jimp from 'jimp';
import { LayerConfig, JimpLike, JimpImage, Glimage, GJimp } from '../config/types';

export default function Loader( layer: LayerConfig ): Promise<Glimage> {

	if ( isNil( layer ) || isNil( layer.file ) ) {
		return;
	}

	const jimp = Jimp as JimpLike;

	return jimp.read( layer.file ).then(( image: JimpImage ) => {
		const ext = layer.file.substr( -4, 4 );
		let mime: string;

		try {
			if ( ext === '.jpg' || ext === 'jpeg' ) {
				mime = jimp.MIME_JPEG;
			} else if ( ext === '.png' ) {
				mime = jimp.MIME_PNG;
			} else if ( ext === '.bmp' ) {
				mime = jimp.MIME_BMP;
			}

			( image as Glimage ).bitmap.mime = mime;
		} catch ( e ) {
			throw `File type not supported - ${ext}. Error: ${e}`;
		}

		return Process( image as Glimage, layer.effects );
	} ).catch( error => console.error );
}