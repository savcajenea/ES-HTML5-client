SlidersController = function() {
	this.div = $('#SlidersDiv');
}
var pub = SlidersController.prototype = {
	div : null
}

var slidersData = {}
var sections = new Array();

pub.saveResult = function(data) {
	slidersData = data;
	
	
	// set css for sections
	var auxDiv = $('<div></div>');
		auxDiv.addClass('Section');
	
	Memo.cssSections = [];
	for(var i = 0; i < slidersData.sliders.length; i++){
		var arrAllStartEnds = Util.getStartEnds(slidersData.sliders[i].skin.sections);
		for(var j = 0; j < slidersData.sliders[i].sections.length; j++){
			var skin = Util.getSkin(slidersData.sliders[i].skin.sections, slidersData.sliders[i].sections[j].id)
			Memo.cssSections[Number(Memo.cssSections.length)] = {
				sectionID:i+">"+slidersData.sliders[i].sections[j].id,
				cssSection: Util.setCssForSection(skin.startCell, skin.endCell, auxDiv, this.div, arrAllStartEnds)
			}
			console.log(Memo.cssSections[Number(Memo.cssSections.length)-1])
		}
	}
	
	this.div.css('padding', '0');
}

pub.build = function(sliderNumber) {
	// set background
	var bgObj = slidersData.sliders[sliderNumber].skin.background;

	if(bgObj.opacity == 1) {
		this.div.css('background', bgObj.color);
	} else {
		this.div.css('background', 'url(' + bgObj.image + ')');
	}

	var i = 0;
	
	// remove sections from previos slider
	for( i = 0; i < sections.length; i++) {
		sections[i].div.remove();
	}
	
	Memo.updateSizeValues(this.div);
	
	var sectionsArr = slidersData.sliders[sliderNumber].sections;
		
	for( i = 0; i < sectionsArr.length; i++) { 
		sections[i] = new Section(this.div, 'Section');
		sections[i].build(sectionsArr[i], Util.getSkin(slidersData.sliders[sliderNumber].skin.sections, sectionsArr[i].id),  Util.getCSS(sliderNumber, sectionsArr[i].id));
	}
}