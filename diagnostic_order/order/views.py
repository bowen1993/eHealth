#coding:utf-8
from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect
import json
from django.http import JsonResponse
from urllib import urlencode
import requests
from django.shortcuts import redirect 
from django.views.decorators.csrf import csrf_exempt
from config import testJ, INDENTIFIER,REPORT,testJson, ID_SRCRET_BASE64, redirect_uri, API_BASE, AUTH_BASE, CLIENT_ID, REDIRECT_URI, SCOPES 
# Create your views here.

def read_api(request, id, url='DiagnosticOrder'):
  access_token = request.COOKIES['access_token']

  resp = requests.get('%s/%s/%s?_format=json'%(API_BASE, url, id),
              headers={'Accept': 'application/json','Authorization': 'Bearer %s'% access_token})
  return resp.json()


def upload_seq(request, seq, url='DiagnosticOrder'):

    access_token = request.COOKIES['access_token']
    resp = requests.post('%s/DiagnosticOrder?_format=json'% API_BASE,
            data=json.dumps(seq), 
            headers={'Authorization': 'Bearer %s'% access_token})


def call_api(url, args={}):
    # who even uses xml..
    access_token = args['session']
    del args['session']
    #args['id'] = 'example'
    resp = requests.get(
                        '%s%s?%s'% (API_BASE, url, urlencode(args)),
                        headers={'Accept': 'application/json','Authorization': 'Bearer %s'% access_token})
    
    return resp.json()

def index(request):
  return HttpResponse("hello order")

def home(request):
  s = request.session
  return render(request, 'base.html', {'session':s})

def get_ref(key, data):
  if (key in data):
    order = data[key]['reference']
    order = ''.join(map(lambda x: "%c" % ord(x), list(order)))
    return order
  order = ''
  return order

def check_order(request, status):
  data=[
          {'name': 'Test1', 'Order': 'Bowen', 'Time': '2015-11-11', 'Status': 'requested', 'id':'111'},
          {'name': 'Test2', 'Order': 'Bowen', 'Time': '2015-11-12', 'Status': 'requested', 'id':'222'},
          {'name': 'Test3', 'Order': 'Bowen', 'Time': '2015-11-13', 'Status': 'cancelled', 'id':'333'},
          {'name': 'Test4', 'Order': 'Bowen', 'Time': '2015-11-11', 'Status': 'draft', 'id':'333'},
          {'name': 'Test5', 'Order': 'Bowen', 'Time': '2015-11-14', 'Status': 'failed', 'id':'333'},

        ]
  status_dict={
    'na':'Not Accpeted',
    'ao':'All Orders',
    'ac':'Accepted',
    'rj':'Rejected'
  }

  na_status = ['proposed','draft','planned','requested',
  'received','accepted','in-progress','review','suspended']
  ac_status = ['completed', 'cancelled']
  rj_status = ['rejected','failed']

  dat = search(request, 'DiagnosticOrder')

  data=[]
  for d in dat['entry']:
    if ('event' not in d['resource']):
      continue
    id_ = d['resource']['id']
    id_ = ''.join(map(lambda x: "%c" % ord(x), list(id_)))
    #if ('encounter' in d['resource']):
    #  order = d['resource']['encounter']['reference']
    #  order = ''.join(map(lambda x: "%c" % ord(x), list(order)))
    #order = ''
    order = get_ref('encounter', d['resource'])

    time = d['resource']['event'][0]['dateTime']
    time = ''.join(map(lambda x: "%c" % ord(x), list(time)))
    time = ""
    statu = d['resource']['status']
    statu = ''.join(map(lambda x: "%c" % ord(x), list(statu)))
    name = d['resource']['orderer']['reference']
    name = ''.join(map(lambda x: "%c" % ord(x), list(name)))
    #div = d['resource']['text']['div']
    #div = ''.join(map(lambda x: "%c" % ord(x), list(div)))
    con = {'name': name, 'Order': order, 'Time': time, 'Status': statu, 'id':id_}
    data.append(con)

  real_data = []
  if status == 'ao':
    real_data = data
  else:
    for d in data:
      if status == 'na':
        for i in na_status:
          if d['Status'].lower() == i:
            real_data.append(d)
      if status == 'ac':
        for i in ac_status:
          if d['Status'].lower() == i:
            real_data.append(d)
      if status == 'rj':
        for i in rj_status:
          if d['Status'].lower() == i:
            real_data.append(d)

  return render(request, 'orders_item.html', {'status': status_dict[status], 'orders':real_data});

def new_order(request):
  return render(request, 'new_order.html')

def order_detail(request, id):
  order_search = search(request, 'DiagnosticOrder', {'id':id})

  entry = order_search['entry']
  order = None
  for e in entry:
    if e['resource']['id'] == id :
        order = e['resource']
        break
  specimen = ''

  if ('specimen' in order.keys()):
    specimen = order['specimen']
  priority = ''
  if ('priority' in order.keys()):
    priority = order['priority']
  reason = ''
  if (('reason' in order.keys())  and ('text' in order['reason'][0].keys())):
    reason = order['reason'][0]['text']
  sptinfo = ''
  if ('supportingInformation' in order.keys()):
    sptinfo = order['supportingInformation'][0]['reference']

  args = {
    'id':id,
    'status':order['status'],
    'subject':order['subject']['reference'],
    'orderer':order['orderer']['reference'],
    'encounter':get_ref('encounter',order),
    'reason':reason,
    'sptinfo':sptinfo,
    'specimen': specimen,
    'priority': priority,
    'event_list':order['event'],
    'event_status':order['event'][0]['status'],
    'event_actor':order['event'][0]['actor']['reference'],
    'event_datetime':order['event'][0]['dateTime'],
    'item_list': order['item'][0],
  }

  return render(request, 'order_detail.html', args)

def launch(request):
  return render(request, 'launch.html')

class OAuthError(Exception):
    pass

def get_access_token(auth_code):
    '''
    exchange `code` with `access token`
    '''

    exchange_data = {
        'code': auth_code,
        'redirect_uri': 'http://localhost:8000/index.html',
        'grant_type': 'authorization_code'
    }
    headers = {
        "Content-Type": 'application/x-www-form-urlencoded',
        "Content-Length" : len(exchange_data),
        'Authorization':'Basic ' + ID_SRCRET_BASE64
    }
    resp = requests.post(AUTH_BASE+'/token', data=exchange_data, headers=headers)
    if resp.status_code != 200:
        raise OAuthError
    else:
        return resp.json()['access_token']

def recv_code(request):

    code = request.GET.get('code')
    access_token = get_access_token(code)


    resp = HttpResponseRedirect('fhir-app/')
    resp.set_cookie('access_token', access_token)
    return resp


def search(request, url, args={}):
  url = '/'+ url
  args['session'] = request.COOKIES['access_token']
  order_search = call_api(url, args);

  return order_search

def search_subject(request):
  print "hello"
  subject = request.GET.get('subject')
  order_search = search(request, subject);

  return JsonResponse(order_search, safe=False)

def search_orderer(request):
  order_orderer = order_search = search(request, 'Practitioner')
  return JsonResponse(order_search['entry'], safe=False)

def search_type(request):

  subject = request.GET.get('subject')
  order_search = search(request, 'Encounter')
  return JsonResponse(order_search, safe=False)

def search_sptInfo(request):
  subject = request.GET.get('subject')
  order_search = search(request, subject)
  return JsonResponse(order_search, safe=False)

def search_specimen(request):
  subject = request.GET.get('subject')
  order_search = search(request, subject)
  return JsonResponse(order_search, safe=False)

def search_actor(request):
  subject = request.GET.get('subject')
  order_search = search(request, subject)
  return JsonResponse(order_search['entry'], safe=False)

def search_target(request):
  subject = request.GET.get('subject')
  order_search = search(request, subject)
  return JsonResponse(order_search, safe=False)

def submit(request):
  args={}
  args['session'] = request.COOKIES['access_token']
  upload_seq(request, testJson)
  resp = HttpResponseRedirect('new_order/')
  return resp

def edit(request, id):
  order_search = search(request, 'DiagnosticOrder', {'id':id})
  entry = order_search['entry']
  order = None
  for e in entry:
    if e['resource']['id'] == id :
        order = e['resource']
        break

  specimen = ''
  if ('specimen' in order.keys()):
    specimen = order['specimen']
  priority = ''
  if ('priority' in order.keys()):
    priority = order['priority']
  reason = ''
  if (('reason' in order.keys())  and ('text' in order['reason'][0].keys())):
    reason = order['reason'][0]['text']
  sptinfo = ''
  if ('supportingInformation' in order.keys()):
    sptinfo = order['supportingInformation'][0]['reference']

  args = {
    'id':id,
    'order_id':order['identifier'][0]['value'],
    'status':order['status'],
    'subject':order['subject']['reference'],
    'orderer':order['orderer']['reference'],
    'encounter':get_ref('encounter',order),
    'reason':reason,
    'sptinfo':sptinfo,
    'specimen': specimen,
    'priority': priority,
    'event_list':order['event'],
    'event_status':order['event'][0]['status'],
    'event_actor':order['event'][0]['actor']['reference'],
    'event_datetime':order['event'][0]['dateTime'],
    'item_list': order['item'][0],
  }

  return render(request, 'edit.html', args)


@csrf_exempt
def updata(request):
  req = json.loads(request.body)
  dorder = req["diagnostic_order"]
  order = req["order"]
  access_token = request.COOKIES['access_token']
  resp = requests.post('%s/Order?_format=json'% API_BASE,
            data=json.dumps(order), 
            headers={'Authorization': 'Bearer %s'% access_token})

  order_id = resp.json() 
  dorder['identifier'][0]['value'] = order_id["id"] 
  print '-'*100
  print dorder['identifier'][0]['value'] 
  print '-'*100

  resp = requests.post('%s/DiagnosticOrder?_format=json'% API_BASE,
            data=json.dumps(dorder), 
            headers={'Authorization': 'Bearer %s'% access_token})
  print resp.json()
  return HttpResponse(json.dumps(resp.json()), content_type='application/json')

@csrf_exempt
def updataOrder(request):
  req = json.loads(request.body)
  dorder = req["diagnostic_order"]
  order = req["order"]
  access_token = request.COOKIES['access_token']
  order_id = dorder["identifier"][0]['value']
  print order_id
  print '%s/Order/%s' %(API_BASE, order_id)
  print dorder["subject"]['reference']

  resp = requests.put('%s/Order/%s' %(API_BASE, order_id),
    data = json.dumps(order),
    headers={'Authorization': 'Bearer %s'% access_token})
  print resp.json()
  dorder_id = req["id"]
  resp = requests.put('%s/DiagnosticOrder/%s' %(API_BASE,dorder_id),
            data=json.dumps(dorder), 
            headers={'Content-Type':'application/json','Authorization':'Bearer %s'% access_token})
  print resp.json()
  return HttpResponse(json.dumps(resp.json()), content_type='application/json')

def test(request):
  args={}
  args['session'] = request.COOKIES['access_token']
  args['identifier'] = 'example|567217b30cf298c62eff728a'
  #upload_seq(request, testJ)
  order_search = call_api('/DiagnosticOrder', args);
  return render(request, 'test.html', {'data':order_search})
  #upload_seq(request, testJson)
  #return render(request, 'test.html', {'data':'order_search'})

def main():
  return render(request, 'main.html')
