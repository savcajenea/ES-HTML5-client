Controller = function(){
  this.initialize();
}

var pub = Controller.prototype;

// com
var request;
var xmlParser;

// views
var countDownBar;
var slidersController;

pub.initialize = function(){
  // init gadgets
  initXMLParser();
  initWebRequests();
  initCountDownBar();
  initSlidersController();

  // init app
  request.loadConfig();
}

// Resize stage handler //
pub.resize = function(){}

// ENTER FRAME (used for canvas)//
pub.ENTER_FRAME = function(){}

// XML PARSER //
function initXMLParser(){
  xmlParser = new XMLParser();
}

// WEB CALLs //
function initWebRequests(){
  request = new JQData();
  $(request).bind("on_call", eRequest);
}
function eRequest(eva, data){
  switch(data.type){
    case "config_loaded":
      request.callWebService("get_data_to_view");
      break;
    case "data_for_view":
      var rData = xmlParser.parseDataForPreview(data.data);

      if (rData.sliders.length > 0) {
        countDownBar.build(rData.sliders);
        slidersController.saveResult(rData);
        eCountDownBar(null, { currentSlide: 0 });
      } else {
        countDownBar.div.html("Zero slides was found...")
      }
      break;
    default:
      console.log("Request object have trigged an undefined call");
  }
}

// VIEWS - COUNT DOWN BAR //
function initCountDownBar(){
  countDownBar = new CountDownBar();
  countDownBar.div.bind("toSHOW", eCountDownBar);
}

function eCountDownBar(eva, data){
  slidersController.build(data.currentSlide);
  countDownBar.start();
}

// VIEWS - SLIDERs COTROLLER
function initSlidersController(){
  slidersController = new SlidersController();
  $(slidersController).bind("onCall", eSlidersController);
}

function eSlidersController(eva, data){

}
