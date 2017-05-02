import { isNil } from 'lodash';
import * as Jimp from 'jimp';
import {
	Glitch,
	GlitchRow
} from '../config/types';
import { GlitchPixel } from '../modules/pixel';

export default function DataToRows( glitch: Glitch ): GlitchRow[] {
	const width = glitch.width;
	let yIndex = 0;
	let rows: GlitchRow[] = [];

	for ( let i = 0; i < glitch.data.length; i++ ) {
		const pixel: GlitchPixel = glitch.data[ i ];

		if ( isNil( rows[ yIndex ] ) ) {
			rows[ yIndex ] = [];
		}

		rows[ yIndex ].push( pixel );

		if ( i % width === 0 && i !== 0 ) {
			yIndex++;
		}
	}

	return rows;
}