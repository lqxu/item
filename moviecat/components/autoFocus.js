//自定义指令 自动聚焦
(function(angular) {
	'use strict';
	var module = angular.module('moviecat.directive.autoFocus', [])
	module.directive('autoFocus', ['$location', function($location) {
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			// templateUrl: '',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				$scope.$location = $location;
				$scope.$watch('$location.path()', function(newValue) {
					//开始时给一个焦点状态
					//iElm 就是当前指令所在的元素
					var aLink = iElm.children().attr('href');
					var hash = aLink.replace(/#(\/.+?)\/\d+/, '$1');
					if (newValue.startsWith(hash)) {
						iElm.parent().children().removeClass('active');
						iElm.addClass('active');
					}
				});
			}
		};
	}]);
})(angular)