/* author: Bowen */
var express = require('express');
var requestify = require('requestify');
var router = express.Router();
var orders = require('../controllers/order_process');
var genomic_api_call = require('../controllers/call_genomic_api.js');
var clinical_api = require('../controllers/clinical_api.js');
var test_data = require('../controllers/test_data.js');

router.post('/create_report', function(req, res, next){
  var report_data = req.body.report;
  console.log(report_data);
  console.log('create_report');
  clinical_api.create('DiagnosticReport', report_data, req.session.clinical_access_token, res);
});

router.get('/all_report', function(req, res, next){
  clinical_api.getAll('DiagnosticReport', req.session.clinical_access_token, res);
});

router.get('/all_order', function(req, res, next){
  clinical_api.getAll('DiagnosticOrder', req.session.clinical_access_token, res);
});

router.post('/update_report', function(req, res, next){
  var report_data = req.body.report;
  var id = req.body.id;
  clinical_api.update('DiagnosticReport', id, report_data, req.session.clinical_access_token, res)
});

router.post('/update_order', function(req, res, next){
  var req_json = req.body
  console.log('hello')
  clinical_api.update('DiagnosticOrder', req_json.id, req_json.order_data, req.session.clinical_access_token, res);
});

router.get('/all_observation', function(req, res, next){
  genomic_api_call.getAll(req.session.access_token, 'Observation', res);
});

router.get('/order', function(req, res, next){
  clinical_api.read('DiagnosticOrder', req.query.id, req.session.clinical_access_token, res);
});

router.get('/report', function(req, res, next){
  clinical_api.read('DiagnosticReport', req.query.id, req.session.clinical_access_token, res)
})

module.exports = router;
