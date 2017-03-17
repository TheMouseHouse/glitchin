import Channels from '../utils/channels';

var Check = require( '../utils/checkers' ),
	Parameters = require( '../utils/parameters' );

export default {
	defineChannels: Channels.defineChannels,
	deleteChannels: Channels.deleteChannels,
	getChannel: Channels.getChannel,
	mapChannel: Channels.mapChannel,
	hasRgbParameter: Parameters.hasRgbParameter,
	createRgbParameters: Parameters.createRgbParameters,
	check: {
		image: Check.image
	}
};