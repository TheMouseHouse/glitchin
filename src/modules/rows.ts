import { isUndefined, isNull } from 'lodash';
import RowsToData from './rows-to-data';
import DataToColumns from './data-to-columns';
import * as Jimp from 'jimp';

export default function Rows( image: Jimp, rows: any[] ) {
	if ( isUndefined( image ) || isNull( image ) ) {
		throw new Error( 'modules/rows: image undefined' );
	}
	if ( isUndefined( rows ) || isNull( rows ) ) {
		throw new Error( 'modules/rows: rows undefined' );
	}

	image.glitch.rows = rows;
	image.glitch.data = RowsToData( image );
	image.glitch.columns = DataToColumns( image );

	return image;
}