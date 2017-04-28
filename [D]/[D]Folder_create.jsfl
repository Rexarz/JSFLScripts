fl.getDocumentDOM().getTimeline().addNewLayer('mobile_ex', 'guide');
fl.getDocumentDOM().getTimeline().addNewLayer('mobile_scene');
//fl.getDocumentDOM().getTimeline().setFrameProperty("name","scene.object");
//fl.getDocumentDOM().getTimeline().setFrameProperty('labelType', 'name');
fl.getDocumentDOM().getTimeline().addNewLayer('mobile', 'folder');
var parLayer = fl.getDocumentDOM().getTimeline().layers[0]; 
//parLayer.layerType = "folder"; 
fl.getDocumentDOM().getTimeline().layers[1].parentLayer = parLayer;
fl.getDocumentDOM().getTimeline().layers[2].parentLayer = parLayer;

fl.getDocumentDOM().getTimeline().addNewLayer('web_ex', 'guide');
fl.getDocumentDOM().getTimeline().addNewLayer('web_scene');
fl.getDocumentDOM().getTimeline().addNewLayer('web', 'folder');
var parLayer = fl.getDocumentDOM().getTimeline().layers[0]; 
//parLayer.layerType = "folder"; 
fl.getDocumentDOM().getTimeline().layers[1].parentLayer = parLayer;
fl.getDocumentDOM().getTimeline().layers[2].parentLayer = parLayer;