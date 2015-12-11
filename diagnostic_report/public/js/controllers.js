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
	var orders = data.entry;
	$('.item').remove();
	$('.report-item').remove();
	var mid_element = angular.element(document.getElementById("mid-panel"));
	var mid_scope = mid_element.scope();
	console.log(orders[0].resource);
	mid_scope.set_order(orders);
}

function set_report_data(data){
	var reports = data.entry;
	$('.item').remove();
	$('.report-item').remove();
	var mid_element = angular.element(document.getElementById("mid-panel"));
	var mid_scope = mid_element.scope();
	mid_scope.set_report(reports);
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
		$http.get('/datas/all_order').success( function(data) {
			set_order_data(data);
		});
	$scope.go_edit = function() {
		$location.path('#/edit_report/:1');
	}
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
		$http.get('/datas/all_report').success( function(data) {
			console.log(data);
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

function get_page_data($scope){
	var infos = {
		category: $scope.category,
		code:$scope.code,
		encounter:$scope.encounter,
		subject:$scope.subject,
		performer:$scope.performer,
		effective:$scope.effective,
		issued:$scope.issued,
		specimen:$scope.specimen,
		observation:$scope.observation_list,
		conclusion:$scope.conclusion,
		status:$scope.new_status,
	}
	return infos;
}

function form_div(info){
	return '<div><p><b>Generated Narrative with Details</b></p><p><b>id</b></p>'+
	'<p><b>contained</b>: , , , , </p>'+
	'<p><b>status</b>: '+info.status+'</p>'+
	'<p><b>category</b>:' + info.category + '</p>'+
	'<p><b>code</b>: ' + info.code + '</p>'+
	'<p><b>subject</b>: <a>'+info.subject+'</a></p>' +
	'<p><b>effective</b>:'+info.effective+'</p>'
  '<p><b>issued</b>: '+info.issued+'</p>'
  '<p><b>performer</b>: '+info.performer+'</a></p>'
  '<p><b>specimen</b>: '+info.specimen+'</p>';
}

function get_observation(info){
	var res = new Array();
	for (ob in info.observation){
		res.push({
			'resourceType':'Observation',
			'id':ob
		});
	}
	return res;
}

function get_result(info){
	var res = new Array();
	for (ob in info.Observation){
		res.push({
			'reference':ob,
			'display': ''
		})
	}
	return res;
}

function form_report_json(info){
	var res_json = {
		'resourceType':'DiagnosticReport',
		'text':{
			'status':'generated',
			'div': form_div(info),
		},
		'contained':get_observation(info),
		'status':info.status,
		'subject':{
			'reference':info.subject,
			'display':''
		},
		'effectiveDateTime':info.effective,
		'issued':info.issued,
		'performer':{
			'reference':info.performer,
			'display':''
		},
		'specimen':[{
			'reference':info.specimen,
			'display':''
		}],
		'result': get_result(info)
	}
	return res_json;
}

DRController.controller('ReportCtrl', ['$scope','$http', '$route', function($scope, $http, $route){
	$scope.id = $route.current.params.id;
	console.log($scope.id);
	$http.get('/datas/report?id=' + $scope.id).success(function(data){
		console.log(data);
		$scope.reports = data;
	});
}]);

DRController.controller('OrderCtrl', ['$scope','$http', '$route', function($scope, $http, $route){
	$scope.id = $route.current.params.id;
	console.log($scope.id);
	var init = function(){
		$http.get('/datas/order?id=' + $scope.id).success(function(data){
			$scope.order = data;
			console.log(data);
		});
	}
	init();
	var opt = {
		method:'GET',
		url:'/datas/order?id='+$scope.id,
	}
	$http.get('/datas/order?id=' + $scope.id).success(function(data){
		$scope.order = data;
	});
}]);

DRController.controller('EditReportCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$scope.go_index = function() {
		$location.path('#/');
	}
	$scope.observation_list = new Array();
	$scope.new_obs_add = function(){
		$scope.observation_list.push($scope.observation);
		$('div#add-observation').modal('hide');
		$('#result').append($('<span class="obs-item">Observation1</span>'));
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
	$scope.submit = function(id){
		var post_data = form_report_json(get_page_data($scope));
		var req = {
			method:'POST',
			url:'/datas/update_report',
			data: {
				report:post_data,
				id:id
			}
		}
		$http(req).then(function(result){
			show_msg('Success');
		});
	}
	$scope.confirm_report = function(id){
		var reprot_data = get_page_data($scope);
		var post_data = form_report_json(reprot_data);
		reprot_data.status = 'final';
		var req = {
			method: 'POST',
			url:'/datas/update_report',
			data:{
				report:post_data,
				id:id
			}
		};
		$http(req).then(function(result){
			show_msg('Success');
		})
	}

}]);
