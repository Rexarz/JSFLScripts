xjsfl.init(this);
clear();

for each (var el in $library.items)
{
	if (el.symbolType == "movie clip" && el.name != "icons.object")
	{
		fl.getDocumentDOM().library.editItem(el.name);
		fl.getDocumentDOM().selectNone();
		
		for each (var mc in $timeline.layers[0].frames[0].elements)
		{
			mc.selected = true;
		}
		
		fl.getDocumentDOM().convertToSymbol('movie clip', el.name + "blur", 'top left');
		fl.getDocumentDOM().selectNone();
		$timeline.layers[0].frames[0].elements[0].selected = true;
		fl.getDocumentDOM().addFilter('blurFilter');
		filters = fl.getDocumentDOM().selection[0].getFilters();
		filters[0].blurX = 0;
		filters[0].blurY = 70;
		$timeline.layers[0].frames[0].elements[0].setFilters(filters)
		fl.getDocumentDOM().transformSelection(0.500000, 0, 0, 0.500000);
		fl.getDocumentDOM().convertSelectionToBitmap();
		fl.getDocumentDOM().transformSelection(2, 0, 0, 2);

	}
}

fl.getDocumentDOM().library.editItem("icons.object");

for each (var l in $timeline.layers)
{
	if (l.frames[0].elements[0] != null)
		l.frames[0].elements[0].name += "_blur";
}