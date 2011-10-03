Section = function(container, classStyle){
	this.div = $('<div></div>');
	
	container.append(this.div);
	this.div.addClass(classStyle);
}

var pub = Section.prototype = {
	div: null
}

/**
 	
 	sectionData: .id,
				 .name,
				 .showType,
				 .switchTimeOut,
				 .headLine = {
					 .articleID,
					 .textValue
				 },
				 .subHeadLine,
				 .text	
				 
	skin:		 .id,
				 .startCell, .endCell,
				 .bgColor,
				 .opacity,
				 .headLine = {
				 	.font, .color, .bold, .size, .align, .marginTop, .marginLeft, .marginBottom, .marginRight  // *** NOTE reverse on check marginTop <> topMargin
				 }
				 .subHeadLine = {
				 	.font, .color, .bold, .size, .align, .marginTop, .marginLeft, .marginBottom, .marginRight
				 }
				 .textTag = {
					 .font, .color, .bold, .size, .align, .marginTop, .marginLeft, .marginBottom, .marginRight
				 }
				 .carousel = {
				 	.bgColor, .spacing, .collapsedSectionHeight
				 }
				 .articleListTitle = {
				 	.font, .color, .bold, .size, .align, .marginTop, .marginLeft, .marginBottom, .marginRight
				 }
				 .title = {
				 	.font, .size, .bold, .align, .color, .marginTop, .marginLeft, .marginBottom, .marginRight
				 }
				 .titleForCollapsedSection = {
				 	.font, .size, .bold, .align, .color, .marginTop, .marginLeft, .marginBottom, .marginRight
				 }
				 .teaserText = {
				 	.font, .size, .bold, .align, .color, .marginTop, .marginLeft, .marginBottom, .marginRight
				 }
				 .date = {
				 	.font, .size, .bold, .align, .color, .marginTop, .marginLeft, .marginBottom, .marginRight
				 }
				 .readMore = {
				 	.font, .size, .bold, .align, .color, .marginTop, .marginLeft, .marginBottom, .marginRight
				 }
				 .image = {
				 	.align, .marginTop, .marginLeft, .marginBottom, .marginRight
				 }
 
 */

	pub.build = function(sectionData, skin, cssSection){
			
		with(this.div){
			css('margin', '0');
			css('position', 'fixed');
			css('background', skin.bgColor);
		}
		
		for(var ob in cssSection){
			this.div.css(ob, cssSection[ob]);
		}
			
		this.div.html('section'+sectionData.id);
	}