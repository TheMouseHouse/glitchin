import { Glitch, Effect } from '../config/types';
import { Parameter } from '../utils/parameters';
export declare const EffectsMap: {
    offsetrgbcols: (glitch: Glitch, offset: Parameter) => Glitch;
};
export default function EffectProvider(effect: Effect, glitch: Glitch): Glitch;
