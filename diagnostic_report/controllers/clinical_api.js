var queryBuilder = require('./query.js');
var requestify = require('requestify');
var configs = require('./configs.js');

var doGet = function(url, access_token){
  requestify.get(url, {
    headers :{'Accept': 'application/json',
              'Authorization': 'Bearer ' + access_token}
  }).done(function(response){
    console.log(response.getBody());
    var body = response.getBody();
    return body;
  });
}

var doPost = function(url, data, access_token){
  requestify.post(url, data, {
    headers:{
      'Accept' : 'application/json',
      'Authorization': 'Bearer ' + access_token
    }
  }).then(function(response){
    return response.getBody();
  });
}

var doPut = function(url, data, access_token){
  requestify.put(url, data,{
    headers:{
      'Accept' : 'application/json',
      'Authorization': 'Bearer ' + access_token
    }
  }).then(function(response){
    return response.getBody();
  });
}

var search = function(type, querys, access_token){
  console.log(2);
  var queryString = queryBuilder.query(querys);
  console.log(queryString);
  var url = configs.clinical_api_uri + '/' + type + '/_search?' + queryString;
  console.log(url);
  var get_response = doGet(url, access_token);
  return get_response;
}

var create = function(type, data, access_token){
  var type = data.resourceType;
  var url = configs.clinical_api_uri + '/' + type;
  return doPost(url, data, access_token);
}

var read = function(type, id, access_token){
  var url = configs.clinical_api_uri + '/' + type + '/' + id
  return doGet(url, access_token);
}

var update = function(type, id, data, access_token){
  var url = configs.clinical_api_uri + '/' + type + '/' + id;
  return doPut(url, data, access_token)
}

module.exports = {
  search: search,
  create:create,
  read:read,
  update:update
}
