var express = require('express');
var requestify = require('requestify');
var router = express.Router();
var orders = require('../controllers/order_process')
var genomic_api_call = require('../controllers/call_genomic_api.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
	var json_res = genomic_api_call.search(req.session.access_token, '/DiagnosticReport', '');
	res.json(json_res);
});

module.exports = router;
