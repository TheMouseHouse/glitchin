import { find, isUndefined, isNumber, random, size, each, sampleSize, has } from 'lodash';
import Constants from '../config/constants';

export default class Parameters {

	static createRgbParameters( range?: any ): any {
		console.log( 'Creating random parameters...' );

		let possibleParameters = Constants.POSSIBLE_CHANNELS,
			randomRange = ( isUndefined( range ) || !isNumber( range ) ) ? random( 100 ) : random( range ),
			offset = {};

		if ( isUndefined( offset ) || size( offset ) < 1 ) {
			let sampleLength = random( possibleParameters.length - 1 );

			if ( sampleLength <= 0 ) {
				sampleLength = 1
			}

			each( sampleSize( possibleParameters, sampleLength ), parameter => {
				offset[ parameter ] = randomRange;
			} );
		}

		return offset;
	}

	static hasRgbParameter( offset?: any ): boolean {
		for ( let p in Constants.POSSIBLE_CHANNELS ) {
			if ( has( offset, Constants.POSSIBLE_CHANNELS[ p ] ) ) {
				return true;
			}
		}

		return false;
	}
}