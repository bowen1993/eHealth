var requestify = require('requestify');
var configs = require('./configs.js')


var doGet = function(url, access_token, res){
	console.log('geting');
  requestify.get(url, {
    headers :{'Accept': 'application/json',
              'Authorization': 'Bearer ' + access_token}
  }).then(function(response){
		console.log(response);
    res.send(response.getBody());
  });
}

var doPost = function(url, data, access_token, res){
	console.log('post');
  requestify.post(url, data, {
    headers:{
      'Accept' : 'application/json',
      'Authorization': 'Bearer ' + access_token
    }
  }).then(function(response){
		console.log(response);
    res.send(response.getBody());
  });
}

var doPut = function(url, data, access_token, res){
	console.log('post');
  requestify.put(url, data,{
    headers:{
      'Accept' : 'application/json',
      'Authorization': 'Bearer ' + access_token
    }
  }).then(function(response){
    res.send(response.getBody());
  });
}


var create = function(access_token ,data_type, data, res){
	console.log('create');
	console.log(access_token);
	var url = configs.api_url + '/' + data_type;
	console.log(url);
	doPost(url, data, access_token, res);
}

var update = function(access_token, data_type, id, res){
	var url = configs.api_url + '/' +data_type + '/' + id;
	doPut(url, data, access_token, res);
}

var getAll = function(access_token, data_type, res){
	var url = configs.api_url + '/' + data_type + '?_format=json';
	console.log(url)
	doGet(url, access_token, res);
}

var search = function(access_token, data_type, res){
	console.log('in');
	var url = configs.api_url + '/' + data_type;
	console.log(url);
	doGet(url, access_token, res);
}

module.exports = {
	create:create,
	update:update,
	search:search,
	getAll:getAll
}
