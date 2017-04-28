xjsfl.init(this);
clear();

var objects = fl.getDocumentDOM().library.getSelectedItems();

var doc = fl.getDocumentDOM();
var w = doc.width * 0.04;
var h = doc.height * 0.04;
doc.width = doc.width + Math.round(w);
doc.height = doc.height + Math.round(h);
if (objects.length != 0)
{


	for each (var obj in objects)
	{
		doc.library.editItem(obj.name)
		var layers = $timeline.layers;
		for (var j = 0; j < layers.length; j++)
		{
			layers[j].locked = false;
			layers[j].visible = true;
			for (var i = 0; i < layers[j].frames.length; i++)
			{
				var _frame = layers[j].frames[ i ];
				if ( i == _frame.startFrame )
					{
						$timeline.setSelectedLayers(j);
						$timeline.setSelectedFrames(i,i,true);
						trace(doc.selection)
						trace($timeline.currentLayer)
						if (doc.selection.length != 0)
						{
							var dx = w / 2;
							var dy = h / 2;
							doc.moveSelectionBy({x:dx, y:0});
						}
					}
			}
		}
	}
}
doc.save();
doc.close();

trace("DONE, thx Troy")