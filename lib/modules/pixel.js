(function(){
	'use strict';

	function Pixel( x, y, idx, data ){
		return {
			x:   x,
			y:   y,
			idx: idx,
			r:   data[idx],
			g:   data[idx + 1],
			b:   data[idx + 2],
			a:   data[idx + 3]
		}
	}

	module.exports = Pixel;

})();