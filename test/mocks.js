var _ = require( 'lodash' );

var glitch = {
	"data": [
		{
			"x": 0,
			"y": 0,
			"idx": 0,
			"r": 255,
			"g": 0,
			"b": 0,
			"a": 255,
			"hex": 65280
		},
		{
			"x": 1,
			"y": 0,
			"idx": 4,
			"r": 255,
			"g": 0,
			"b": 0,
			"a": 127,
			"hex": 65280
		},
		{
			"x": 2,
			"y": 0,
			"idx": 8,
			"r": 255,
			"g": 0,
			"b": 0,
			"a": 3,
			"hex": 65280
		},
		{
			"x": 0,
			"y": 1,
			"idx": 12,
			"r": 0,
			"g": 255,
			"b": 0,
			"a": 255,
			"hex": 4080
		},
		{
			"x": 1,
			"y": 1,
			"idx": 16,
			"r": 0,
			"g": 255,
			"b": 0,
			"a": 127,
			"hex": 4080
		},
		{
			"x": 2,
			"y": 1,
			"idx": 20,
			"r": 0,
			"g": 255,
			"b": 0,
			"a": 3,
			"hex": 4080
		},
		{
			"x": 0,
			"y": 2,
			"idx": 24,
			"r": 0,
			"g": 0,
			"b": 255,
			"a": 255,
			"hex": 255
		},
		{
			"x": 1,
			"y": 2,
			"idx": 28,
			"r": 0,
			"g": 0,
			"b": 255,
			"a": 127,
			"hex": 255
		},
		{
			"x": 2,
			"y": 2,
			"idx": 32,
			"r": 0,
			"g": 0,
			"b": 255,
			"a": 3,
			"hex": 255
		}
	],
	"columns": [
		[
			{
				"x": 0,
				"y": 0,
				"idx": 0,
				"r": 255,
				"g": 0,
				"b": 0,
				"a": 255,
				"hex": 65280
			},
			{
				"x": 0,
				"y": 1,
				"idx": 12,
				"r": 0,
				"g": 255,
				"b": 0,
				"a": 255,
				"hex": 4080
			},
			{
				"x": 0,
				"y": 2,
				"idx": 24,
				"r": 0,
				"g": 0,
				"b": 255,
				"a": 255,
				"hex": 255
			}
		],
		[
			{
				"x": 1,
				"y": 0,
				"idx": 4,
				"r": 255,
				"g": 0,
				"b": 0,
				"a": 127,
				"hex": 65280
			},
			{
				"x": 1,
				"y": 1,
				"idx": 16,
				"r": 0,
				"g": 255,
				"b": 0,
				"a": 127,
				"hex": 4080
			},
			{
				"x": 1,
				"y": 2,
				"idx": 28,
				"r": 0,
				"g": 0,
				"b": 255,
				"a": 127,
				"hex": 255
			}
		],
		[
			{
				"x": 2,
				"y": 0,
				"idx": 8,
				"r": 255,
				"g": 0,
				"b": 0,
				"a": 3,
				"hex": 65280
			},
			{
				"x": 2,
				"y": 1,
				"idx": 20,
				"r": 0,
				"g": 255,
				"b": 0,
				"a": 3,
				"hex": 4080
			},
			{
				"x": 2,
				"y": 2,
				"idx": 32,
				"r": 0,
				"g": 0,
				"b": 255,
				"a": 3,
				"hex": 255
			}
		]
	],
	"rows": [
		[
			{
				"x": 0,
				"y": 0,
				"idx": 0,
				"r": 255,
				"g": 0,
				"b": 0,
				"a": 255,
				"hex": 65280
			},
			{
				"x": 1,
				"y": 0,
				"idx": 4,
				"r": 255,
				"g": 0,
				"b": 0,
				"a": 127,
				"hex": 65280
			},
			{
				"x": 2,
				"y": 0,
				"idx": 8,
				"r": 255,
				"g": 0,
				"b": 0,
				"a": 3,
				"hex": 65280
			}
		],
		[
			{
				"x": 0,
				"y": 1,
				"idx": 12,
				"r": 0,
				"g": 255,
				"b": 0,
				"a": 255,
				"hex": 4080
			},
			{
				"x": 1,
				"y": 1,
				"idx": 16,
				"r": 0,
				"g": 255,
				"b": 0,
				"a": 127,
				"hex": 4080
			},
			{
				"x": 2,
				"y": 1,
				"idx": 20,
				"r": 0,
				"g": 255,
				"b": 0,
				"a": 3,
				"hex": 4080
			}
		],
		[
			{
				"x": 0,
				"y": 2,
				"idx": 24,
				"r": 0,
				"g": 0,
				"b": 255,
				"a": 255,
				"hex": 255
			},
			{
				"x": 1,
				"y": 2,
				"idx": 28,
				"r": 0,
				"g": 0,
				"b": 255,
				"a": 127,
				"hex": 255
			},
			{
				"x": 2,
				"y": 2,
				"idx": 32,
				"r": 0,
				"g": 0,
				"b": 255,
				"a": 3,
				"hex": 255
			}
		]
	],
	"height": 3,
	"width": 3
};

glitch.channels = {
	r: [ [ 255, 0, 0 ], [ 255, 0, 0 ], [ 255, 0, 0 ] ],
	g: [ [ 0, 255, 0 ], [ 0, 255, 0 ], [ 0, 255, 0 ] ],
	b: [ [ 0, 0, 255 ], [ 0, 0, 255 ], [ 0, 0, 255 ] ],
	a: [ [ 255, 255, 255 ], [ 127, 127, 127 ], [ 3, 3, 3 ] ]
};

var sample = {
	column: [ glitch.data[ 0 ], glitch.data[ 3 ], glitch.data[ 6 ] ],
	row: [ glitch.data[ 0 ], glitch.data[ 1 ], glitch.data[ 2 ] ]
};


exports.glitch = glitch;
exports.sample = sample;

function offsetData( index, offset, size ) {
	actualIndex = index + ( offset % size );

	if ( actualIndex < 0 ) {
		actualIndex += size;
	}

	if ( actualIndex >= size ) {
		actualIndex -= size;
	}

	return { index: index, offset: offset, size: size, expected: actualIndex }
}

function randomSize() {
	return Math.ceil( Math.random() * 20 ) + 10;
}

var size = randomSize();
var width = randomSize();
var indexOffsets = [];

_.times( size, i => {
	_.times( width, o => {
		indexOffsets.push( offsetData( i, o, size ) );
		indexOffsets.push( offsetData( i, -o, size ) );
	} );
} );

exports.indexOffsets = indexOffsets;