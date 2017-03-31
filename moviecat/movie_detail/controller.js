(function(angular) {
	'use strict';
	var module = angular.module('moviecat.movie_detail', ['ngRoute']);

	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/subject/:id', {
			templateUrl: '/item/moviecat/movie_detail/view.html',
			controller: 'movieDetailCtrl'
		});
	}]);

	module.controller('movieDetailCtrl', [
		'$scope',
		'$routeParams',
		'jsonpService',
		'appConfig',
		function($scope, $routeParams, jsonpService,appConfig) {
			var id = $routeParams.id;
			var url = appConfig.detailBaseUrl + id;
			$scope.loading = true;
			//创建movie对象，保存响应回来的数据
			$scope.movie = {};
			jsonpService.jsonp(url, {}, function(data) {
				$scope.movie = data;
				//利用正则表达式 去除电影摘要里面的 ©豆瓣 标记
				$scope.summary = data.summary.replace(/([\s\S]+)©豆瓣/,'$1');
				$scope.loading = false;
				$scope.$apply();
			});
		}
	]);
})(angular);