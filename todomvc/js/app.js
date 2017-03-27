(function(angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	//创建模块
	var app = angular.module('myApp', ['ngRoute', 'app.controllers', 'app.service']);

	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/:status?', {
			templateUrl: 'main_url',
			controller: 'mainController'
		});
	}]);

})(angular);