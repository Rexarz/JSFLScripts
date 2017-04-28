xjsfl.init(this);
clear();
XUL.create('radio:Transform_position={LeftTop:lefttop, RigthTop:righttop, LeftBot:leftbot, RightBot:rightbot, Center:center},title:Select transform point position', ChangeTransform);
trace("DONE, thx Troy")

function ChangeTransform(Transform_position)
{
	if (Transform_position == "lefttop")
	{
		ProcessLayer(0,0);
	}
	if (Transform_position == "righttop")
	{
		ProcessLayer(1,0);
	}
	if (Transform_position == "leftbot")
	{
		ProcessLayer(0,1);
	}
	if (Transform_position == "rightbot")
	{
		ProcessLayer(1,1);
	}
	if (Transform_position == "center")
	{
		ProcessLayer(0.5, 0.5);
	}
}

function ProcessLayer( xFactor, yFactor )
{
	xF = xFactor;
	yF = yFactor;
	var doc = fl.getDocumentDOM();
	var tline = doc.getTimeline();
	var layer = tline.getSelectedLayers();
	var arrayFrames = tline.layers[layer].frames;
	for( var i = 0; i < arrayFrames.length; i++ )
	{
		if( i == arrayFrames[ i ].startFrame )
		{
			ProcessFrames( arrayFrames[ i ], xF, yF );
		}
	}
}

function ProcessFrames( pFrame, xFactor, yFactor )
{
	xF = xFactor;
	yF = yFactor;
	for( var i = 0; i < pFrame.elements.length; i++ )
	{
		ChangeElementTransform( pFrame.elements[ i ], xF, yF );
	}
	return;
}

function ChangeElementTransform( pElement, xFactor, yFactor )
{
	xF = xFactor;
	yF = yFactor;
	element = pElement;
	element.setTransformationPoint({x:0,y:0});
	element.setTransformationPoint({x:element.objectSpaceBounds.right * xF,y:element.objectSpaceBounds.bottom * yF}); 
}

