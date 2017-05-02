import { isUndefined } from 'lodash';
import * as Jimp from 'jimp';

export default function DataToRows( image: Jimp ) {
	const width = image.glitch.width;
	let yIndex = 0;
	let rows = [];

	for ( let i = 0; i < image.glitch.data.length; i++ ) {
		const pixel = image.glitch.data[ i ];

		if ( isUndefined( rows[ yIndex ] ) ) {
			rows[ yIndex ] = [];
		}

		rows[ yIndex ].push( pixel );

		if ( i % width === 0 && i !== 0 ) {
			yIndex++;
		}
	}

	return rows;
}