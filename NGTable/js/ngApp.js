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



app.directive('testDirective', function ($compile) {
	function MakeTable() {
		var template = "";
		template += "{{ awesome }}";

		return template;
	};
	
	return {
		restrict: 'A',
		scope: {
			awesome : '='
		},
		link: function (scope, element, attrs) {
			scope.awesome.cool = "test";
		},
		template: $('<div id="test" ng-repeat="item in List1" />')
	};
});

app.directive('awesomeTable', function ($compile) {
	function MakeTable(DataList, DataListKey) {
		var table = $('<table class="ng-table" />');
				console.log(angular.toJson(DataList['data'], true));

		if(DataList == {} || angular.isUndefined(DataList))
			return table;

		var tableHeader = MakeTableHeader(DataList['data'][0], DataList['options']);
		var tableBody =  MakeTableBody(DataList['data'], DataList['options'], DataListKey);
		

		table.append(tableHeader);
		table.append(tableBody);
		return table;
	};

	function MakeTableHeader(RowItem, options) {
		var tableHeader = $('<thead class="ng-table-header" />');
		if(RowItem == {} || angular.isUndefined(RowItem))
			return tableHeader;

		var tableHeaderRow = $('<tr class="ng-table-header-row" />');
		angular.forEach(RowItem, function(value, key){
			var thDOM = $('<th class="ng-table-cell" ng-click="reverse=!reverse; predicate=\''+ key +'\'"/>');
			thDOM.html('<span>' + key +'</span>');
			tableHeaderRow.append(thDOM);
		});
		tableHeader.append(tableHeaderRow);

		return tableHeader;
	};

	function MakeTableBody(Data, options, DataListKey) {
		var tableBody =  $('<tbody class="ng-table-body" />');
		tableBody.append(MakeBodyRow(Data[0], options, DataListKey));
		
		return tableBody;
	};

	function MakeBodyRow(RowItem, options, DataListKey) {
		var tableRow = $('<tr class="ng-table-body-row" ng-repeat="item in '+ DataListKey +'.data | orderBy:predicate:reverse " />');
		angular.forEach(RowItem, function(value, key) {
			var cell =  $('<td class="ng-table-body-cell"/>');
			var input = $('<input type="text" class="ng-table-body-cell-input" ng-model="item.' + key +'" />');
			cell.append(input);
			tableRow.append(cell);
		});
		return tableRow;
	};

	
	return {
		restrict: 'A',
		scope: false,
		link: function (scope, element, attrs) {
			var list = attrs.awesomeList;
			element.attr('class', 'ng-table-container');
			scope.predicate = 'AASDFASAA';
			scope.reverse = false;
			var table = MakeTable(scope[list], list);
			element.append(table);
			$compile(table)(scope);
		}
	};
});


app.controller('TableController', function($scope) {
	$scope.test = { text: "test0" };
	$scope.List1 = {
		data: [ { AAA : 'TEST2', BBB : 'TEST1', CCC : 'TEST2' }, 
		{ AAA : 'TEST1', BBB : 'TEST3', CCC : 'TEST2' }, 
		{ AAA : 'TEST3', BBB : 'TEST2', CCC : 'TEST3' }],
		options:{ }
	};

	$scope.List2 = {
		data: [ { ADSFADSF : 'TEST2', WTWEWT : 'TEST1', AFDASFS : 'TEST2', adfasdlfdas: 'TEST4' }, 
		{ ADSFADSF : 'TEST1', WTWEWT : 'TEST3', AFDASFS : 'TEST2', adfasdlfdas: 'TEST5' }, 
		{ ADSFADSF : 'TEST3', WTWEWT : 'TEST2', AFDASFS : 'TEST3', adfasdlfdas: 'TEST2' }],
		options:{ }
	};
	$scope.myAlert = function() {
		console.log($scope.test);
	};
});


