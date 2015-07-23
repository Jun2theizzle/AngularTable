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
})


app.controller('TableController', function($scope) {
	$scope.text = "test0";
	$scope.List1 = ['TEST', 'TEST1', 'TEST2'];
});


