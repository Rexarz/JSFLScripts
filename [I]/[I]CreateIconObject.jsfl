fl.outputPanel.clear();
//fl.getDocumentDOM().getTimeline().setLayerProperty('name', 'icon_0');
xjsfl.init(this);
var i = null;
var f = fl.getDocumentDOM();
var t = fl.getDocumentDOM().getTimeline();
var o = t.layers.length;
var a = t.layers[t.currentLayer].name;
//alert(o);

var _selectedLayers = t.selectedLayers;
fl.getDocumentDOM().getTimeline().duplicateLayers();
_selectedLayers = _selectedLayers.concat(t.selectedLayers);

for (i=0; i < _selectedLayers.length / 2; i++) {
	f.selectNone();
	var element = _selectedLayers[i].frames[0].elements[0];
	element.selected = true;
	fl.getDocumentDOM().convertToSymbol('movie clip', _selectedLayers[i].name, 'center');
	f.selection[t.currentFrame].name = _selectedLayers[i].name;
}

for (i=_selectedLayers.length / 2; i < _selectedLayers.length ; i++) {
	f.selectNone();
	var element = _selectedLayers[i].frames[0].elements[0];
	element.selected = true;
	var s1 = _selectedLayers[i].name;
	s1 = s1.replace(/[^\d]/gi, '');
	trace(s1);
	_selectedLayers[i].name = 'anim_' + s1;
	f.convertToSymbol('movie clip', 'anim_' + s1, 'center');
	f.selection[t.currentFrame].name = 'anim_' + s1;
	f.enterEditMode('inPlace');
	f.clipCopy(true);
	f.breakApart();
	$timeline.layers[0].name = 'states';
	$timeline.insertFrames(6);
	$timeline.layers[0].frames[0].name = 'default';
	$timeline.insertKeyframe(7);
	$timeline.insertFrames(6);
	$timeline.layers[0].frames[7].name = 'anim';
	f.deleteSelection();
	f.clipPaste(true);
	f.selection = $timeline.layers[0].frames[8].elements;
	f.convertToSymbol('movie clip', 'InAnim_' + s1, 'center');
	fl.getDocumentDOM().enterEditMode('inPlace');
	var doc = fl.getDocumentDOM();
	var tline = doc.getTimeline();
	var _frames = tline.getSelectedFrames();
	fl.getDocumentDOM().getTimeline().addNewLayer();
	tline.layers[_frames[0]].frames[_frames[1]].actionScript = "stop();";
	f.exitEditMode();
	f.exitEditMode();
}




