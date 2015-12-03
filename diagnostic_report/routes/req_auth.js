var express = require('express');
var configs = require('../controllers/configs.js')
var router = express.Router();
var util = require('util');

router.get('/', function(req, res, next) {
	var redirect_args = 'scope=user%2FSequence.read+user%2FObservation.read+user%2FObservation.writeuser%2FCondition.read+user%2FPatient.read+user%2FProcedure.read+patient%2FObservation.read&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Frecv_redirect%2F&response_type=code&client_id=7e0151ab-bb9f-4787-a1a7-7dfa9f41e9e6';
	//var redirect_args = util.format('scope=%s&client_id=%s&response_type=code', configs.genomic_scope , configs.client_id);
	res.redirect('http://genomics-advisor.smartplatforms.org:8005/auth/authorize?' + redirect_args);
});

module.exports = router;
