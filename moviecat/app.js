(function(angular) {
	//创建当前管理的模块
	var module = angular.module('moviecat', [
		'ngRoute',
		'moviecat.movie_detail',
		'moviecat.movie_list',
		'moviecat.directive.autoFocus'
	]);

	//给模块配置路由
	module.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.otherwise({
			redirectTo: '/in_theaters/1'
		});
		$locationProvider.hashPrefix("");
	}]);

	//给模块绑定全局常量
	module.constant('appConfig', {
		count: 5,
		listBaseUrl: '//api.douban.com/v2/movie/',
		detailBaseUrl: '//api.douban.com/v2/movie/subject/'
	});

	//给当前模块绑定一个控制器
	module.controller('searchCtrl', ['$scope', '$route', function($scope, $route) {
		$scope.input = '';
		$scope.query = function() {
			$route.updateParams({
				status: 'search',
				q: $scope.input
			});
		}
	}]);
})(angular)