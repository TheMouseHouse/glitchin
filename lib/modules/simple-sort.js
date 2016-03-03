(function(){
	'use strict';

	function simpleSort( promise, returnObj ){
		promise.then(function( data ){
			console.log('simple sort');
		});
		return returnObj;
	}

	module.exports = simpleSort;

})();