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
  });
});


function GetContent(source){
  port = '1235'
  url = 'http://localhost:' + port + '/' + source
  data = new Object()

  $.ajax({
    type : 'get',
    dataType : 'jsonp',
    jsonp: false,
    jsonpCallback: "myJsonMethod",
    url : url,
    async : true,

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

        default: break
      }
    },

    error : function(response){
      console.log("Oops,  some errors !")
    }
  })
}


