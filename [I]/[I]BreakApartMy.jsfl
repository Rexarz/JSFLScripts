/*
BreakApart с сохранением вложенных анимаций
$dom; // same as fl.getDocumentDOM()
$timeline; // same as fl.getDocumentDOM().getTimeline()
$library; // same as fl.getDocumentDOM().library
$selection; // same as fl.getDocumentDOM().selection
Output:
inspect($library);
list($library);
*/
/**
 * @icon {iconsURI}Design/imaging/imaging_convert_gray_to_color.png
 */

xjsfl.init(this);
trace("  ");
clear();
BreakApart();
trace("Done");

function BreakApart()
{
	if ($selection.length!=1){
		alert("Need to select one MC");
		return;
	}
	if($selection[0].symbolType!="movie clip"){
		alert("Need MC");
		return;
	}
	var posX = $selection[0].x;
	var posY = $selection[0].y;	
	$dom.enterEditMode('inPlace');	
	
	
	var 
	l=0,
	i = 0;
	while(l < $timeline.layers.length)
	{	
		$timeline.setSelectedLayers(l, false); 	
		l++; 	
	}	
	$timeline.copyLayers();	
	$dom.exitEditMode();
	$dom.deleteSelection();
	$timeline.pasteLayers();

	l=0;	
	newlayers = $timeline.selectedLayers;
	while(l < newlayers.length)
	{				
		i = 0;				
		while(i < newlayers[l].frames.length)
		{			
			for each (var element in newlayers[l].frames[i].elements)
			{			
				element.x+=posX;
				element.y+=posY;
			}
			i+=newlayers[l].frames[i].duration;			
		}		
		l++; 	
	}	
}