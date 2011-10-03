XMLParser = function() {

	/**
	 return parsed object: {
		 .sliders = Array({
			 .title,
			 .duration,
			 .sections = Array({
				 .id,
				 .name,
				 .showType,
				 .switchTimeOut,
				 .headLine = {
					 .articleID,
					 .textValue
				 },
				 .subHeadLine,
				 .text	
			 }),
			 .skin = {
				 .background = {.opacity, .color, .image},
				 .sections = Array({
					 .id,
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
				 })
			 }
		 })
	 }
	 */
	this.parseDataForPreview = function(data) {
		var returnData = {
			sliders : []
		};

		var skinID = new Array();

		$(data).find("presentationSet").each(function() {
			$('slide', $(this)).each(function(i, _item) {
				var pos = returnData.sliders.length;

				returnData.sliders[pos] = {
					title : $(this).attr("title"),
					duration : $(this).attr("duration"),
					skin : {},
					sections : []
				};

				$('section', $(this)).each(function(i, _item) {
					var sPos = returnData.sliders[pos].sections.length;
					returnData.sliders[pos].sections[sPos] = {};
					returnData.sliders[pos].sections[sPos].id = $(this).attr("id");

					$(this).find("contentType").each(function() {
						returnData.sliders[pos].sections[sPos].name = $(this).attr("name");
						returnData.sliders[pos].sections[sPos].showType = $(this).attr("showType");
						returnData.sliders[pos].sections[sPos].switchTimeOut = $(this).attr("switchTimeout");

						returnData.sliders[pos].sections[sPos].headLine = {};
						$(this).find("headline").each(function() {
							returnData.sliders[pos].sections[sPos].headLine = {
								articleID : $(this).attr("articleId"),
								textValue : $(this).text()
							}
						})

						returnData.sliders[pos].sections[sPos].subHeadLine = $(this).find("subHeadline").text();
						returnData.sliders[pos].sections[sPos].text = $(this).find("text").text();
					})
				});
				skinID[pos] = $(this).attr("skinId");
			});
		});

		$(data).find("skins").each(function() {
			$('skin', $(this)).each(function(i, _item) {
				var skinId = $(this).attr("skinId");
				var i = 0;

				for( i = 0; i < skinID.length; i++) {
					if(skinID[i] == skinId) {
						$('background', $(this)).each(function() {
							returnData.sliders[i].skin.background = {
								opacity : $(this).attr("opacity"),
								color : $(this).find("color").text(),
								image : $(this).find("image").text()
							}
						})

						returnData.sliders[i].skin.sections = new Array();
						$('section', this).each(function() {
							var currentSect = returnData.sliders[i].skin.sections.length;

							returnData.sliders[i].skin.sections[currentSect] = {};
							returnData.sliders[i].skin.sections[currentSect].id = $(this).attr('id');
							returnData.sliders[i].skin.sections[currentSect].startCell = Util.stringToPoint($(this).attr('startCell'));
							returnData.sliders[i].skin.sections[currentSect].endCell = Util.stringToPoint($(this).attr('endCell'));
							returnData.sliders[i].skin.sections[currentSect].bgColor = $(this).attr('bgcolor');
							returnData.sliders[i].skin.sections[currentSect].opacity = $(this).attr('opacity');

							var dObj = new Array("headLine", "subHeadLine", "textTag", "articleListTitle", "title", "titleForCollapsedSection", "teaserText", "date", "readMore");
							var y = 0;

							for( y = 0; y < dObj.length; y++) {
								returnData.sliders[i].skin.sections[currentSect][dObj[y]] = {};
								$(this).find(dObj[y]).each(function() {
									returnData.sliders[i].skin.sections[currentSect][dObj[y]].font = $(this).attr("font");
									returnData.sliders[i].skin.sections[currentSect][dObj[y]].color = $(this).attr("color");
									returnData.sliders[i].skin.sections[currentSect][dObj[y]].bold = $(this).attr("bold");
									returnData.sliders[i].skin.sections[currentSect][dObj[y]].size = $(this).attr("size");
									returnData.sliders[i].skin.sections[currentSect][dObj[y]].align = $(this).attr("align");
									returnData.sliders[i].skin.sections[currentSect][dObj[y]].marginTop = $(this).attr("marginTop") != undefined ? $(this).attr("marginTop") : $(this).attr("topMargin");
									returnData.sliders[i].skin.sections[currentSect][dObj[y]].marginRight = $(this).attr("marginRight") != undefined ? $(this).attr("marginRight") : $(this).attr("rightMargin");
									returnData.sliders[i].skin.sections[currentSect][dObj[y]].marginBottom = $(this).attr("marginBottom") != undefined ? $(this).attr("marginBottom") : $(this).attr("bottomMargin");
									returnData.sliders[i].skin.sections[currentSect][dObj[y]].marginLeft = $(this).attr("marginLeft") != undefined ? $(this).attr("marginLeft") : $(this).attr("leftMargin");
								})
							}
							
							returnData.sliders[i].skin.sections[currentSect].carousel = {};
							$(this).find("carousel").each(function() {
								returnData.sliders[i].skin.sections[currentSect].carousel.bgColor = $(this).attr("bgcolor");
								returnData.sliders[i].skin.sections[currentSect].carousel.spacing = $(this).attr("spacing");
								returnData.sliders[i].skin.sections[currentSect].carousel.collapsedSectionHeight = $(this).attr("collapsedSectionHeight");
							})
							
							returnData.sliders[i].skin.sections[currentSect].image = {};
							$(this).find("image").each(function() {
								returnData.sliders[i].skin.sections[currentSect].image.align = $(this).attr("align");
								returnData.sliders[i].skin.sections[currentSect].image.marginTop = $(this).attr("marginTop") != undefined ? $(this).attr("marginTop") : $(this).attr("topMargin");
								returnData.sliders[i].skin.sections[currentSect].image.marginRight = $(this).attr("marginRight") != undefined ? $(this).attr("marginRight") : $(this).attr("rightMargin");
								returnData.sliders[i].skin.sections[currentSect].image.marginBottom = $(this).attr("marginBottom") != undefined ? $(this).attr("marginBottom") : $(this).attr("bottomMargin");
								returnData.sliders[i].skin.sections[currentSect].image.marginLeft = $(this).attr("marginLeft") != undefined ? $(this).attr("marginLeft") : $(this).attr("leftMargin");
							})	
						})
					}
				}
			})
		})

		
		return returnData;
	}
}