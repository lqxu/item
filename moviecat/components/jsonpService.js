(function(angular) {
	var module = angular.module('moviecat.jsonpService', []);
	module.service('jsonpService', ['$window', '$document',
		function($window, $document) {
			this.jsonp = function(url, data, callback) {
				//0.
				var cb = 'myCB_' + Math.random().toString().replace('.', '');

				//2.处理请求参数data
				var queryString = url.indexOf('?') == -1 ? '?' : '';
				for (key in data) {
					queryString += key + '=' + data[key] + '&';
				}

				//3.拼接url
				url += queryString + 'callback=' + cb;

				//4.创建script标签
				var script = document.createElement('script');

				//5.设置src
				script.src = url;


				//1. 绑定回调函数到全局 
				//window[cb] = callback;
				window[cb] = function(data){
					callback(data);
					script.remove();
				}

				//6.放在页面
				document.body.appendChild(script);
			}
		}
	]);

})(angular)