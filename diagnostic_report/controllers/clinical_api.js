var queryBuilder = require('./query.js');
var requestify = require('requestify');
var configs = require('./configs.js');
var request = require('request');

var doGet = function(url, access_token, res){
  requestify.get(url, {
    headers :{'Accept': 'application/json',
              'Authorization': 'Bearer ' + access_token}
  }).then(function(response){
    console.log('obj');
    console.log(response);
    res.send(response.getBody());
  });
}

var doPost = function(url, data, access_token, res){
  console.log('post');
  var opt = {
    method: 'POST',
    url:url,
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + access_token,
    },
    json:data
  };
  request(opt, function(error, response, body){
    if (!error && response.statusCode < 400){
      res.send(body);
    }
    else{
      console.log('error');
      console.log(error);
    }
  });
  /*
  requestify.post(url, data, {
    headers:{
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json'
    }
  }).then(function(response){
    console.log(response);
    res.send(response.getBody());
  });
  */
}

var doPut = function(url, data, access_token, res){
  requestify.put(url, data,{
    headers:{
      'Accept' : 'application/json',
      'Authorization': 'Bearer ' + access_token
    }
  }).then(function(response){
    res.send(response.getBody());
  });
}

var search = function(type, querys, access_token, res){
  console.log(2);
  var queryString = queryBuilder.query(querys);
  console.log(queryString);
  var url = configs.clinical_api_uri + '/' + type + '?' + queryString;
  console.log(url);
  var get_response = doGet(url, access_token, res);
  return get_response;
}

var getAll = function(type, access_token, res){
  console.log(access_token);
  var url = configs.clinical_api_uri + '/' + type + '?_format=json';
  console.log(url);
  doGet(url, access_token, res);
}

var create = function(type, data, access_token, res){
  var type = data.resourceType;
  var url = configs.clinical_api_uri + '/' + type + '?_format=json';
  console.log(url);
  return doPost(url, data, access_token, res);
}

var read = function(type, id, access_token, res){
  var url = configs.clinical_api_uri + '/' + type + '/' + id + '?_format=json';
  console.log(url);
  doGet(url, access_token, res);
}

var update = function(type, id, data, access_token, res){
  var url = configs.clinical_api_uri + '/' + type + '/' + id;
  return doPut(url, data, access_token, res)
}

module.exports = {
  search: search,
  create:create,
  read:read,
  update:update,
  getAll:getAll
}
