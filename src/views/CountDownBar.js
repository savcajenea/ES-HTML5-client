CountDownBar = function() {
  this.div = $('#countdown');
  this.div.css('text-align', 'center');
  this.div.html("Loading...");
}

var pub = CountDownBar.prototype = {
  div : null
}

var slidersDuration = new Array();
var currentSlider = 0;
var remMaxProc;

pub.build = function(arrDurations) {
  for(var i = 0; i < arrDurations.length; i++) {
    slidersDuration[i] = arrDurations[i].duration;
  }
  currentSlider = 0;
  remMaxProc = Util.getProcOfWindowWidth(this.div.css('width'));
  remMaxProc = remMaxProc == "0" ? "100" : remMaxProc;

  this.div.css('text-align', 'left');
}

pub.reset = function() {
  onEnd();
}

pub.start = function() { 
  this.div.html(Util.toTimeFormat(slidersDuration[currentSlider]));

  var count = 0;
  this.div.everyTime(1000, function() {
    count++;
    if(count <= slidersDuration[currentSlider]) {
      $(this).html(Util.toTimeFormat(slidersDuration[currentSlider] - count));
    }
  });

  this.div.animate({
    width : "0%"
  }, {
    duration : slidersDuration[currentSlider] * 1000,
    step : function(now) {

    },
    easing : "linear",
    complete : onEnd
  });

}

pub.stop = function() {
  this.div.stop();
  this.div.stopTime();
  this.div.css('width', remMaxProc + "%");
}

onEnd = function() {
  $(this).stopTime();
  $(this).css('width', remMaxProc + "%");
  currentSlider++;
  if(currentSlider >= slidersDuration.length) {
    currentSlider = 0;
  }

  $(this).trigger("toSHOW", {
    currentSlide : currentSlider
  });
}