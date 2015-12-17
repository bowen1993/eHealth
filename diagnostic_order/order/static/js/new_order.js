$(function () { $('#subject_modal').on('shown.bs.modal', function () {
  var text = $('#subject_sel option:selected').val();
  var obj = document.getElementById("sub_id");
  var a = obj.getElementsByTagName("li");
  if(a.length == 0){
    changeTitleToWating("subject_title", text);
  $.getJSON("search_subject/",{'subject':text}, function(ret){            
    var subul = document.getElementById("sub_id");
    var sum = ret['total'];
    ret = ret['entry'];
    changeTitleToResult("subject_title", text, sum);
    for (var i = ret.length - 1; i >= 0; i--) {
      subul.innerHTML = subul.innerHTML +  "<li class=\"list-group-item sub_item\" id=\"sub_li_" + i +"\"><label>"+ret[i]['resource']['name'][0]['given'] + " " + ret[i]['resource']['name'][0]['family']+ "/"+ ret[i]['resource']['id'] +"</label></li>";      
    };
    for (var i = ret.length - 1; i >= 0; i--) {
      var li = document.getElementById("sub_li_"+i);
      li.onclick = function(){
      var id = $(this).attr("id");
      var li = document.getElementById(id);
      var str = li.innerHTML;
      str = str.substring(7, str.length-8);
      //str = str.match("[0-9]*$")
      var obj = $('#subject_sel option:selected').val();
      var text = document.getElementById('subject_chosen');
      text.innerHTML = obj + "/" + str;

      $('#subject_modal').modal('hide')
          }
        }
    })
    }//<!-- end of if -->
  })
});

$(function () { $('#type_modal').on('shown.bs.modal', function () {
  var text = 'Encounter'
  var obj = document.getElementById("type_id");
  var a = obj.getElementsByTagName("li");
  if(a.length == 0){
    var title = document.getElementById("encounter_title");
    title.innerHTML = text + " Waiting....";

    $.getJSON("search_type/",{'subject':text}, function(ret){                  
      var ord_ul = document.getElementById("type_id");
      sum = ret['total'];
      title.innerHTML = text + " " + sum +" Results"
      ret = ret['entry'];
      for (var i = ret.length - 1; i >= 0; i--) {
        ord_ul.innerHTML = ord_ul.innerHTML +  "<li class=\"list-group-item type_item\" id=\"type_li_" + i +"\"><label>"+ ret[i]['resource']['patient']['reference'] + "--Encounter/" + ret[i]['resource']['id'] +"</label></li>";     
      };
      for (var i = ret.length - 1; i >= 0; i--) {
        var li = document.getElementById("type_li_"+i);
        li.onclick = function(){
          var id = $(this).attr("id");
          var li = document.getElementById(id);
          var str = li.innerHTML;
          str = str.substring(7, str.length-8);
          var text = document.getElementById('type_chosen');
          text.innerHTML = str;
          $('#type_modal').modal('hide')
        }
      }
    })
  }//<!-- end of if -->
  })
});


$(function () { $('#orderer_modal').on('shown.bs.modal', function () {
  var text = 'Practitioner'             
  var obj = document.getElementById("ord_id");
  var a = obj.getElementsByTagName("li");
  if(a.length == 0){
  $.getJSON("search_orderer/",{'subject':text}, function(ret){   
        var ord_ul = document.getElementById("ord_id");
        for (var i = ret.length - 1; i >= 0; i--) {
          ord_ul.innerHTML = ord_ul.innerHTML +  "<li class=\"list-group-item ord_item\" id=\"ord_li_" + i +"\"><label>"+ret[i]['resource']['name']['given'][0] + " " + ret[i]['resource']['name']['family'][0]+"</label></li>";
        };
        for (var i = ret.length - 1; i >= 0; i--) {
          var li = document.getElementById("ord_li_"+i);
          li.onclick = function(){
            var id = $(this).attr("id");
            var li = document.getElementById(id);
            var str = li.innerHTML;
            str = str.substring(7, str.length-8);
            var text = document.getElementById('orderer_chosen');
            text.innerHTML = str;
            $('#orderer_modal').modal('hide')
          }
        }
    })
    }
  })
});

$(function () { $('#sptInfo_modal').on('shown.bs.modal', function () {
    var text = $('#sptInfo_sel option:selected').val();            
    var obj = document.getElementById("sptInfo_id");
    var a = obj.getElementsByTagName("li");
    if(a.length == 0){
      changeTitleToWating("supt_title", text);
      $.getJSON("search_sptInfo/",{'subject':text}, function(ret){
          var sum = ret['total'];
          ret = ret['entry']
          changeTitleToResult("supt_title", text, sum);
          var subul = document.getElementById("sptInfo_id");
          for (var i = ret.length - 1; i >= 0; i--) {
            subul.innerHTML = subul.innerHTML +  "<li class=\"list-group-item sptInfo_item\" id=\"sptInfo_li_" + i +"\"><label>"+ret[i]['fullUrl'] + "</label></li>"; 
          };
          for (var i = ret.length - 1; i >= 0; i--) {
            var li = document.getElementById("sptInfo_li_"+i);
            li.onclick = function(){
              var id = $(this).attr("id");
              var li = document.getElementById(id);
              var str = li.innerHTML;
              str = str.substring(7, str.length-8);
              var text = document.getElementById('sptInfo_chosen');
              text.innerHTML = str;
              $('#sptInfo_modal').modal('hide')
            }
          }
      })
      }//<!-- end of if -->
    })
});


$(function () { $('#spec_modal').on('shown.bs.modal', function () {
    var text = 'Specimen'
    var obj = document.getElementById("spec_id");
    var a = obj.getElementsByTagName("li");
    if(a.length == 0){
      changeTitleToWating('spec_title', text);
      $.getJSON("search_specimen/",{'subject':text}, function(ret){                    
          var sum = ret['total'];
          changeTitleToResult('spec_title', text, sum);
          ret = ret['entry'];
          if (sum > 0){
            var ord_ul = document.getElementById("spec_id");               
            ord_ul.innerHTML = ord_ul.innerHTML +  "<li class=\"list-group-item spec_item\" id=\"spec_li_0" +"\"><label>"+ret['total'] +"</label></li>";
            var li = document.getElementById("spec_li_0");
            li.onclick = function(){
              var id = $(this).attr("id");
              var li = document.getElementById(id);
              var str = li.innerHTML;
              str = str.substring(7, str.length-8);
              var text = document.getElementById('spec_chosen');
              text.innerHTML = str;
              $('#spec_modal').modal('hide')
            }
          }
      })
      }//<!-- end of if -->
    })
});

$(function () { $('#item_spec_modal').on('shown.bs.modal', function () {
    var text = 'Specimen'
    var obj = document.getElementById("item_spec_id");
    var a = obj.getElementsByTagName("li");
    if(a.length == 0){
      changeTitleToWating("item_spec_title", text);
      $.getJSON("search_specimen/",{'subject':text}, function(ret){
          var sum = ret['total'];
          changeTitleToResult("item_spec_title", text, sum);
          if (sum > 0 ){
            ret = ret['entry'];
            var ord_ul = document.getElementById("item_spec_id");
            ord_ul.innerHTML = ord_ul.innerHTML +  "<li class=\"list-group-item spec_item\" id=\"item_spec_li_0" +"\"><label>"+ret['id'] +"</label></li>";                   
            var li = document.getElementById("item_spec_li_0");
            li.onclick = function(){
              var id = $(this).attr("id");
              var li = document.getElementById(id);
              var str = li.innerHTML;
              str = str.substring(7, str.length-8);
              var text = document.getElementById('item_spec_chosen');
              text.innerHTML = str;
              $('#item_spec_modal').modal('hide')
            }
          }
      })
      }//<!-- end of if -->
    })
  });


function changeTitleToWating(title_id, text){
  var title = document.getElementById(title_id);
  title.innerHTML = text + " Waiting...";
}

function changeTitleToResult(title_id, text, sum){
  var title = document.getElementById(title_id);
  title.innerHTML = text + " " + sum + " Results";
}

var target = "";       
$(function () { $('#target_modal').on('shown.bs.modal', function () {
  var text = $('#target_sel option:selected').val();
  if (text != target){
    var ul = document.getElementById("target_id");
    while(ul.hasChildNodes()){
        ul.removeChild(ul.firstChild);
    }
    target = text;
  }
  var obj = document.getElementById("target_id");
  var a = obj.getElementsByTagName("li");
  if(a.length == 0){
    changeTitleToWating("target_title", text);

    $.getJSON("search_target/",{'subject':text}, function(ret){
      var sum = ret['total'];
      ret = ret['entry'];
      changeTitleToResult("target_title", text, sum);
      var subul = document.getElementById("target_id");
      for (var i = ret.length - 1; i >= 0; i--) {
        subul.innerHTML = subul.innerHTML +  "<li class=\"list-group-item ord_item\" id=\"target_li_" + i +"\"><label>"+ret[i]['resource']['name']['given'][0] + " " + ret[i]['resource']['name']['family'][0]+ "/"+ ret[i]['resource']['id'] + "</label></li>"; 
      }
      for (var i = ret.length - 1; i >= 0; i--) {
        var l = document.getElementById("target_li_"+i);
        l.onclick = function(){
          var id = $(this).attr("id");
          var li = document.getElementById(id);
          var str = li.innerHTML;
          str = str.substring(7, str.length-8);
          var obj = $('#target_sel option:selected').val();
          str = obj + "/" + str;
          var text = document.getElementById('target_chosen');
          text.innerHTML = str;
          $('#target_modal').modal('hide')
        }
      }
      })
    }//<!-- end of if -->
  })
});



var item_sum = 0;
function add_item(){
  item_sum = item_sum+1;
  item = document.getElementById("new_digorder_item");
  context = document.getElementById("new_digorder_item_0");
  item.innerHTML = item.innerHTML
  + "<div class=\"row\" id = \"new_digorder_item_" + item_sum +"\"" +">"
  + context.innerHTML + "</div>";
  if (item_sum == 1) {
    btn = document.getElementById("del_item_id");
    btn.style.display = "block";
  }
}
function del_item(){
  context = document.getElementById("new_digorder_item_"+item_sum);
  context.parentNode.removeChild(context);
  item_sum = item_sum-1; 
  if (item_sum == 0){
    btn = document.getElementById("del_item_id");
    btn.style.display = "none";
  } 
}

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

var item = new Array();
function get_page_data(){
  length = $("#new_digorder_item").children("div").length;
  item = []
  for (var i = 0; i < length; i++){
    div = $("#new_digorder_item_"+i).find("input.item_system");
    item_system = div.val();
    div = $("#new_digorder_item_"+i).find("input.item_code");
    item_code = div.val();
    div = $("#new_digorder_item_"+i).find("input.item_display");
    item_display = div.val();
    div = $("#new_digorder_item_"+i).find("input.item_description");
    item_description = div.val();
    div = $("#new_digorder_item_"+i).find("input.body_system");
    body_system = div.val();
    div = $("#new_digorder_item_"+i).find("input.body_code");
    body_code = div.val();
    div = $("#new_digorder_item_"+i).find("input.body_display");
    body_display = div.val();
    div = $("#new_digorder_item_"+i).find("input.body_description");
    body_description = div.val();
    item[i]={
      'code':{
        'coding': [
          {
            'system': item_system,
            'code': item_code,
            'display': item_display,
          },
        ],
        'text': item_description,
      },
      //'specimen':$("#new_digorder_item_"+i).find("p#spec_chosen").text(),
      'bodySite':{
        'coding':[
        {
          'system': body_system,
          'code': body_code,
          'display': body_display,
        },
        ],
        'text':body_description,
      },
      'status':'requested'//9999
    }
  }

  sub = $('p#subject_chosen').text();
  var subject= get_ref(/Patient|Group|Location|Device/, sub);
  sub = $('p#target_chosen').text(); 
  var target= get_ref(/Practitioner|Device|Organization/, sub);
  sub = $('p#type_chosen').text();
  var regx = /Encounter\/\d+/;
  var encounter = regx.exec(sub);

  var order_id = $('p#order_id').text();

  var infos = {
    id_system:$('#id_system').val(),
    id_value:$('#id_value').val(),
    order_id:order_id,
    date:getNowFormatDate(),
    subject:subject,
    orderer:target,
    target:target,
    encounter:encounter,
    reason_system:$("#reason_system").val(),
    reason_code:$("#reason_code").val(),
    reason_display:$("#reason_display").val(),
    reason_description:$("#reason_description").val(),
    support:$('p#sptInfo_chosen').text(),
    specimen:$("p#spec_chosen").text(),
    priority:$('#prio_sel option:selected').val(),
    encounter:$("p#type_chosen").text(),
    item:item,
    note:$("#note_id").val(),
  }
  return infos;
}

function get_ref(regx, sub){
  return regx.exec(sub) + '/' +sub.match("[0-9]*$");
}

function form_report_json(info){
  var res_json = {
      "diagnostic_order" : {
        "resourceType": "DiagnosticOrder",
        "text": {
          "status": "generated",
          "div": "<div>\n\t\t\t<p>Chest CT - ordered May 8, 2013 by Dr. Adam Careful</p>\n\t\t</div>"
        },
        "subject": {
          "reference": info.subject
        },
        "orderer":{
          "reference": "User Name",
        },
        "identifier": [
          {
            "system": "example",
            "value": info.order_id,
          }
        ],
        "encounter": {
          "reference": info.encounter,
        },
        "reason": [
          {
            
            "coding": [
              {
                "system": info.reason_system,
                "code": info.reason_code,
                "display": info.reason_display,
              }
            ],
            
            "text": info.reason_description,
          }
        ],
        "supportingInformation": [
          {
            "reference": info.support
          }
        ],
        "status": "requested",
        "item":info.item,
        "event": [
          {
            "status": "requested",
            "dateTime": info.date,
            "actor": {
              "reference": "example"
            }
          }
        ],
      },
      "order":{
        "resourceType": "Order",
        "identifier": [
          {
            "system": info.id_system,
            "value": info.id_value,
          }
        ],
        "target":{
          "reference": info.target,
        }
      }
    }
  return res_json
}

function Submit(){
  var post_data = form_report_json(get_page_data());
  var json_str = JSON.stringify(post_data);
  $.ajax({
    url:"updata/",
    data:json_str,
    dataType:"json",
    type:"POST",
    success:function(result){
        //do something
        alert("Successfully");
    }
  });
}

function save(){
  //document.getElementById("sub_id")
  title = $('h2#h_title').text();
  var post_data = form_report_json(get_page_data());
  post_data["diagnostic_order"]["status"] = "draft";

  if (title.length < 30){
    var json_str = JSON.stringify(post_data);
    $.ajax({
      url:"updata/",
      data:json_str,
      dataType:"json",
      type:"POST",
      success:function(result){
          //do something
          alert("Successfully");
      }
    });
  }else{
    post_data["id"] = title.substring(13);
    var json_str = JSON.stringify(post_data);
    $.ajax({
      url:"/updataOrder/",
      data:json_str,
      dataType:"json",
      type:"PUT",
      success:function(result){
          //do something
          alert("Successfully");
      }
    });
  }
}

function getCookie(name) {     
  var cookieValue = null;     
  if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');         
    for (var i = 0; i < cookies.length; i++) {             
      cookie = jQuery.trim(cookies[i]);             
      // Does this cookie string begin with the name we want?             
      if (cookie.substring(0, name.length + 1) == (name + '=')) { 
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));                 
        break;             
      }         
    }     
  }     
  return cookieValue; 
}  

var csrftoken = getCookie('csrftoken');  
function csrfSafeMethod(method) {     // these HTTP methods do not require CSRF protection     
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method)); 
} 
$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader("X-CSRFToken", csrftoken);
    }     
  } 
});