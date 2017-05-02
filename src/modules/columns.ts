import { each, isUndefined, isNull } from 'lodash';
import ColumnsToData from './columns-to-data';
import DataToRows from './data-to-rows';
import * as Jimp from 'jimp';

export default function Columns( image: Jimp, columns ) {
	if ( isUndefined( image ) || isNull( image ) ) {
		throw new Error( 'modules/columns: image undefined' );
	}
	if ( isUndefined( columns ) || isNull( columns ) ) {
		throw new Error( 'modules/columns: columns undefined' );
	}

	image.glitch.columns = columns;
	image.glitch.data = ColumnsToData( image );
	image.glitch.rows = DataToRows( image );

	return image;
}