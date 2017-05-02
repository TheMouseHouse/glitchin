import { each, isNil } from 'lodash';
import ColumnsToData from './columns-to-data';
import DataToRows from './data-to-rows';
import * as Jimp from 'jimp';
import {
	Glitch,
	GlitchColumn
} from '../config/types';

export default function Columns( glitch: Glitch, columns: GlitchColumn[] ): Glitch {
	if ( isNil( glitch ) ) {
		throw new Error( 'modules/columns: image undefined' );
	}
	if ( isNil( columns ) ) {
		throw new Error( 'modules/columns: columns undefined' );
	}

	glitch.columns = columns;
	glitch.data = ColumnsToData( glitch.columns );
	glitch.rows = DataToRows( glitch );

	return glitch;
}