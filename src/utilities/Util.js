Util = function() {
}
/**
 * NOTE: shape contain .color
 */
Util.drawRectShape = function(shape, w_, h_) {
	shape.graphics.clear();
	shape.graphics.beginStroke("#444");
	shape.graphics.beginFill(shape.color)
	shape.graphics.moveTo(0, 0)
	shape.graphics.lineTo(w_, 0)
	shape.graphics.lineTo(w_, h_)
	shape.graphics.lineTo(0, h_);
	shape.graphics.endStroke();
	shape.graphics.closePath();
}
/**
 * return section skin
 */
Util.getSkin = function(skinSections, sectionID) {
	for(var i = 0; i < skinSections.length; i++) {
		if(skinSections[i].id == sectionID) {
			return skinSections[i];
		}
	}

	return null;
}
/**
 * sort by startCell (web 3x6)
 */
Util.sortSections = function(sections, skinSections) {
	var skinArr = new Array();
	var retArr = new Array();
	// .pos && .float value
	var i = 0;
	var aux = new Array();

	for( i = 0; i < sections.length; i++) {
		skinArr[i] = Util.getSkin(skinSections, sections[i].id).startCell;
	}

	var currY = 1;
	for(var n = 1; n <= 6; n++) {
		for( i = 0; i < skinArr.length; i++) {
			if(skinArr[i].y == n) {
				retArr[Number(retArr.length)] = {
					pos : i,
					floatS : 'none'
				};
			}
		}
	}

	for( n = 1; n <= 6; n++) {
		aux = [];
		for( i = 0; i < retArr.length; i++) {
			if(skinArr[retArr[i].pos].y == n) {
				aux[Number(aux.length)] = i;
			}
		}

		if(aux.length > 1) {
			for(var j = 0; j < aux.length; j++) {
				retArr[aux[j]].floatS = "left";
			}
		}
	}

	return retArr;
}
/**
 * get procent of view
 */
Util.getProcOfWindowWidth = function(str) {
	var arr = str.split("px");
	var wH = $(window).width();

	return arr[0] * 100 / wH;
}
/**
 * to time format
 */
Util.toTimeFormat = function(currS) {
	var h = Math.floor(currS / 3600);
	var m = Math.floor((Number(currS) - h * 3600) / 60);
	var s = Number(currS) - (h * 3600 + m * 60);

	if(Number(h) > 0) {
		return h + ":" + (m > 9 ? m : ("0" + m)) + ":" + (s > 9 ? s : ("0" + s));
	}

	if(Number(m) > 0) {
		return m + ":" + (s > 9 ? s : ("0" + s));
	}

	return s + " s";
}
/**
 * Convert string in Point object (ex: 3,2 => Point(3, 2))
 */
Util.stringToPoint = function(str) {
	var arr = str.split(",");
	var p = new Point(0, 0);

	try {
		p.x = arr[0];
	} catch(err) {
	}

	try {
		p.y = arr[1];
	} catch(err) {
	}

	p.x = p.x == undefined ? 0 : p.x;
	p.y = p.y == undefined ? 0 : p.y;

	return p;
}

Util.setCssForSection = function(startCell, endCell, div, parentDiv, arrStartEnds) {
	var padding = {
		left : Number(parentDiv.css('padding-left').split('px')[0]),
		right : Number(parentDiv.css('padding-right').split('px')[0]),
		top : Number(parentDiv.css('padding-top').split('px')[0]),
		bottom : Number(parentDiv.css('padding-bottom').split('px')[0])
	}
	var margin = {
		left: Number(div.css('margin-left').split('px')[0]),
		right: Number(div.css('margin-right').split('px')[0]),
		top: Number(div.css('margin-top').split('px')[0]),
		bottom: Number(div.css('margin-bottom').split('px')[0])
	} 
	
	var posInArrSE = 0;
	var i = 0;
	
	for(i = 0; i < arrStartEnds.length; i++){
		if (arrStartEnds[i].x.x == startCell.x && arrStartEnds[i].x.y == startCell.y){
			if (arrStartEnds[i].y.x == endCell.x && arrStartEnds[i].y.y == endCell.y){
				posInArrSE = i;
			}
		}
	}
	
	var x_leftTotal = 0; 	var cells_left = 0;
	var x_rightTotal = 0;	var cells_right = 0;
	var y_topTotal = 0;		var cells_top = 0;
	var y_bottomTotal = 0;	var cells_bottom = 0;
	
	for(i = 0; i < arrStartEnds.length; i++){
		if (i != posInArrSE){
			// x_leftTotal
			if (arrStartEnds[i].y.x < startCell.x){
				if (arrStartEnds[i].x.y <= startCell.y && arrStartEnds[i].y.y >= startCell.y){
					x_leftTotal ++;
					cells_left += arrStartEnds[i].y.x - arrStartEnds[i].x.x + 1;
				}
			}  
			
			// x_rightTotal
			if (arrStartEnds[i].y.x > startCell.x){
				if (arrStartEnds[i].x.y <= startCell.y && arrStartEnds[i].y.y >= startCell.y){
					x_rightTotal ++;
					cells_right += arrStartEnds[i].y.x - arrStartEnds[i].x.x + 1;
				}
			}
			
			// y_topTotal
			if (arrStartEnds[i].y.y < startCell.y){
				if (arrStartEnds[i].x.x <= startCell.x && arrStartEnds[i].y.x >= startCell.x){
					y_topTotal ++;
					cells_top += arrStartEnds[i].y.y - arrStartEnds[i].x.y + 1;
				}
			}
			
			// y_bottomTotal
			if (arrStartEnds[i].y.y > startCell.y){
				if (arrStartEnds[i].x.x <= startCell.x && arrStartEnds[i].y.x >= startCell.x){
					y_bottomTotal ++;
					cells_bottom += arrStartEnds[i].y.y - arrStartEnds[i].x.y + 1;
				}
			}
		}
	}
	
	var parentW = parentDiv.css('width').split("px")[0];
	var parentH = parentDiv.css('height').split("px")[0];
	
	
	var retObj = {
		top:padding.top + margin.top*(y_topTotal+1)+ margin.bottom*y_topTotal,
		left:padding.left + margin.left*(x_leftTotal+1) + margin.right*x_leftTotal,
		width:100,
		height:100
	}
		
	var cell_width = (parentW - (padding.left + padding.right + margin.left*(x_leftTotal+1) + margin.right*(x_rightTotal+1) + margin.right*x_leftTotal + margin.left*x_rightTotal))/(cells_left + cells_right + (endCell.x - startCell.x + 1));
	var cell_height = (parentH - (padding.top + padding.bottom + margin.top*(y_topTotal+1) + margin.bottom*(y_bottomTotal+1) + margin.bottom*y_topTotal + margin.top*y_bottomTotal))/(cells_top + cells_bottom + (endCell.y - startCell.y + 1));
		
		
	retObj.top += cell_height*cells_top;
	retObj.left += cell_width*cells_left;
	retObj.width = (endCell.x - startCell.x + 1)*cell_width;
	retObj.height = (endCell.y - startCell.y + 1)*cell_height;
	
	
	// %
	retObj.top = retObj.top*100/parentH + "%";
	retObj.left = retObj.left*100/parentW + "%";
	retObj.width = retObj.width*100/parentW + "%";
	retObj.height = retObj.height*100/parentH + "%";
	
	/*
	// %
	retObj.top += "px";
	retObj.left += "px";
	retObj.width += "px";
	retObj.height += "px";
	*/

	return retObj;
	
}

Util.getStartEnds = function(arrSkins){
	var arr = new Array();
	
	for(var i = 0; i < arrSkins.length; i++){
		arr[i] = new Point(arrSkins[i].startCell, arrSkins[i].endCell);
	}
	
	return arr;
}

Util.getCSS = function(sliderNR, sectionID){
	var i = 0;
	var j = 0;
	
	for(i = 0; i < Memo.cssSections.length; i++){
		var arr = Memo.cssSections[i].sectionID.split(">");
		if (Number(arr[0]) == sliderNR){
			if (Number(arr[1]) == sectionID){
				return Memo.cssSections[i].cssSection;
			}
		}
	}
	
	return {}
}
