//settings=fl.getDocumentDOM().xmlPanel(fl.configURI + 'Commands/swapInstances.xml');
fl.outputPanel.clear();
//if(settings.dismiss == "accept")
//{
	runBatch();
//}


function runBatch(){
	var doc = fl.getDocumentDOM();
	//var libraryName = settings.txt_library;
	
	var library = fl.getDocumentDOM().library;
	var libraryName = library.getSelectedItems()[0].name;
	fl.trace(libraryName);
	
	var selectedFrames = fl.getDocumentDOM().getTimeline().getSelectedFrames();
	var startframe =  selectedFrames[1];
	var endframe = selectedFrames[2];
	var timeline = fl.getDocumentDOM().getTimeline();
	var selectedLayer = timeline.getSelectedLayers()[0];
	
for ( var i=0; i < fl.getDocumentDOM().selection.length; i++ )  
{  
		var swapItem =   fl.getDocumentDOM().selection[i];
		//if(swapItem == "") {
			fl.getDocumentDOM().swapElement(libraryName);
		//}
}
	
}
