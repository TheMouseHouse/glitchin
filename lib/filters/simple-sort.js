(function(){
	'use strict';

	function simpleSort( promise, returnObj ){
		promise.then(function( data ){
			console.log('Simple sort...');

			//_.each(data.rows, function(row, key){
			//   data.rows[key] = _.sortBy(row, ['r', 'g', 'b', 'a']);
			//});
//console.log(JSON.stringify(data.rows));
			resolve(data);
		});
		return returnObj;
	}

	module.exports = simpleSort;

})();