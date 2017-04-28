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

var context = Context.create();

createIcons();
createAnimIcons();
//createBlurIcons();




function createIcons(){
	timeline.duplicateLayers();
	var selectedIconLayers = timeline.selectedLayers;
	timeline.addNewLayer("icons");
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
		timeline.setSelectedLayers(findLayerByName("icons"));
		dom.clipPaste(true);
	
	}
	
	log("createIcons","objects created");	
	ditributeToKF();
	timeline.removeFrames(0);


}

function createAnimIcons(){
	timeline.setSelectedLayers(0);
	timeline.addNewLayer("anims");
	timeline.insertBlankKeyframe(timeline.layers[findLayerByName("icons")].frames.length);
	
	var animFrame = timeline.layers[findLayerByName("anims")].frames.length-1;

	timeline.setSelectedFrames([]);
	
	for (var x = 2; x < getLayersList().length; x++){
		timeline.setSelectedLayers(x,false);
	}
	dom.getTimeline().duplicateLayers();
	
	var selectedAnimLayers = timeline.selectedLayers;

	for (var i = 0; i < selectedAnimLayers.length; i++){
		var element = selectedAnimLayers[i].frames[0].elements[0];
		element.selected = true;
		
		timeline.setSelectedFrames(0,0,true);

		var animName = selectedAnimLayers[i].name;
		animName = animName.replace(/[^\d]/gi, '');
		dom.convertToSymbol('movie clip', "anim_" + animName + ".object", 'top left');
		
		var x = fl.getDocumentDOM().getTimeline().layers[dom.getTimeline().currentLayer].frames[0].elements[0].x;
		var y = fl.getDocumentDOM().getTimeline().layers[dom.getTimeline().currentLayer].frames[0].elements[0].y;

		dom.enterEditMode("inPlace");
		var inElement = fl.getDocumentDOM().getTimeline().layers[0].frames[0].elements[0];
		inElement.x = x;
		inElement.y = y;
		dom.exitEditMode();
		
		fl.getDocumentDOM().getTimeline().layers[dom.getTimeline().currentLayer].frames[0].elements[0].x = 0;
		fl.getDocumentDOM().getTimeline().layers[dom.getTimeline().currentLayer].frames[0].elements[0].y = 0;
		
		dom.clipCut();
		timeline.deleteLayer(timeline.currentLayer);
		timeline.setSelectedLayers(findLayerByName("anims"));
		timeline.setSelectedFrames(animFrame,animFrame,true);
		dom.clipPaste(true);
		
		timeline.setSelectedLayers(findLayerByName("anims"));
		timeline.setSelectedFrames(animFrame,animFrame,true);
		dom.distributeToKeyframes();
		timeline.removeFrames(animFrame,animFrame);
	}


}

function createBlurIcons(){
	timeline.setSelectedLayers(0);
	timeline.addNewLayer("blurs");
	timeline.insertBlankKeyframe(timeline.layers[findLayerByName("anims")].frames.length);
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

function ditributeToKF(){
	timeline.setSelectedLayers(findLayerByName("icons"));
	timeline.setSelectedFrames(0,0,true);
	dom.distributeToKeyframes();
}
function getLayersList(){
	var layerCount = timeline.layerCount
	return timeline.layers;
}
	
	
	