﻿xjsfl.init(this);
clear();
var doc = fl.getDocumentDOM();
var tline = doc.getTimeline();
var _frames = tline.getSelectedFrames();
fl.getDocumentDOM().getTimeline().addNewLayer();
tline.layers[_frames[0]].frames[_frames[1]].actionScript = "stop();";;