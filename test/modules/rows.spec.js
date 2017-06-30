var _ = require( 'lodash' );
var chai = require( 'chai' );
var expect = chai.expect;

var Rows = require( '../../lib/modules/rows' ).default;
var mocks = require( '../mocks' );
var glitch = _.clone( mocks.glitch );

// describe.only( 'Rows', () => {

// 	it( `should return true`, () => {
// 		expect( Rows( glitch ) ).to.equal( true );
// 	} );

// } );