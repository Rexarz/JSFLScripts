xjsfl.init(this);
fl.outputPanel.clear();
var doc = fl.getDocumentDOM();
var timeline = fl.getDocumentDOM().getTimeline();
var sel = fl.getDocumentDOM().selection;
var element = fl.getDocumentDOM().selection[timeline.layers[0].frames[0].elements];


function guideLayers(){
	timeline.setLayerProperty('layerType', 'guide');
	timeline.setLayerProperty('name', 'ref');
	timeline.addNewLayer();
	doc.selection[timeline.layers[0]];
}
function docCreate(){
	timeline.setLayerProperty('name', 'mobileObjects');
	doc.addNewRectangle({left:732.0, top:909.0, right:815.0, bottom:952.0}, 0);
	doc.selectAll();
	doc.convertToSymbol('movie clip', 'scene_mobile.object','center');
	doc.selection[timeline.currentFrame].x = 0;
	doc.selection[timeline.currentFrame].y = 0;
	doc.enterEditMode('inPlace');
	doc.convertToSymbol('movie clip', 'scene','center');
	doc.clipCopy();
	doc.exitEditMode();
	timeline.layers[0];
	doc.clipCut();
	timeline.insertBlankKeyframe(1);
	doc.clipPaste(true);
	timeline.addNewLayer('mobile', 'folder');
	timeline.layers[1].parentLayer = timeline.layers[0];
	timeline.addNewLayer();
	timeline.setLayerProperty('name', 'webObjects');
	doc.addNewRectangle({left:732.0, top:909.0, right:815.0, bottom:952.0}, 0);
	doc.selectNone();
	timeline.layers[0].frames[0].elements[0].selected = true;
	doc.convertToSymbol('movie clip', 'scene.object','center');
	element = fl.getDocumentDOM().selection[0];
	element.x = 0;
	element.y = 0;
	doc.enterEditMode('inPlace');
	doc.deleteSelection();
	fl.getDocumentDOM().library.addItemToDocument({x:1890.3, y:523.3});
	doc.library.addItemToDocument({x:0, y:0}, 'scene');
	doc.enterEditMode('inPlace');
	doc.deleteSelection();
	doc.exitEditMode();
	doc.exitEditMode();
	timeline.convertToBlankKeyframes()
	timeline.addNewLayer('web', 'folder');
	timeline.layers[1].parentLayer = timeline.layers[0];
	
	
}



guideLayers();

docCreate();
doc.save();
trace("Done, don't forget to commit");
