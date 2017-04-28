/*
преобразует выделенные слои в мувиклип (сохраняет все анимации на выделенных слоях)

$dom; // same as fl.getDocumentDOM()
$timeline; // same as fl.getDocumentDOM().getTimeline()
$library; // same as fl.getDocumentDOM().library
$selection; // same as fl.getDocumentDOM().selection


Output:
inspect($library);
list($library);
*/
/**
 * @icon {iconsURI}Design/imaging/imaging_convert_gray_to_color.png
 */

xjsfl.init(this);
trace("  ");
clear();
ConvertLayersInMC();
trace("Done");
function ConvertLayersInMC()
{
	var layers = $timeline.getSelectedLayers();
	var _layer = layers[0];
	var _name = $timeline.layers[_layer].name;
	var _tempX = fl.getDocumentDOM().selection[0].x;
	var _tempY = fl.getDocumentDOM().selection[0].y;
	$timeline.cutLayers();
	var l=$timeline.addNewLayer(_name);
	$timeline.setSelectedLayers(l);
	$dom.addNewRectangle({left:0, top:0, right:10, bottom:10}, 0);
	$timeline.setSelectedFrames([l,0,1]);
	
	$dom.convertToSymbol('movie clip', _name, 'top left');	
	if ($library.getItemProperty('linkageImportForRS') == true) 
	{
		$library.setItemProperty('linkageImportForRS', false);
	}
	else 
	{
		$library.setItemProperty('linkageExportForAS', false);
		$library.setItemProperty('linkageExportForRS', false);
	}
	$library.setItemProperty('scalingGrid',  false);
	fl.getDocumentDOM().selection[0].x = _tempX;
	fl.getDocumentDOM().selection[0].y = _tempY;
	$dom.enterEditMode('inPlace');
	$timeline.pasteLayers();
	fl.getDocumentDOM().selectAll();
	fl.getDocumentDOM().selection[0].x = 0;
	fl.getDocumentDOM().selection[0].y = 0;
	$timeline.deleteLayer($timeline.layers.length-1);
	$dom.exitEditMode();
    $timeline.deleteLayer($timeline.layers.length-1);	
	//$dom.selection[0].x=0;
	//$dom.selection[0].y=0;
}
