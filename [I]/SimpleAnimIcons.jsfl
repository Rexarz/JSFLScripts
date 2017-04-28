fl.getDocumentDOM().convertToSymbol('movie clip', '', 'top left');
fl.getDocumentDOM().enterEditMode('inPlace');
fl.getDocumentDOM().getTimeline().duplicateLayers();
fl.getDocumentDOM().getTimeline().pasteMotion();
xjsfl.init(this);
clear();
var doc = fl.getDocumentDOM();
var tline = doc.getTimeline();
var _frames = tline.getSelectedFrames();
fl.getDocumentDOM().getTimeline().addNewLayer();
tline.layers[_frames[0]].frames[_frames[1]].actionScript = "stop();";
inspect(doc.selection);
doc.getTimeline().setSelectedLayers(2);
doc.getTimeline().insertFrames(39);
fl.getDocumentDOM().setBlendMode('normal')
fl.getDocumentDOM().exitEditMode();
fl.getDocumentDOM().exitEditMode();


