﻿ConvertLayersInMC();
function ConvertLayersInMC()
{
	var layerName = fl.getDocumentDOM().getTimeline().layers[0].name;
	fl.getDocumentDOM()
	fl.getDocumentDOM().getTimeline().cutLayers();
	
	var l=fl.getDocumentDOM().getTimeline().addNewLayer()
	fl.getDocumentDOM().getTimeline().layers[1].name = layerName;
	fl.getDocumentDOM().getTimeline().deleteLayer(0);
	fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
	fl.getDocumentDOM().addNewRectangle({left:0, top:0, right:10, bottom:10}, 0);
	fl.getDocumentDOM().getTimeline().setSelectedFrames([l,0,1]);
	
	fl.getDocumentDOM().convertToSymbol('movie clip', layerName, 'top left');	
	if (fl.getDocumentDOM().library.getItemProperty('linkageImportForRS') == true) 
	{
		fl.getDocumentDOM().library.setItemProperty('linkageImportForRS', false);
	}
	else 
	{
		fl.getDocumentDOM().library.setItemProperty('linkageExportForAS', false);
		fl.getDocumentDOM().library.setItemProperty('linkageExportForRS', false);
	}
	fl.getDocumentDOM().library.setItemProperty('scalingGrid',  false);	
	fl.getDocumentDOM().enterEditMode('inPlace');
	fl.getDocumentDOM().getTimeline().pasteLayers();		
	fl.getDocumentDOM().getTimeline().deleteLayer(fl.getDocumentDOM().getTimeline().layers.length-1);
	fl.getDocumentDOM().exitEditMode();
    fl.getDocumentDOM().selection[0].x=fl.getDocumentDOM().selection[0].y=0;
}