import { find, isNil, isNumber, random, size, each, sampleSize, has } from 'lodash';
import Logger from '../utils/logger';
import Constants from '../config/constants';

export type Parameter = { r?: number, g?: number, b?: number, a?: number };

export default class Parameters {

	static createRgbParameters( range?: number ): Parameter {
		Logger( 'log', 'Creating random parameters...' );

		let possibleParameters = Constants.POSSIBLE_CHANNELS,
			randomRange = ( isNil( range ) || !isNumber( range ) ) ? random( 100 ) : random( range ),
			offset = {};

		if ( isNil( offset ) || size( offset ) < 1 ) {
			let sampleLength = random( possibleParameters.length - 1 );

			if ( sampleLength <= 0 ) {
				sampleLength = 1;
			}

			each( sampleSize( possibleParameters, sampleLength ), parameter => {
				offset[ parameter ] = randomRange;
			} );
		}

		return offset;
	}

	static hasRgbParameter( offset?: Parameter ): boolean {
		return !isNil( offset ) && ( !isNil( offset.r ) || !isNil( offset.g ) || !isNil( offset.b ) || !isNil( offset.a ) );
	}
}