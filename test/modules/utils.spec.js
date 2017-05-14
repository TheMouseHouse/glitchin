var _ = require( 'lodash' );
var chai = require( 'chai' );
var expect = chai.expect;

var Utils = require( '../../lib/modules/utils' ).default;
var mocks = require( '../mocks' );
var indexOffsetMocks = mocks.indexOffsets;

describe( 'Utils', () => {
	describe( 'Check Channels exports', () => {
		it( 'should export Channels methods', () => {
			expect( Utils ).to.include.keys(
				'defineChannels',
				'deleteChannels',
				'getChannel',
				'mapChannel'
			);
		} );
	} );

	describe( 'Check Parameters exports', () => {
		it( 'should export Parameters methods', () => {
			expect( Utils ).to.include.keys(
				'hasRgbParameter',
				'createRgbParameters'
			);
		} );
	} );

	describe( '#getIndexOffset( index, offset, size )', () => {
		var cases = indexOffsetMocks;

		_.each( indexOffsetMocks, c => {
			it( `should return ${c.expected} for index: ${c.index}, offset: ${c.offset}, size: ${c.size}`, () => {
				expect( Utils.getIndexOffset( c.index, c.offset, c.size ) ).to.equal( c.expected );
			} );
		} );

	} );

} );