xjsfl.init(this);
fl.outputPanel.clear();
var doc = fl.getDocumentDOM();
var timeline = fl.getDocumentDOM().getTimeline();
var sel = fl.getDocumentDOM().selection;
var element = fl.getDocumentDOM().selection[timeline.layers[0].frames[0].elements];
var name = 'null';
var instName = 'null';

function getName(name,instName){
	buttonCreate(name,instName);
}

function buttonCreate(name,instName) {
	doc.convertToSymbol('movie clip', name, 'center');
	doc.selection[timeline.currentFrame].name = instName;
	doc.enterEditMode('inPlace');
	timeline.setFrameProperty('name', 'touch');
	doc.clipCopy();

	for (i=0;i<9;i++) {
		timeline.insertFrames();
	}

	trace('newLayer');
	doc.getTimeline().addNewLayer('button');
	doc.getTimeline().setSelectedFrames([]);
	doc.getTimeline().setFrameProperty('name', 'up');
	doc.clipPaste(true);
	doc.convertToSymbol('movie clip', name + '_main', 'center');
	doc.clipCopy();
	doc.convertToSymbol('movie clip', name + '_up', 'center');
	doc.getTimeline().insertBlankKeyframe(4);
	doc.getTimeline().setFrameProperty('name', 'down');
	doc.clipPaste(true);
	doc.convertToSymbol('movie clip', name + '_down', 'center');
	doc.transformSelection(0.949997, 0, 0, 0.949997);
	doc.setElementProperty('colorMode', 'advanced');
	doc.setElementProperty('colorRedPercent', '80');
	doc.setElementProperty('colorGreenPercent', '80');
	doc.setElementProperty('colorBluePercent', '80');	
	fl.getDocumentDOM().exitEditMode();


}


XUL.create('Button name, Instance name', getName);




