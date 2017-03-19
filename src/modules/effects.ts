import { each, isUndefined, isNull } from 'lodash';
import * as Promise from 'bluebird';
import * as Jimp from 'jimp';

export class Effects {
	constructor( image: Jimp ) {
		if ( isUndefined( image ) ) {
			return;
		}
	}
};