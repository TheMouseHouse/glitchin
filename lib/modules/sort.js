(function(){
	'use strict';

	function sort( promise, returnObj, customFunction ){
		promise.then(function( data ){
			customFunction && customFunction(data);
		});
		return returnObj;
	}

	module.exports = sort;

})();