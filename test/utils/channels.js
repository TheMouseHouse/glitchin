var chai = require( 'chai' );
var expect = chai.expect;
var Jimp = require( 'jimp' );

var Channels = require( '../../lib/utils/channels' ).default;

describe( 'Channels', () => {
	describe( '#getChannel( target, key )', () => {
		it( 'should create random r, g, b parameters (no range passed)', () => {
			// Given
			var target = { channels: { r: [ 0, 1, 2, 3, 4, 5 ] } }
			expect( Parameters.createRgbParameters() ).to.have.any.keys( 'r', 'g', 'b' );
		} );
	} );
} );

