function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
  
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}


document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    GetContent('acminfo')
    GetContent('segmentfault')
    GetContent('tongqu')
  });
});


function GetContent(source){
  port = '1235'
  url = 'http://localhost:' + port + '/' + source
  data = new Object()

  jsonpCallback = ''
  switch(source){
    case 'acminfo':
      jsonpCallback = 'jsonAcminfo'
      break

    case 'segmentfault':
      jsonpCallback = 'jsonSegmentfault'
      break

    case 'tongqu':
      jsonpCallback = 'jsonTongqu'
      break

    default: break
  }

  $.ajax({
    type : 'get',
    dataType : 'jsonp',
    jsonp: false,
    jsonpCallback: jsonpCallback,
    url : url,
    async : false,

    success : function(response){
      //Construct Data
      //console.log("ok")
      //constructNodeDetail(response[0])
      switch(source){
        case 'acminfo':
            $('#algo').html(response.msg)
            break

        case 'segmentfault':
            $('#segmentfault').html(response.msg)
            break

        case 'tongqu':
            $('#tongqu').html(response.msg)
            break

        default: break
      }
    },

    error : function(response){
      console.log("Oops,  some errors !")
    }
  })
}


$(function getLocalTime() {     
    var time = new Date(parseInt(Date.now())).toLocaleString().substr(0,19)
    var con = '<h2 style="color:red"> 当前时间：' + time.toString() + '</h2>'
    $('#nowtime').html(con)
});

