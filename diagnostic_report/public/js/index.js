var diagnostic_report_app = angular.module('diagnostic_report', []);

diagnostic_report_app.controller('mid_panel', function($scope){
	$scope.orders = [];
	$scope.reports = [];
	$scope.set_order = function(data){
		$scope.orders = data;
	}
	$scope.set_report = function(data){
		$scope.reports = data;
	}
});

function set_order_data(data){
	$('.item').remove();
	$('.report-item').remove();
	var mid_element = angular.element(document.getElementById("mid-panel"));
	var mid_scope = mid_element.scope();
	mid_scope.set_order(data);
}

function set_report_data(data){
	$('.item').remove();
	$('.report-item').remove();
	var mid_element = angular.element(document.getElementById("mid-panel"));
	var mid_scope = mid_element.scope();
	mid_scope.set_report(data);
}

diagnostic_report_app.controller('left_panel', function($scope, $http){
	$scope.order_flag = false;
	$scope.report_flag = false;
	$scope.toggle_order = function(){
		$scope.order_flag = !$scope.order_flag;
	}
	$scope.toggle_report = function() {
		$scope.report_flag = !$scope.report_flag;
	}
	$scope.get_all_orders = function() {
		$http.get('/orders').success( function(data) {
			set_order_data(data);
		})
	}
	$scope.get_na_orders = function() {
		$http.get('/orders').success( function(data) {
			set_order_data(data)
		})
	}
	$scope.get_ac_orders = function() {
		$http.get('/orders').success( function(data) {
			set_order_data(data);
		})
	}
	$scope.get_rj_orders = function(){
		$http.get('/orders').success( function(data) {
			set_order_data(data);
		})
	}
	$scope.get_report = function(){
		$http.get('/reports').success( function(data) {
			set_report_data(data);
		});
	}
});