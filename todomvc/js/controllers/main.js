(function(angular) {

	'use strict';

	var controller = angular.module('app.controllers', ['ngRoute']);

	//注入自定义的服务mainService
	controller.controller('mainController', ['$scope', '$routeParams', 'mainService', function($scope, $routeParams, mainService) {

		//文本框需要一个模型
		$scope.text = '';

		$scope.todos = mainService.get();

		//01 新增列表项
		$scope.add = function() {
			if (!$scope.text) {
				return;
			}
			mainService.add($scope.text);
			//增加完以后清空文本框
			$scope.text = '';
		}

		//02 删除某一项
		$scope.delete = function(id) {
			mainService.delete(id);
		}

		//03 清空已完成的项
		$scope.clearAll = function() {
			$scope.todos = mainService.clear();
		}

		//04 正在编辑
		$scope.currentID = -1;
		$scope.edit = function(selectedID) {
				$scope.currentID = selectedID;
			}
			//编辑完后存储
		$scope.save = function() {
			$scope.currentID = -1;
		}

		//05 切换功能
		$scope.toggleAll = function() {
			mainService.toggleAll();
		}

		//06 路由管理
		switch ($routeParams.status) {
			case 'completed':
				$scope.selector = {
					completed: true
				};
				break;
			case 'active':
				$scope.selector = {
					completed: false
				};
				break;
			default:
				$scope.selector = {};
				break;
		}

		$scope.equalCompare = function(source, target) {
			// source是比较前的值，target是要比较的值
			return source == target;
		}


		//07 完成后保存
		$scope.save = function(){
			mainService.save();
		}
	}]);

})(angular)