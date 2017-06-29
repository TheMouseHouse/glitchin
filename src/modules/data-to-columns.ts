import { isUndefined } from 'lodash';
import { Glimage } from '../config/types';

export default function DataToColumns( image: Glimage ) {
	const width = image.glitch.width;
	let columns = [];

	for ( let i = 0; i < image.glitch.data.length; i++ ) {
		const pixel = image.glitch.data[ i ];
		const colIndex = i % width;

		if ( isUndefined( columns[ colIndex ] ) ) {
			columns[ colIndex ] = [];
		}

		columns[ colIndex ].push( pixel );
	}

	return columns;
}