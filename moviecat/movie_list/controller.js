(function(angular) {
	'use strict';

	//创建当前管理的模块
	var module = angular.module('moviecat.movie_list', ['ngRoute', 'moviecat.jsonpService']);

	//模块配置自身当前路由
	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/:status/:page', {
			templateUrl: '/moviecat/movie_list/view.html',
			controller: 'movieListCtrl'
		});
	}]);

	//给当前模块绑定一个控制器
	module.controller('movieListCtrl', [
		'$scope',
		'$http',
		'$routeParams',
		'$route',
		'jsonpService',
		'appConfig',
		function($scope, $http, $routeParams, $route, jsonpService, appConfig) {
			//因为豆瓣电影不支持Angular提供的回调函数命名方式，所以我们得自定义服务
			/*
			$http.jsonp({
				'http://api.douban.com/v2/movie/in_theaters?callback=JSON_CALLBACK',
			}).then(function(response){
				//成功的回调函数 异步访问
				var data = response.data;
				$scope.subjects = data['subjects'];
				$scope.title = data['title'];
			},function(response){
				//失败的回调函数
				console.log('请求出错，错误代码 '+response.status+'，错误信息 '+response.statusText);
			})
			*/
			console.log(appConfig);
			var count = appConfig.count;
			var page = parseInt($routeParams['page']);
			var startIndex = (page - 1) * count;
			var status = $routeParams['status'];
			var url = appConfig.listBaseUrl + status;

			$scope.subjects = [];
			$scope.title = '';
			$scope.total = '';
			$scope.totalPage = '';
			$scope.loading = true;
			$scope.page = page;

			jsonpService.jsonp(url, {
				count: count,
				city: '杭州',
				start: startIndex,
				q: $routeParams['q']
			}, function(data) {
				$scope.subjects = data['subjects'];
				$scope.title = data['title'];
				$scope.total = data['total'];
				$scope.loading = false;
				$scope.totalPage = Math.ceil($scope.total / count);
				$scope.subject = $scope.subjects[0];
				$scope.$apply();
			});

			$scope.go = function(index) {
				if (index >= 1 && index <= $scope.totalPage) {
					$route.updateParams({
						page: index
					});
					return false;
				} else {
					return true;
				}

			}
		}
	]);
})(angular)