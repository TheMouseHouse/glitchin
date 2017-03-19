import { each, isUndefined } from 'lodash';
import * as Jimp from 'jimp';

export default function ColumnsToData( image: Jimp ): any[] {
	let rows = [];

	each( image.glitch.columns, ( column, colIndex ) => {
		each( column, ( pixel, pixelIndex ) => {
			if ( isUndefined( rows[ pixelIndex ] ) ) {
				rows[ pixelIndex ] = [];
			}
			rows[ pixelIndex ][ colIndex ] = pixel;
		} );
	} );

	return rows;
};