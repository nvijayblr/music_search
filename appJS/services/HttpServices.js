'use strict';
medVision
.service('HttpServices', ['$http', "$state", '$filter', function(_http, _state, _filter){
	console.log('HttpServices')
	this.serve = function(_params, _successCallback, _errorCallback, _finallyCallback){
		var _requestParam = {
			'method': _params['method'],
			'url': _params['url'],
			data: {},
			headers:{ 
				'Content-Type': "application/json;"
			}
		};
		
		_http(_requestParam).then(function(result){
			if(_successCallback)
				_successCallback(result.data);
		}, function(error){
			console.log(error);
			if(_errorCallback)
				_errorCallback(error);
		}).finally(function(){
			if(typeof _finallyCallback == 'function')
				_finallyCallback();
		});
	};
}]);