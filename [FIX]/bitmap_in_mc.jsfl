fl.outputPanel.clear;
xjsfl.init(this);
var layerName = fl.getDocumentDOM().selection[0].layer.name;
var sel = fl.getDocumentDOM().selection;
fl.getDocumentDOM().convertToSymbol('movie clip', layerName, 'top left');
var element = fl.getDocumentDOM().getTimeline().layers[fl.getDocumentDOM().getTimeline().currentLayer].frames[fl.getDocumentDOM().getTimeline().currentFrame].elements[0];
element.selected = true;
fl.getDocumentDOM().enterEditMode('inPlace');
trace(fl.getDocumentDOM().selection)
fl.getDocumentDOM().getTimeline().layers[0].name = layerName;
fl.getDocumentDOM().exitEditMode();