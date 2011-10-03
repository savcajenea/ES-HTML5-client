JQData = function() {

  var proxyURL;
  var hash;
  var updateInterval;
  var serviceURL;
  var $thisJQ = this;

  this.loadConfig = function() {
    var configURL = "SlidePreview.xml";

    $.ajax({
      url : configURL,
      dataType : (jQuery.browser.msie) ? 'text' : 'xml',
      success : function(xmlData) {
        var data;
        if( typeof xmlData == 'string') {
          data = new ActiveXObject('Microsoft.XMLDOM');
          data.async = false;
          data.loadXML(xmlData);
        } else {
          data = xmlData;
        }

        /*
         $('EasySite', data).each(function(i, _item) {
         console.log($(_item).text())
         });
         */
        proxyURL = $(data).find('proxyUrl').text();
        hash = $(data).find('hash').text();
        updateInterval = $(data).find('updateInterval').text();
        //serviceURL = $(data).find('serviceURL').text();
        serviceURL = "http://local.ess_html:8000/index.php";

        $($thisJQ).trigger("on_call", {
          type : "config_loaded"
        });
      }
    });

  }

  this.callWebService = function(type) {
    switch(type) {
      case "get_data_to_view":
        $.ajax({
          type : 'Get',
          url : serviceURL + "?action=getContentForPreview&ESPageId=1&ESPageMode=draft",
          dataType : (jQuery.browser.msie) ? 'text' : 'xml',
          success : function(xmlData) {
            var data;
            if( typeof xmlData == 'string') {
              data = new ActiveXObject('Microsoft.XMLDOM');
              data.async = false;
              data.loadXML(xmlData);
            } else {
              data = xmlData;
            }

            $($thisJQ).trigger("on_call", {
              type : "data_for_view",
              data : data
            });
          }
        })
        break;
    }
  }
}