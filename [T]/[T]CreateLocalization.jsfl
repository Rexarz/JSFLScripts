xjsfl.init(this);
clear();

var languages = "en es pt jp tr"
var localizations = prompt("Enter localizations", languages);
var locArray = localizations.split(" ");


var _selection = fl.getDocumentDOM().selection;
fl.getDocumentDOM().clipCut();
fl.getDocumentDOM().getTimeline().addNewLayer("localization");
var _layer = fl.getDocumentDOM().getTimeline().getSelectedLayers();
fl.getDocumentDOM().clipPaste(true);
var _selectedLayer = fl.getDocumentDOM().getTimeline().layers[_layer];

for (var i = 0; i < locArray.length; i++)
{
	_selectedLayer.frames[i].name = locArray[i];
	if (i < locArray.length - 1)
		fl.getDocumentDOM().getTimeline().convertToKeyframes();
}

for( var i = 0; i < _selectedLayer.frames.length; i++ )
{
	if( i == _selectedLayer.frames[ i ].startFrame )
	{
		fl.getDocumentDOM().getTimeline().insertFrames(3,true,i)
	}
}



trace("DONE, thx Troy")