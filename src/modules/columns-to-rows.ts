import { each, isNil } from 'lodash';
import * as Jimp from 'jimp';
import {
	GlitchRow,
	GlitchColumn
} from '../config/types';
import { GlitchPixel } from '../modules/pixel';

export default function ColumnsToData( columns: GlitchColumn[] ): GlitchRow[] {
	let rows: GlitchRow[] = [];

	each( columns, ( column: GlitchColumn, colIndex: number ) => {
		each( column, ( pixel: GlitchPixel, pixelIndex: number ) => {
			if ( isNil( rows[ pixelIndex ] ) ) {
				rows[ pixelIndex ] = [];
			}
			rows[ pixelIndex ][ colIndex ] = pixel;
		} );
	} );

	return rows;
}