var layerIndex = fl.getDocumentDOM().getTimeline().addNewLayer("touch_area");
fl.getDocumentDOM().getTimeline().setFrameProperty('name', 'touch');
//fl.getDocumentDOM().getTimeline().setLayerProperty('locked', true);
for (i=0;i<9;i++) {
    fl.getDocumentDOM().getTimeline().insertFrames();
}
var layerIndex = fl.getDocumentDOM().getTimeline().addNewLayer("button");
//fl.getDocumentDOM().getTimeline().setLayerProperty('locked', true);
fl.getDocumentDOM().getTimeline().setSelectedFrames([]);
fl.getDocumentDOM().getTimeline().setFrameProperty('name', 'up');
fl.getDocumentDOM().getTimeline().insertKeyframe(4);
fl.getDocumentDOM().getTimeline().setFrameProperty('name', 'down');