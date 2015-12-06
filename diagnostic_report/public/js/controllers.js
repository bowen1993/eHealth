var DRController = angular.module('DRController', []);

DRController.controller('MainListCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
	$scope.orders = [];
	$scope.reports = [];
	$scope.set_order = function(data){
		$scope.orders = data;
	}
	$scope.set_report = function(data){
		$scope.reports = data;
	}
}]);

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

DRController.controller('left_panel', ['$scope', '$http', '$location', function($scope, $http, $location){
	$scope.order_flag = false;
	$scope.report_flag = false;
	$scope.toggle_order = function(){
		$http.get('/users').success(function(data){
			console.log(data);
		})
		$scope.order_flag = !$scope.order_flag;
	}
	$scope.toggle_report = function() {
		$scope.report_flag = !$scope.report_flag;
	}
	$scope.get_all_orders = function() {
		$location.path('#/');
		$http.get('/orders').success( function(data) {
			set_order_data(data);
		});

	}
	$scope.get_na_orders = function() {
		$location.path('#/');
		$http.get('/orders').success( function(data) {
			set_order_data(data)
		});
	}
	$scope.get_ac_orders = function() {
		$location.path('#/');
		$http.get('/orders').success( function(data) {
			set_order_data(data);
		});
	}
	$scope.get_rj_orders = function(){
		$location.path('#/');
		$http.get('/orders').success( function(data) {
			set_order_data(data);
		});
	}
	$scope.get_report = function(){
		$location.path('#/');
		$http.get('/reports').success( function(data) {
			set_report_data(data);
		});
	}
}]);

DRController.controller('ReportCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$scope.go_index = function() {
		$location.path('#/');
	}
	$scope.show_obs_detail = function() {
		console.log('clicked');
	}
	$http.get('/users').success( function(data) {
		console.log(data);
		$scope.report_data = data;
	});

}]);

DRController.controller('EditReportCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$scope.go_index = function() {
		$location.path('#/');
	}
	$scope.new_observation_modal = function(){
		$('div#add-observation').modal('show');
	}
	$scope.close_new_observation = function() {
		$('div#add-observation').modal('hide');
	}
	$scope.show_msg = function(msg) {
		$('div.hint-msg').html(msg);
		$('div.hint-msg').removeClass('hide');
    	$('div.hint-msg').show(200).delay(1000).hide(200);
	}

}]);
