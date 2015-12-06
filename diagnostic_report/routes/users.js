var express = require('express');
var requestify = require('requestify');
var router = express.Router();
var orders = require('../controllers/order_process');
var genomic_api_call = require('../controllers/call_genomic_api.js');
var clinical_api = require('../controllers/clinical_api.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log(req.session.clinical_access_token);
	console.log('calling');
	genomic_api_call.search(req.session.access_token ,'Observation' ,res);
});

module.exports = router;
