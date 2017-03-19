import { flatten } from 'lodash';
import * as Jimp from 'jimp';

export default function RowsToData( image: Jimp ) {
	return flatten( image.glitch.rows );
};