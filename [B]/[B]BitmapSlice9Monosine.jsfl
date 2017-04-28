var settings = {
	parent:{
		name:null,
		currentFrame:null,
		currentLayer:null
		},
	n9mc:null,
	width:0,
	height:0,
	x:0,
	y:0
	};
(
function ()
	{
		var doc = fl.getDocumentDOM();
		var ui_obj = CreatUI();
		if(ui_obj.dismiss == "accept")
		{
			
			if (!Check()) return;
			
			settings.width = doc.selection[0].width;
			settings.height = doc.selection[0].height;
			settings.x = doc.selection[0].x;
			settings.y = doc.selection[0].y;
			
			if(ui_obj.apply == "true")
			{
				fl.trace("width: "+settings.width + "	height: "+settings.height);
				Slice();
				PrepareImage(ui_obj.scaleX/100, ui_obj.scaleY/100);
			}
			Slice();
			toMonosine();
			if(ui_obj.move_transform == "true" && ui_obj.apply == "true")
			{
				MoveTP();
			}
			if(ui_obj.restore_size == "true" && ui_obj.apply == "true")
			{
				RestoreSize();
			}
		}
	}
)();

function CreatUI()
{
	var UI = UIPanelOBJ("UI", "Scale central slices");
	UI.add_checkbox("apply", "Apply transform", false);
	UI.add_slider("scaleX", "Width scaling", 100, 0, 100);
	UI.add_slider("scaleY", "Height scaling", 100, 0, 100);	
	if(!fl.getDocumentDOM().getTimeline().libraryItem || fl.getDocumentDOM().getTimeline().libraryItem.scalingGrid != true){
		UI.add_checkbox("move_transform", "Move TransformationPoint to center", true);
		UI.add_checkbox("restore_size", "Restore image size and position", true);
	}
	return UI.show();
}
function RestoreSize()
{
	GoToParent();
	var n9mc = fl.getDocumentDOM().selection[0];
	
	settings.x = n9mc.x;
	settings.y = n9mc.y;
	
	n9mc.width = settings.width;
	n9mc.height = settings.height;
	n9mc.x = settings.x;
	n9mc.y = settings.y;
}
function MoveTP()
{
	GoToParent();
	var n9mc = fl.getDocumentDOM().selection[0];
	n9mc.transformationPoint = {
		x: n9mc.width/2,
		y: n9mc.height/2
	}
}
function GoToParent()
{
	if(settings.parent != null)
	{
		fl.getDocumentDOM().library.selectItem(settings.parent.name);
		fl.getDocumentDOM().library.editItem();
		fl.trace(settings.parent.currentFrame);
		fl.getDocumentDOM().getTimeline().currentFrame = settings.parent.currentFrame;
		fl.getDocumentDOM().getTimeline().currentLayer = settings.parent.currentLayer;
		
	}
	else
	{
		fl.getDocumentDOM().exitEditMode();
	}
}
function Slice()
{
	var timeline = fl.getDocumentDOM().getTimeline();
	var scaling_grid_rect = timeline.libraryItem.scalingGridRect;
	
	var lay = timeline.duplicateLayers();
	timeline.layers[lay+1].name = "n9";
	timeline.layers[lay].name = "original bitmap";	
	timeline.layers[lay].layerType = "guide";
	timeline.layers[lay].visible = false;
	
	fl.getDocumentDOM().breakApart();
	
	var selection = fl.getDocumentDOM().selection[0];
	var selection_rect = {
			left : selection.left,
			top : selection.top,
			right : selection.left+selection.width,
			bottom : selection.top+selection.height
		};

	CreateSlice(selection_rect.left, selection_rect.top, scaling_grid_rect.left, scaling_grid_rect.top, -1, -1);
	CreateSlice(scaling_grid_rect.left, selection_rect.top, scaling_grid_rect.right, scaling_grid_rect.top, -1, -1);
	CreateSlice(scaling_grid_rect.right, selection_rect.top, selection_rect.right, scaling_grid_rect.top, -1, -1);

	CreateSlice(selection_rect.left, scaling_grid_rect.top, scaling_grid_rect.left, scaling_grid_rect.bottom, -1, -1);
	CreateSlice(scaling_grid_rect.left, scaling_grid_rect.top, scaling_grid_rect.right, scaling_grid_rect.bottom, -1, -1);
	CreateSlice(scaling_grid_rect.right, scaling_grid_rect.top, selection_rect.right, scaling_grid_rect.bottom, -1, -1);

	CreateSlice(selection_rect.left, scaling_grid_rect.bottom, scaling_grid_rect.left, selection_rect.bottom, -1, -1);
	CreateSlice(scaling_grid_rect.left, scaling_grid_rect.bottom, scaling_grid_rect.right, selection_rect.bottom, -1, -1);
	CreateSlice(scaling_grid_rect.right, scaling_grid_rect.bottom, selection_rect.right, selection_rect.bottom, -1, -1);
	
	fl.getDocumentDOM().selectAll();
	fl.getDocumentDOM().moveSelectionBy({x:1, y:1});
}
function CreateSlice(left, top, right, bottom, offset_x, offset_y)
{
	try
	{
		fl.getDocumentDOM().setSelectionRect({left:left, top:top, right:right, bottom:bottom}, true, true);
	}
	catch (e)
	{
		return;
	}
	if(fl.getDocumentDOM().selection.length > 1)
	{
		fl.outputPanel.trace("WARNING: extra objects in the slice!");
	}
	else if(fl.getDocumentDOM().selection.length == 1)
	{
		fl.getDocumentDOM().union();
		fl.getDocumentDOM().selection[0].x += offset_x;
		fl.getDocumentDOM().selection[0].y += offset_y;
	}
}
function PrepareImage(scaleX, scaleY){
	var timeline = fl.getDocumentDOM().getTimeline();
	var grid = timeline.libraryItem.scalingGridRect;
	
	var doc = fl.getDocumentDOM();
	fl.getDocumentDOM().group();
	var selection = doc.selection[0].objectSpaceBounds;
	fl.getDocumentDOM().breakApart();
	
	doc.setSelectionRect({left:grid.left+1, top:selection.top, right:grid.right-1, bottom:selection.bottom}, true, true);
	if(doc.selection.length != 0)
	{
		doc.setTransformationPoint({x:grid.left, y:0});
		doc.transformSelection(scaleX, 0, 0, 1);
	}

	doc.setSelectionRect({left:selection.left, top:grid.top+1, right:selection.right, bottom:grid.bottom-1}, true, true);
	if(doc.selection.length != 0)
	{
		doc.setTransformationPoint({x:0, y:grid.top});
		doc.transformSelection(1, 0, 0, scaleY);
	}
	
	doc.setSelectionRect({left:grid.right, top:selection.top, right:selection.right, bottom:selection.bottom}, true, true);
	if(doc.selection.length != 0)
	{
		doc.moveSelectionBy({x:-((grid.right-grid.left) - (grid.right-grid.left) * scaleX), y:0});
	}
	
	doc.setSelectionRect({left:selection.left, top:grid.bottom, right:selection.right, bottom:selection.bottom}, true, true);
	
	if(doc.selection.length != 0)
	{
		doc.moveSelectionBy({x:0, y:-((grid.bottom-grid.top) - (grid.bottom-grid.top)*scaleY)});
	}	
	
	doc.selectAll()
	if(doc.selection.length != 0)
	{
		doc.convertSelectionToBitmap();
	}
	doc.library.setItemProperty('scalingGridRect', {left:grid.left, top:grid.top, right:grid.left+(grid.right-grid.left)*scaleX, bottom:grid.top+(grid.bottom-grid.top)*scaleY});
}
function Check() {
	var doc = fl.getDocumentDOM();
	var selection = doc.selection;
	var timeline = doc.getTimeline();
	
	if (doc == null) {
		alert('Error: you must have an fla open as your active document to run this jsfl');
		return false;
	}	
	
	if (selection.length != 1 || !selection[0].instanceType || (selection[0].instanceType != "bitmap" && !(selection[0].instanceType == "symbol" && selection[0].libraryItem.scalingGrid == true))) {
		alert('Error: please select a single bitmap object on the stage before running this command.');
		return false;
	}
	
	if(selection[0].instanceType && selection[0].instanceType == "symbol" && selection[0].libraryItem.scalingGrid == true)
	{
		if (timeline.libraryItem == null)
		{
			settings.parent = null;
		}
		else
		{
			settings.parent.name = timeline.libraryItem.name;
			settings.parent.currentFrame = timeline.currentFrame;
			settings.parent.currentLayer = timeline.currentLayer;
		}
		
		doc.library.selectItem(selection[0].libraryItem.name);
		doc.library.editItem();
		doc.selectAll();
		if (!Check()) return false;
	}
	else if(!timeline.libraryItem ||  timeline.libraryItem.scalingGrid != true)
	{
		if (timeline.libraryItem == null)
		{
			settings.parent = null;
		}
		else
		{
			settings.parent.name = timeline.libraryItem.name;
			settings.parent.currentFrame = timeline.currentFrame;
			settings.parent.currentLayer = timeline.currentLayer;
		}
		settings.n9mc = fl.getDocumentDOM().convertToSymbol('movie clip', '', 'top left');
		
		doc.library.selectItem(settings.n9mc.name);
		fl.getDocumentDOM().library.setItemProperty('scalingGrid',  true);		
		fl.getDocumentDOM().library.editItem();
	}
	
	return true;
}



function toMonosine()
{
	var doc = fl.getDocumentDOM();
	timeline = doc.getTimeline();	
	timeline.layers[timeline.currentLayer].frames[timeline.currentFrame].name = "skip";
	timeline.layers[timeline.currentLayer].frames[timeline.currentFrame].labelType = "comment";	
	timeline.currentLayer-=1;		
	timeline.duplicateLayers(timeline.currentLayer);
	timeline.layers[timeline.currentLayer].layerType = "normal";	
	timeline.layers[timeline.currentLayer].frames[timeline.currentFrame].elements[0].scaleX = 0;
	timeline.layers[timeline.currentLayer].frames[timeline.currentFrame].elements[0].scaleY = 0;
	timeline.layers[timeline.currentLayer].name = "Bitmap for a Monosine";
	timeline.layers[timeline.currentLayer+1].name = "Original bitmap";
	timeline.layers[timeline.currentLayer+2].name = "For View";
}
function UIPanelOBJ(dialog_id, dialog_name)
{
    return {
		header_ui : "<?xml version=\"1.0\"?><dialog id=\""+dialog_id+"\" title=\""+dialog_name+"\" buttons=\"accept, cancel\"><grid><columns><column/><column/></columns><rows>",
		bottom_ui : "</rows></grid></dialog>",
		main_ui : "",
		show : function()
		{
			return fl.xmlPanelFromString(this.header_ui + this.main_ui + this.bottom_ui);
		},
		add_script : function(script)
		{
			script = script.replace(/\"/g, "'");
			this.main_ui += "<script>"+script+"</script>";
		},
		add_string : function (str)
		{
			this.main_ui += "<row align=\"center\"><label value='"+str+"'/></row>";
		},
		add_slider : function (id, label, value, minvalue, maxvalue)
		{
			this.main_ui += "<row align=\"center\"><label value='"+label+"'/><popupslider id='"+id+"' value='"+value+"' minvalue='"+minvalue+"' maxvalue='"+maxvalue+"'/></row>";
		},
		add_checkbox : function (id, label, checked, oncommand)
		{
			if(oncommand == undefined) oncommand ="";
			if(checked==undefined) checked = false;
			this.main_ui += "<row align=\"center\"><checkbox oncommand=\""+oncommand+"\" id='"+id+"' label='"+label+"' checked='"+checked+"'/></row>";
		},
		add_separator : function (width)
		{
			if(width==undefined)width = "100%";
			this.main_ui += "<row align=\"center\"><separator width='"+width+"'/><separator/></row>";
		}	
    }
}