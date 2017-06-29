import { isNil } from 'lodash';
import { Glitch, Effect } from '../config/types';
import { Parameter } from '../utils/parameters';
import OffsetRgbCols from '../effects/offset-columns';

export const EffectsMap = {
	offsetrgbcols: ( glitch: Glitch, offset: Parameter ) => OffsetRgbCols( glitch, offset )
};

export default function EffectProvider( effect: Effect, glitch: Glitch ): Glitch {
	const effectType = String( effect.type ).toLowerCase();

	if ( isNil( effect ) || isNil( effect.type ) || isNil( glitch ) || !EffectsMap[ effectType ] ) {
		return glitch;
	}

	return EffectsMap[ effectType ]( glitch, effect.params );
}