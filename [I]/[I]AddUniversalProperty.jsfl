xjsfl.init(this);
clear();
var doc = fl.getDocumentDOM();
var tline = doc.getTimeline();
var _frames = tline.getSelectedFrames();
//fl.getDocumentDOM().getTimeline().addNewLayer();
fl.getDocumentDOM().getTimeline().setSelectedFrames(1,1);
tline.layers[_frames[0]].frames[_frames[1]].actionScript = "/*property:Clip,false \n property:VAlignment,Center \n property:DimensionSource, ProportionalSize \n property:DimensionSourceScale, DownOnly \n*/";;