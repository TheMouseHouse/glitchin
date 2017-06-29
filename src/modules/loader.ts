import { isNil } from 'lodash';
import Process from './process';
import * as Promise from 'bluebird';
import * as Jimp from 'jimp';
import { LayerConfig, Glitch } from '../config/types';

export default function Loader( layer: LayerConfig ): Promise<Glitch> {

	if ( isNil( layer ) || isNil( layer.file ) ) {
		return Promise.reject();
	}

	return Jimp.read( layer.file ).then( image => {
		const mime = getMime( layer.file );
		return Process( image, mime, layer.effects );
	} );
}

export function getMime( file: string ): string {
	const extension = file.substr( -4, 4 );

	try {
		if ( extension === '.jpg' || extension === 'jpeg' ) {
			return Jimp.MIME_JPEG;
		} else if ( extension === '.png' ) {
			return Jimp.MIME_PNG;
		} else if ( extension === '.bmp' ) {
			return Jimp.MIME_BMP;
		}
	} catch ( e ) {
		throw `File type not supported - ${extension}. Error: ${e}`;
	}
}