export function options() {
	var Path = require( 'path' ),
		cwd = process.cwd();

	var opts = require( 'nomnom' )
		.option( 'source', {
			default: cwd,
			help: 'Source directory'
		} )
		.option( 'dest', {
			default: 'output',
			help: 'Output directory'
		} )
		.option( 'mime', {
			default: 'image/jpeg',
			help: 'Set MIME of image.'
		} )
		.parse();

	return opts;
}