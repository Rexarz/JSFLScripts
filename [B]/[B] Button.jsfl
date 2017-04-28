/**
 *@icon {iconsURI}development\brick\brick_add.png
 */
xjsfl.init(this);
clear();
XUL.create('text:InstanceName=name,radio:type={Button:button, Checkbox:checkbox},radio:order={Standart:true, Invers:false},title:Create Button or Checkbox', CreateButtons);
trace ("Done");
 
 
function CreateButtons(name, type, order)
{	
	$dom.convertToSymbol('movie clip', '', 'top left');	
	if ($library.getItemProperty('linkageImportForRS') == true) 
		{
			$library.setItemProperty('linkageImportForRS', false);
		}
	else 
		{
			$library.setItemProperty('linkageExportForAS', false);
			$library.setItemProperty('linkageExportForRS', false);
		}
	$library.setItemProperty('scalingGrid',  false);
 
	$selection[0].name=name;
	$dom.enterEditMode('inPlace');
	$dom.selectAll();	
	$dom.distributeToKeyframes();	
 
	$timeline.currentLayer = 0; 
	$timeline.removeFrames(0);
 
	if(order)
	{
		$timeline.setSelectedFrames([0, 0,$timeline.frameCount]);
		$timeline.reverseFrames();		
	}	
	$timeline.layers[0].name=type;
 
	for(var i=0; i<$timeline.frameCount;i++)
	{		
		switch (i)
		{
			case 0: 	$timeline.layers[0].frames[i].name='up'; 		break;
			case 1: 	$timeline.layers[0].frames[i].name='down';		break;
			case 2: 	$timeline.layers[0].frames[i].name='dis';		break;			
			default:	$timeline.layers[0].frames[i].name='BtnState_'+i;
		}
 
	}	
	$dom.exitEditMode();
}