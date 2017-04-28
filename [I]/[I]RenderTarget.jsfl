var t = fl.getDocumentDOM().getTimeline();
var i_name = null;

i_name = fl.getDocumentDOM().selection[t.currentFrame].name;
fl.getDocumentDOM().setElementProperty('bitmapRenderMode', 'export')
fl.getDocumentDOM().clipCopy();

fl.getDocumentDOM().clipPaste();
fl.getDocumentDOM().setElementProperty('bitmapRenderMode', 'cache')
fl.getDocumentDOM().selection[t.currentFrame].name = '_'+ i_name;
