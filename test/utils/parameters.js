var chai = require( 'chai' );
var expect = chai.expect;

var Parameters = require( '../../lib/utils/parameters' ).default;

describe( 'Parameters', () => {
	describe( '#createRgbParameters()', () => {
		it( 'should create random r, g, b parameters (no range passed)', () => {
			expect( Parameters.createRgbParameters() ).to.have.any.keys( 'r', 'g', 'b' );
		} );
	} );

	describe( '#hasRgbParameter()', () => {
		it( 'should return true when the parameter r is present', () => {
			expect( Parameters.hasRgbParameter( { r: 20 } ) ).to.be.true;
		} );
		it( 'should return true when the parameter g is present', () => {
			expect( Parameters.hasRgbParameter( { g: 20 } ) ).to.be.true;
		} );
		it( 'should return true when the parameter b is present', () => {
			expect( Parameters.hasRgbParameter( { b: 20 } ) ).to.be.true;
		} );
		it( 'should return false when parameter r, g or b is not present', () => {
			expect( Parameters.hasRgbParameter( { x: 20 } ) ).to.be.false;
			expect( Parameters.hasRgbParameter( {} ) ).to.be.false;
			expect( Parameters.hasRgbParameter() ).to.be.false;
		} );
	} );
} );

