(function(angular) {

	'use strict';

	var service = angular.module('app.service', []);

	//自定义服务mainService
	service.service('mainService', ['$window', function($window) {

		//对列表项做本地持久化存储,利用 localStorage
		var localStorage = $window.localStorage;

		//三目运算符判断，如果localStorage里有内容，则转成对象，如果没有，则赋值空数组
		var todos = localStorage.getItem('todo_list') ? JSON.parse(localStorage.getItem('todo_list')) : [];

		//把对象转成json字符串存储
		var localSave = function(){
			localStorage.setItem('todo_list',JSON.stringify(todos));
		}


		//00 获取列表项数组
		this.get = function() {
			return todos;
		}

		//获取每次不重复的随机ID
		function getID() {
			var id = Math.random();
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].id === id) {
					id = getID();
					break;
				}
			}
			return id;
		}

		//01 新增列表项
		this.add = function(text) {
			todos.push({
				id: getID(),
				text: text,
				completed: false
			});
			localSave();
		};

		//02 删除某一项
		this.delete = function(id) {
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].id === id) {
					todos.splice(id, 1);
					break;
				}
			}
			localSave();
		}

		//03 清除所有完成项
		this.clear = function() {
			var array = [];
			for (var i = 0; i < todos.length; i++) {
				if (!todos[i].completed) {
					array.push(todos[i]);
				}
			}
			todos = array;
			localSave();
			return todos;
		}

		//04 切换所有
		var now = true;
		this.toggleAll = function() {
			for (var i = 0; i < todos.length; i++) {
				todos[i].completed = now;
			}
			now = !now;
			localSave();
		}

		//05 勾选后保存
		this.save = function(){
			localSave();
		}

	}]);
})(angular);