var diagnostic_report_app = angular.module('diagnostic_report', ['ngRoute', 'DRController']);

diagnostic_report_app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: '/fhir-app/tmp/main.html',
		controller: 'MainListCtrl'
	}).when('/order/:order_id', {
		templateUrl: '/fhir-app/tmp/order_detail.html',
		controller: 'OrderCtrl'
	}).when('/report/:report_id', {
		templateUrl: '/fhir-app/report/report_detail.html',
		controller: 'ReportCtrl'
	}).otherwise({
		redirectTo: '/'
	});
}]);