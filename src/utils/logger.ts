export type LoggerLevels = 'log' | 'info' | 'warning' | 'error';

export default function Logger( level: LoggerLevels, ...message: any[] ) {
	console[ level ].apply( null, [ level ].concat( ...message ) );
}