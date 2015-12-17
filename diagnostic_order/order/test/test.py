import json
import httplib
import requests

def call_api(url, args={}):
    # who even uses xml..
    args['_format'] = 'json'
    resp = requests.get(
                        '%s%s?%s'% (config.GENOMICS['api_base'], url, urlencode(args)),
                        headers={'Authorization': 'Bearer %s'% session['access_token']})
    return resp.json()

report_search = call_api('/DiagnosticReport');

