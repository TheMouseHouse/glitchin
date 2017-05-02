import { flatten } from 'lodash';
import ColumnsToRows from './columns-to-rows';

export default function ColumnsToData( image ) {
	return flatten( ColumnsToRows( image ) );
}