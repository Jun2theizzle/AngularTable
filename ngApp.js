var app = angular.module('TableApp', [] );

app.run(function ($templateCache) {
	// <script type="text/ng-template"> ... is preferred, but VS 2012 doesn't give intellisense there
	angular.element('script[type="text/template"]').each(function(idx, el) {
		$templateCache.put(el.id, el.innerHTML);
	});
});

app.directive('myDirective', function ($compile) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.html(($('<div id="test" ng-repeat="item in List1" />')));
			$('#test').append($('<span class="Awesome" ng-bind="item"></span>'));
			$compile($('#test'))(scope);
		},
	};
});

function MakeTable() {
	var template = "";
	template += "{{ awesome }}";

	return template;
};

app.directive('testDirective', function ($compile) {
	return {
		restrict: 'A',
		scope: {
			awesome : '='
		},
		link: function (scope, element, attrs) {
			scope.awesome.cool = "test";
		},
		template: MakeTable()
	};
});


app.controller('TableController', function($scope) {
	$scope.test = { text: "test0" };
	$scope.List1 = {
		data: [
		{ AAA : 'TEST', BBB : 'TEST1', CCC : 'TEST2' }, 
		{ AAA : 'TEST', BBB : 'TEST1', CCC : 'TEST2' }, 
		{ AAA : 'TEST', BBB : 'TEST1', CCC : 'TEST2' }
		],
		options: {
			columns : [

			]
		}
	};
	$scope.myAlert = function() {
		console.log($scope.test);
	};
});


