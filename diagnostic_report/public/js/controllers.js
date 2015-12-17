/* author: Bowen */
var DRController = angular.module('DRController', []);

var category_dict = {
	'AU': 'Audiology',
	'BG': 'Blood Gases',
	'BLB': 'Blood Bank',
	'CG': 'Cytogenetics',
	'CH': 'Chemistry',
	'CP': 'Cytopathology',
	'CT': 'CAT Scan',
	'CTH': 'Cardiac Catheterization',
	'CUS': 'Cardiac Ultrasound',
	'EC': 'Electrocardiac (e.g. EKG, EEC, Holter)',
	'EN': 'Electroneuro (EEG, EMG,EP,PSG)',
	'GE': 'Genetics',
	'HM': 'Hematology',
	'ICU': 'Bedside ICU Monitoring',
	'IMG': 'Diagnostic Imaging',
	'IMM': 'Immunology',
	'LAB': 'Laboratory',
	'MB': 'Microbiology',
	'MCB': 'Mycobacteriology',
	'MYC': 'Mycology',
	'NMR': 'Nuclear Magnetic Resonance',
	'NMS': 'Nuclear Medicine Scan',
	'NRS': 'Nursing Service Measures',
	'OSL': 'Outside Lab',
	'OT': 'Occupational Therapy',
	'OTH': 'Other',
	'OUS': 'OB Ultrasound',
	'PAR': 'Parasitology',
	'PAT': 'Pathology (gross & histopath, not surgical)',
	'PF': 'Pulmonary Function',
	'PHR': 'Pharmacy',
	'PHY': 'Physician (Hx. Dx, admission note, etc.)',
	'PT': 'Physical Therapy',
	'RAD': 'Radiology',
	'RC': 'Respiratory Care (therapy)',
	'RT': 'Radiation Therapy',
	'RUS': 'Radiology Ultrasound',
	'RX': 'Radiograph',
	'SP': 'Surgical Pathology',
	'SR': 'Serology',
	'TX': 'Toxicology',
	'URN': 'Urinalysis',
	'VR': 'Virology',
	'VUS': 'Vascular Ultrasound',
	'XRC': 'Cineradiograph'
}

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

DRController.controller('ReportCtrl', ['$scope', '$http', '$location', '$route', function($scope, $http, $location, $route) {
	console.log('repor');
	$scope.report_id = $route.current.params.report_id;
	console.log($route);
	console.log($scope.report_id);
	$http.get('/datas/report?id='+$scope.report_id).success(function(data){
		console.log(data);
		$scope.reports =data;
	})
	$scope.go_index = function() {
		$location.path('#/');
	}
	$scope.show_obs_detail = function() {
		console.log('clicked');
	}
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
		status:'partial',
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
	for (ob in info.observation){
		console.log(ob);
		res.push({
			'reference':ob,
			'display': 'observation'
		})
	}
	return res;
}

function form_report_json(info, order_id){
	console.log(info);
	var res_json = {
		resourceType:'DiagnosticReport',
		id: 'db1',
		text:{
			status:'generated',
			div: form_div(info),
		},
		category:{
			coding:[
				{
					system:'http://hl7.org/fhir/v2/0074',
					code: info.category,
					display:category_dict[info.category]
				}
			]
		},
		code:{
			coding:[
				{
					system:'http://loinc.org',
					code: info.code,
					display:''
				}
			]
		},
		contained:get_observation(info),
		extension:[],
		status:info.status,
		subject:{
			reference:info.subject,
			display:''
		},
		effectiveDateTime:info.effective,
		issued:info.issued,
		performer:{
			reference:info.performer,
			display:''
		},
		request:{
			reference:'DiagnosticOrder/'+order_id,
			display:order_id
		},
		specimen:[{
			reference:info.specimen,
			display:''
		}],
		result: get_result(info)
	}
	return res_json;
}

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

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (hour <= 9){
      hour = "0" + hour;
    }
    if (minute <= 9){
      minute = "0" + minute;
    }
    if (second <= 9){
      second = "0" + second;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + "T" + hour + seperator2 + minute + seperator2 + second;
    return currentdate;
}

DRController.controller('EditReportCtrl', ['$scope', '$http', '$location', '$route', function($scope, $http, $location, $route) {
	$scope.order_id = $route.current.params.id;
	$scope.report_id = $route.current.params.report_id;
	$scope.type = $route.current.params.type;

	if ( $scope.type == '0' ){
		$http.get('/datas/order?id='+$scope.order_id).success(function(data){
			update_order(data, 'in-progress');
		});
	}else{
		$http.get('/datas/report?id='+$scope.report_id).success(function(data){
			$scope.report_data = data;
			set_report_form_all(data);
		});
	}

	var set_report_form_all = function(data){
		console.log(data);
		$scope.category = data.category.coding[0].code;
		$scope.code = data.code.coding[0].code;
		$scope.effective = data.effectiveDateTime;
		$scope.issued = data.issued;
		$scope.performer = data.performer.reference;
		$scope.specimen = data.specimen[0].reference;
		$scope.subject = data.subject.reference;
		$scope.conclusion = data.conclusion;
	}
	var set_report_form = function(){
		console.log($scope.order_data);
		$scope.subject = $scope.order_data.subject.reference;
		$scope.encounter = $scope.order_data.encounter.reference;
		$scope.issued = getNowFormatDate();
	}
	var update_order = function(order_data, new_status){
		order_data.status = new_status;
		if (! order_data.event ){
			order_data.event = new Array();
		}
		order_data.event.push({
			'status':order_data.status,
			'dateTime':getNowFormatDate(),
			'actor':{
				'reference':'Practitioner/example'
			}
		});

		console.log(order_data.status)
		var opt = {
			method: 'POST',
			data:{
				id:order_data.id,
				order_data:order_data
			},
			url:'/datas/update_order',
			headers: { 'Content-Type': 'application/json' },
		}
		$http(opt).success(function(data){
			console.log('updated');
			$scope.order_data = data;
			set_report_form();
		})
	}
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
	var show_msg = function(msg) {
		$('div.hint-msg').html(msg);
		$('div.hint-msg').removeClass('hide');
    $('div.hint-msg').show(200).delay(1000).hide(200);
	}
	var update_report = function(){
		console.log('updateing');
		$scope.report_data.category.coding.push({
			system:'http://hl7.org/fhir/v2/0074',
			code:$scope.category,
			display:category_dict[$scope.category]
		});
		$scope.report_data.code.coding.push({
			system:'http://loinc.org',
			code:$scope.code,
			display:''
		});
		$scope.report_data.subject = {
			reference:$scope.subject,
			display:''
		}
		$scope.report_data.performer.reference = $scope.performer;
		$scope.report_data.effectiveDateTime = $scope.effective;
		$scope.report_data.issued = $scope.issued;
		$scope.report_data.specimen.push({
			reference:$scope.specimen,
			display:$scope.specimen
		});
		$scope.report_data.conclusion = $scope.conclusion;
		console.log($scope.report_data);
		var opt = {
			method:'POST',
			data:{id:$scope.report_data.id, report:$scope.report_data},
			headers:{'Content-Type':'application/json'},
			url:'/datas/update_report'
		}
		$http(opt).success(function(data){
			console.log(data);
			console.log('updated');
			if (data.resourceType == 'DiagnosticReport'){
				show_msg('Save Success');
			}else{
				show_msg('Error');
			}
		})
	}
	$scope.submit = function(id){
		if ($scope.type == '0'){
			var post_data = form_report_json(get_page_data($scope), $scope.order_id);
			console.log(post_data);
			var opt = {
				method:'POST',
				url:'/datas/create_report',
				data:{report:post_data},
				headers:{'Content-Type':'application/json'}
			}
			$http(opt).success(function(data){
				console.log(data);
				if (data.resourceType == 'DiagnosticReport'){
					show_msg('Save Success');
				}else{
					show_msg('Error');
				}
			});
		}else{
			update_report();
		}
	}
	$scope.confirm_report = function(id){
		var reprot_data = get_page_data($scope);
		var post_data = form_report_json(reprot_data);
		reprot_data.status = 'final';
		var req = {
			method: 'GET',
			url:'/users',
		};
		$http(req).then(function(result){
			if (data.resourceType == 'DiagnosticReport'){
				show_msg('Save Success');
			}else{
				show_msg('Error');
			}
		})
	}

}]);
