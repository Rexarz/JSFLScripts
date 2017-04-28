fl.outputPanel.clear();
//fl.getDocumentDOM().getTimeline().setLayerProperty('name', 'icon_0');
xjsfl.init(this);
var i = null;
var f = fl.getDocumentDOM();
var t = fl.getDocumentDOM().getTimeline();
var o = t.layers.length;
var a = t.layers[t.currentLayer].name;
var _selectedLayers = t.selectedLayers;

f.selection[t.currentFrame].name = '';