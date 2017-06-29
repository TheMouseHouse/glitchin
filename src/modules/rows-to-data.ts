import { flatten } from 'lodash';
import { Glimage } from '../config/types';

export default function RowsToData( image: Glimage ) {
	return flatten( image.glitch.rows );
}