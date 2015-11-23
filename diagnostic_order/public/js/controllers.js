var DRController = angular.module('DRController', []);

DRController.controller('MainListCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
	$scope.orders = [];
	$scope.reports = [];
	$scope.set_order = function(data){
		$scope.orders = data;
	}
}]);

DRController.controller('NewOrdCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
	$scope.set_data = function (data) {
		$scope.order = data;
	}
	$http.get('/new_order').success( function(data) {
		$scope.set_data(data);
	})
}]);

function set_order_data(data){
	$('.item').remove();
	$('.report-item').remove();
	var mid_element = angular.element(document.getElementById("mid-panel"));
	var mid_scope = mid_element.scope();
	mid_scope.set_order(data);
}



DRController.controller('left_panel', ['$scope', '$http', '$location', function($scope, $http, $location){
	$scope.order_flag = false;
	$scope.report_flag = false;
	$scope.toggle_order = function(){
		FHIR.oauth2.ready(onReady, onError);
		function onError(){
	            console.log("Loading error", arguments);
	        };
  
        function onReady(smart){
            // Load up the patient from SMART
            // Note: we use DI to inject the patient model ($dmPatient) into the view models within the start method
            console.log('hello');
            smart.patient.api.fetchAll({type:'DiagnosticOrder' }).done(function(dr){
            	console.log(dr);
            })
        };
		$scope.order_flag = !$scope.order_flag;
	}
	$scope.get_all_orders = function() {
		$http.get('/orders').success( function(data) {
			set_order_data(data);
		});
		$location.path('#/')
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
	$scope.create_new_order = function(){
	}
}]);