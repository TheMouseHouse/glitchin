var _ = require( 'lodash' );
var chai = require( 'chai' );
var expect = chai.expect;
var Jimp = require( 'jimp' );

var Constants = require( '../../lib/config/constants' ).default;
var Channels = require( '../../lib/utils/channels' ).default;
var mock = require( '../mocks' );

describe( 'Channels', () => {

	var glitch;

	beforeEach(() => {
		glitch = _.clone( mock.glitch );
	} );

	describe( '#getChannel( glitch, channel )', () => {
		_.each( Constants.POSSIBLE_CHANNELS, channel => {
			it( 'should return ' + channel + ' channel values', () => {
				expect( Channels.getChannel( glitch, channel ) ).to.deep.equal( glitch.channels[ channel ] );
			} );
		} );

		it( 'should return empty array when requesting channel x', () => {
			expect( Channels.getChannel( glitch, 'x' ) ).to.be.empty;
		} );

		it( 'should return empty array when requesting channel with undefined glitch', () => {
			expect( Channels.getChannel( undefined, 'r' ) ).to.be.empty;
		} );
	} );

	describe( '#mapChannel( arr, channel )', () => {
		_.each( Constants.POSSIBLE_CHANNELS, channel => {
			it( 'should return number[][] for channel ' + channel, () => {
				expect( Channels.mapChannel( glitch.columns, channel ) ).to.deep.equal( glitch.channels[ channel ] );
			} );
		} );

		it( 'should return empty array for channel x', () => {
			expect( Channels.mapChannel( glitch.columns, 'x' ) ).to.be.empty;
		} );

		it( 'should return empty array if glitch.columns is undefined or has length 0', () => {
			expect( Channels.mapChannel( undefined, 'r' ) ).to.be.empty;
			expect( Channels.mapChannel( [], 'r' ) ).to.be.empty;
		} );

		it( 'should return empty array if channel is undefined', () => {
			expect( Channels.mapChannel( glitch.columns ) ).to.be.empty;
		} );
	} );

	describe( '#defineChannels( glitch )', () => {
		it( 'should add a "channels" object to glitch', () => {
			// Given
			var g = {};
			// When
			Channels.defineChannels( g );
			// Then
			expect( g ).to.include.keys( 'channels' );
		} );

		it( 'should not fail if glitch is undefined or null', () => {
			// Given
			var g;
			// When
			Channels.defineChannels( g );
			// Then
			expect( g ).to.be.undefined;
		} );
	} );

	describe( '#deleteChannels( glitch )', () => {
		it( 'should remove "channels" object from glitch', () => {
			// Given
			var g = { channels: { r: [], g: [], b: [], a: [] } };
			// When
			Channels.deleteChannels( g );
			// Then
			expect( g ).not.to.include.keys( 'channels' );
		} );

		it( 'should not fail if glitch is undefined or null', () => {
			// Given
			var g;
			// When
			Channels.deleteChannels( g );
			// Then
			expect( g ).to.be.undefined;
		} );
	} );
} );

