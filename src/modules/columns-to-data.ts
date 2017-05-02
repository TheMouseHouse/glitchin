import { flatten } from 'lodash';
import ColumnsToRows from './columns-to-rows';
import {
	GlitchColumn
} from '../config/types';

export default function ColumnsToData( columns: GlitchColumn[] ) {
	return flatten( ColumnsToRows( columns ) );
}