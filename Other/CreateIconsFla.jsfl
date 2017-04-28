fl.outputPanel.clear();
xjsfl.init(this);

var dom = fl.getDocumentDOM();
var timeline = fl.getDocumentDOM().getTimeline();
var layersCount = timeline.layers.length;

var originalLayers;
try{
	originalLayers = timeline.selectedLayers;
	log("Layers", originalLayers.length + " layers selected");
}catch (error){
	alert("Error in selection");
}

createIcons();
createAnimIcons();
createBlurIcons();


dom.getTimeline().reorderLayer(findLayerByName("blur"),0,true);

dom.save();


function createIcons(){
	var selectedIconLayers = timeline.selectedLayers;
	timeline.addNewLayer("icon");
	for (var i = 0; i < selectedIconLayers.length; i++){

		var element = selectedIconLayers[i].frames[0].elements[0];
		dom.selectNone();
		element.selected = true;

		dom.convertToSymbol('movie clip', originalLayers[i].name + ".object", 'top left');
		
		var x = element.x;
		var y = element.y;
		
		dom.enterEditMode("inPlace");
		var inElement = fl.getDocumentDOM().getTimeline().layers[0].frames[0].elements[0];
		inElement.x = x;
		inElement.y = y;
				
		dom.exitEditMode();
		
		timeline.layers[timeline.currentLayer].frames[timeline.currentFrame].elements[0].x = 0;
		timeline.layers[timeline.currentLayer].frames[timeline.currentFrame].elements[0].y = 0;
		
		dom.clipCut();
		timeline.deleteLayer(timeline.currentLayer);
		timeline.setSelectedLayers(findLayerByName("icon"));
		dom.clipPaste(true);
	
	}
	
	log("createIcons","objects created");	
	timeline.setSelectedFrames(0,0,true);
	dom.distributeToKeyframes();
	timeline.removeFrames(0);


}

function createAnimIcons(){
	timeline.duplicateLayers();
	timeline.layers[timeline.currentLayer].name = "anim";

	for (var i = 0; i < timeline.layers[timeline.currentLayer].frames.length; i++){
		var libraryName = timeline.layers[timeline.currentLayer].frames[i].elements[0].libraryItem.name;
		var libraryCount = libraryName.replace(/[^\d]/gi, '');
		dom.selectNone();
		dom.library.selectItem(libraryName);
		fl.getDocumentDOM().library.duplicateItem();
		dom.library.renameItem("anim_" + libraryCount + ".object");
		timeline.setSelectedLayers(findLayerByName("anim"));
		timeline.setSelectedFrames(i,i,true);
		dom.swapElement("anim_" + libraryCount + ".object");
		dom.enterEditMode("inPlace");
		dom.clipCopy(true);
		dom.breakApart();
		var inTimeline = fl.getDocumentDOM().getTimeline();
		inTimeline.layers[0].name = "test";
		
		inTimeline.layers[0].name = 'states';
		
		inTimeline.insertFrames(6);
		inTimeline.layers[0].frames[0].name = 'default';
		
		inTimeline.insertKeyframe(7);
		inTimeline.insertFrames(6);
		inTimeline.layers[0].frames[7].name = 'anim';
		
		dom.deleteSelection();
		dom.clipPaste(true);
		inTimeline.setSelectedFrames(8,8);
		
		dom.convertToSymbol('movie clip', 'InAnim_' + libraryCount, 'top left');
		dom.enterEditMode('inPlace');
		fl.getDocumentDOM().getTimeline().addNewLayer("stop");
		fl.getDocumentDOM().getTimeline().layers[0].frames[0].actionScript = "stop();";
		
		dom.exitEditMode();
		dom.exitEditMode();
	}
	log("createAnims","objects created");
}

function createBlurIcons(){
	timeline.setSelectedLayers(findLayerByName("icon"));
	timeline.duplicateLayers();
	timeline.layers[timeline.currentLayer].name = "blur";
	for (var i = 0; i < timeline.layers[timeline.currentLayer].frames.length; i++){
		var libraryName = timeline.layers[timeline.currentLayer].frames[i].elements[0].libraryItem.name;
		var libraryCount = libraryName.replace(/[^\d]/gi, '');
		dom.selectNone();
		dom.library.selectItem(libraryName);
		fl.getDocumentDOM().library.duplicateItem();
		dom.library.renameItem("icon_" + libraryCount + "_blur.object");
		timeline.setSelectedLayers(findLayerByName("blur"));
		timeline.setSelectedFrames(i,i,true);
		dom.swapElement("icon_" + libraryCount + "_blur.object");
			
		dom.enterEditMode("inPlace");
		dom.convertToSymbol("movie clip","blur_" + libraryCount, "top left");
		dom.getTimeline().layers[0].frames[0].elements[0].selected = true;
		fl.getDocumentDOM().addFilter('blurFilter');
		filters = fl.getDocumentDOM().selection[0].getFilters();
		filters[0].blurX = 0;
		filters[0].blurY = 70;
		dom.getTimeline().layers[0].frames[0].elements[0].setFilters(filters);
		fl.getDocumentDOM().transformSelection(0.500000, 0, 0, 0.500000);
		fl.getDocumentDOM().convertSelectionToBitmap();
		fl.getDocumentDOM().transformSelection(2, 0, 0, 2);
		dom.exitEditMode();
	}
	log("createBlurs","objects created");
}


//Additional functions
function log(tag,log){
	trace(tag + " : " + log)	
}

	function findLayerByName(name){
		var result;
		for (z = 0; z < fl.getDocumentDOM().getTimeline().layerCount; z++){
			if (fl.getDocumentDOM().getTimeline().layers[z].name == name){
				return z;
				break;
			
		}

	}
}

function ditributeToKF(name){
	timeline.setSelectedLayers(findLayerByName(name));
	timeline.setSelectedFrames(0,0,true);
	dom.distributeToKeyframes();
}
function getLayersList(){
	var layerCount = timeline.layerCount
	return timeline.layers;
}
	
	
	