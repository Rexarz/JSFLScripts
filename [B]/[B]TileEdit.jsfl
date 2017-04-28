/**
 * @icon {iconsURI}Design/toolbox/toolbox_paintcan.png
 */

xjsfl.init(this);
trace(" ");
clear();
Start();
trace ("Done");
function Start()
{
	names=[NaN];
	bitmaps = ($$(":bitmap")).elements;	
	CurrentTexture = getBitmapFill(fl.getDocumentDOM().selection[0].contours[1].fill.bitmapPath);
	
	for ( image in bitmaps)
	{
		if (CurrentTexture.name == bitmaps[image].name)
			names[0]=bitmaps[image].name;
		else names.push(bitmaps[image].name);
		
	}
		
	if(UI.selection)
		{
			XUL
				.factory('title:Bitmap fill moving, dropdown:Texture={'+names+'}')
				//.factory('dropdown:Options=['+names+']')
				.addCheckbox('moving', 'moving')		
				.addSlider('X ofset (%)', 'ofsetX', [-100,0, 100])
				.addSlider('Y ofset (%)', 'ofsetY', [-100,0, 100])
				.add(<xml>radio:HAlignment=[Left,Right], radio:WAlignment=[Top,Bottom]</xml>)			
				.addButton('Apply', 'apply')
				.addEvent('apply', 'click', TileEdit)
				.show();
		}
}

function TileEdit()
{
	
	var ofsetX = this.controls.ofsetX.value;
	var ofsetY = this.controls.ofsetY.value;
	var moving = this.controls.moving.value;
	var HAlignment = this.controls.halignment.value;	
	var WAlignment = this.controls.walignment.value;
	var TextureName = this.controls.texture.value;
	var shape = fl.getDocumentDOM().selection[0];
	var HAlignmentOfset = (HAlignment == "Right"?shape.objectSpaceBounds.right-shape.objectSpaceBounds.left:0);
	var WAlignmentOfset = (WAlignment == "Bottom"?shape.objectSpaceBounds.bottom-shape.objectSpaceBounds.top:0);	

	shape.beginEdit();
	for (i in shape.vertices)
	{
		var deltaX = 9999;
		var deltaY = 9999;
		for (j in shape.vertices)
		{
			if (i == j) continue;
			var tempDeltaX = Math.abs(shape.vertices[i].x - shape.vertices[j].x);
			var tempDeltaY = Math.abs(shape.vertices[i].y - shape.vertices[j].y);
			
			if(tempDeltaX < deltaX)
			{
				deltaX = tempDeltaX;
				var posX = j;
			}
			if(tempDeltaY < deltaY)
			{
				deltaY = tempDeltaY;
				var posY = j;
			}
		}
		shape.vertices[i].setLocation(
						shape.vertices[posX].x,
						shape.vertices[posY].y
						);
		
		
	}		
	shape.endEdit();
	
	Bitmap = getBitmapFill(TextureName);			
	x = shape.objectSpaceBounds.left+HAlignmentOfset;
	y = shape.objectSpaceBounds.top+WAlignmentOfset;
	fillOfsetX = x + ofsetX*Bitmap.hPixels/100;
	fillOfsetY = y + ofsetY*Bitmap.vPixels/100;
	
	var fill = fl.getDocumentDOM().getCustomFill();
	fill.style = "bitmap";
	fill.matrix.a = 20;
	fill.matrix.b = 0;
	fill.matrix.c = 0;
	fill.matrix.d = 20;
	fill.bitmapPath = Bitmap.name;
	fill.bitmapIsClipped = false;
	if(moving)
	{
		fill.matrix.tx= fillOfsetX;
		fill.matrix.ty= fillOfsetY;
	}
	
	
	
	shape.contours[1].fill = fill;	

}

function getBitmapFill(bitmapPath)
{
	libraryObjects=($$(":bitmap")).elements;
	
	for each (item in libraryObjects)
	{
		if (item.name == bitmapPath)
			return item;
	}		
	return 0;
}


function getDecimal(num) {
  intValue = parseInt(num);
  floatValue = num - intValue;
  return floatValue;

}