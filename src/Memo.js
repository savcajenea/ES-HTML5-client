Memo = function(){}

/**
 * stage is divided in 3/6 cells, webCellWH - width and height of a cell from divided web
 */
Memo.webCellWH = new Point();

Memo.updateSizeValues = function(div){
  Memo.webCellWH.x = $(div).width()/3;
  Memo.webCellWH.y = $(div).height()/6;
}

/**
 * holds count down bar height
 */
Memo.countDownBar_height = 10;

/**
 * css for every section of slider
 * cssSection = [{.sectionID: sliderNumber+sectionID, .cssSection: {}}]
 */
Memo.cssSections = new Array();
