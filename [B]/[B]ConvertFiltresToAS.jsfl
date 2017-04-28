xjsfl.init(this);
clear();
var commonText = "property:"
var text = "";
var new_name = "";
var struct = {};
var curLayer = 0;
XUL.create('radio:Modes={MC_to_Bitmap:true, Bitmap_to_MC:false},title:Modes', pickMode);

function pickMode(_mode)
{
	if (_mode)
	{
		XUL.create('radio:Run script for...={Layers:true, Element:false},title:Run script for...', mainFuncToBitmap);
	}
	else
	{
		XUL.create('radio:Run script for...={Layers:true, Element:false},title:Run script for...', mainFuncToMC);
	}
}

function writeToAS(_text)
{
	// length of /*\n*/ is currently 5
	if (_text.length != 5)
	{
		$timeline.layers[curLayer].frames[$timeline.currentFrame].actionScript = _text;
	}
}

function convertFilters(_element)
{
	if (_element.filters)
	{
		for (var i = 0; i < _element.filters.length; i++)
		{
			if (_element.filters[i].name == "adjustColorFilter")
			{
				convertAdjustColorFilter(_element.filters[i]);
			}
		}
	}
	if (_element.colorAlphaPercent != 100 || _element.colorRedPercent != 100 || _element.colorGreenPercent != 100 || _element.colorBluePercent != 100)
	{
		convertColorModulation(_element);
	}
	if (_element.colorAlphaAmount != 0 || _element.colorRedAmount != 0 || _element.colorGreenAmount != 0 || _element.colorBlueAmount != 0)
	{
		convertColorOffset(_element);
	}
	if (_element.blendMode != "normal")
	{
		text += "blendMode:" + _element.blendMode.toString() + "\n";
	}
}

function convertAdjustColorFilter(filter)
{
	if ( filter.brightness != 0)
	{
		text += commonText + "brightness," + filter.brightness.toString() + "\n";
	}
	if ( filter.contrast != 0)
	{
		text += commonText + "contrast," + filter.contrast.toString() + "\n";
	}
	if ( filter.saturation != 0)
	{
		text += commonText + "saturation," + filter.saturation.toString() + "\n";
	}
	if ( filter.hue != 0)
	{
		text += commonText + "hue," + filter.hue.toString() + "\n";
	}
}

function convertColorModulation(_element)
{
	var _r = Math.round(_element.colorRedPercent * 2.55);
	var _g = Math.round(_element.colorGreenPercent * 2.55);
	var _b = Math.round(_element.colorBluePercent * 2.55);
	var _a = Math.round(_element.colorAlphaPercent * 2.55);
	text += commonText + "color," + _r.toString() + "," + _g.toString() + "," + _b.toString() + "," + _a.toString() + "\n";
}

function convertColorOffset(_element)
{
	var _r = Math.round(_element.colorRedAmount / 2.55) / 100;
	var _g = Math.round(_element.colorGreenAmount / 2.55) / 100;
	var _b = Math.round(_element.colorBlueAmount / 2.55) / 100;
	var _a = Math.round(_element.colorAlphaAmount / 2.55) / 100;
	text += commonText + "coloroffset," + _r.toString() + "," + _g.toString() + "," + _b.toString() + "," + _a.toString() + "\n";
}

function ProcessFrames( pFrame )
{
	for( var i = 0; i < pFrame.elements.length; i++ )
	{
		processMC( pFrame.elements[ i ] );
	}
	return;
}

function processMC( _element)
{
	text = "/*\n";
	convertFilters(_element);
	text +="*/";
	writeToAS(text);

	// save transformation point

	var xPoint = _element.transformationPoint.x;
	var yPoint = _element.transformationPoint.y;
	fl.getDocumentDOM().selectNone();
	_element.selected = true;
	fl.getDocumentDOM().breakApart();
	var newElement = fl.getDocumentDOM().selection[0];
	newElement.setTransformationPoint({x:xPoint, y:yPoint});
}	

function mainFuncToBitmap(flag)
{
	var element = fl.getDocumentDOM().selection[0];
	if (!flag)
	{
		if ( element != null && element.instanceType != "symbol")
		{
			alert("You must select movie clip");
			return;
		}
		processMC(element);
	}
	else
	{
		var layer = $timeline.getSelectedLayers();
		for (var j = 0; j < layer.length; j++)
		{
			var arrayFrames = $timeline.layers[layer[j]].frames;
			curLayer = layer[j];
			for( var i = 0; i < arrayFrames.length; i++ )
			{
				if( i == arrayFrames[ i ].startFrame )
				{
					$timeline.currentFrame = i;
					ProcessFrames( arrayFrames[ i ]);
				}
			}
		}
	}
}

function parseAdjustColorFilter(_brightness,_saturation,_contrast,_hue)
{
	if ( _brightness != _saturation != _contrast != _hue != 0)
	{
		if (fl.getDocumentDOM().selection[0].filters == null)
		{
			fl.getDocumentDOM().addFilter("adjustColorFilter");
		}
		fl.getDocumentDOM().setFilterProperty("brightness",0,_brightness);
		fl.getDocumentDOM().setFilterProperty("saturation",0,_saturation);
		fl.getDocumentDOM().setFilterProperty("contrast",0,_contrast);
		fl.getDocumentDOM().setFilterProperty("hue",0,_hue);
	}
}

function parseColor(_element, _str)
{
	var _subStr = _str.split(",");
	trace (_subStr)
	_element.colorRedPercent = Math.round(_subStr[1] / 2.55);	
	_element.colorGreenPercent = Math.round(_subStr[2]/ 2.55);
	_element.colorBluePercent = Math.round(_subStr[3]/ 2.55);	
	trace(Math.round(_subStr[4].split("*")[0]/ 2.55));
	_element.colorAlphaPercent = Math.round(_subStr[4].split("*")[0]/ 2.55);
	
}

function parseColorOffset(_element, _str)
{
	var _subStr = _str.split(",");
	_element.colorRedAmount = _subStr[1] * 255;	
	_element.colorGreenAmount = _subStr[2] * 255;	
	_element.colorBlueAmount = _subStr[3] * 255;	
	_element.colorAlphaAmount = _subStr[4].split("*")[0] * 255;	
}

function processBitmap(_element)
{
	fl.getDocumentDOM().selectNone();
	var xPoint = _element.transformationPoint.x;
	var yPoint = _element.transformationPoint.y;
	var xPosition = _element.x;
	var yPosition = _element.y;
	var xSkew = _element.skewX;
	var ySkew = _element.skewY;
	var xScale = _element.scaleX;
	var yScale = _element.scaleY;
	_element.selected = true;
	text = $timeline.selectedLayers[0].frames[$timeline.currentFrame].actionScript;
	var filterArray = text.split(commonText);
	var _nameArray = _element.libraryItem.name.split("/");
	var _name = _nameArray[_nameArray.length -1];
	var isFirst = true;
	new_name = _name + Math.floor((Math.random() * 10000) + 1);
	fl.getDocumentDOM().convertToSymbol('movie clip', new_name, 'top left');
	if (!(_name.toString() in struct))
	{
		struct[_name.toString()] = new_name;
	}
	else
	{
		isFirst = false;
	} 
	var newElement = fl.getDocumentDOM().selection[0];
	var tmpEl = newElement.libraryItem.timeline.layers[0].frames[0].elements[0];
	tmpEl.skewX = 0;
	tmpEl.skewY = 0;
	tmpEl.scaleX = 1;
	tmpEl.scaleY = 1;
	tmpEl.x = 0;
	tmpEl.y = 0;
	newElement.colorMode = "advanced";
	var _brightness = _saturation = _contrast = _hue = 0;
	for (var i = 0; i < filterArray.length; i++)
	{
		if (filterArray[i].indexOf("coloroffset") != -1)
		{

			parseColorOffset(newElement, filterArray[i]);
			continue;
		}
		if (filterArray[i].indexOf("color") != -1 && filterArray[i].indexOf("coloroffset") == -1)
		{
			parseColor(newElement, filterArray[i]);
			continue;
		}
		if (filterArray[i].indexOf("brightness") != -1)
		{
			_brightness = Number(filterArray[i].split(",")[1].split("*")[0]);
		}
		if (filterArray[i].indexOf("saturation") != -1)
		{
			_saturation = Number(filterArray[i].split(",")[1].split("*")[0]);
		}
		if (filterArray[i].indexOf("contrast") != -1)
		{
			_contrast= Number(filterArray[i].split(",")[1].split("*")[0]);
		}
		if (filterArray[i].indexOf("hue") != -1)
		{
			_hue = Number(filterArray[i].split(",")[1].split("*")[0]);
		}
		
	}
	if (text.indexOf("blendMode,add") != -1)
	{
		newElement.blendMode = "add";
	}
	if (text.indexOf("blendMode,screen") != -1)
	{
		newElement.blendMode = "screen";
	}
	if (text.indexOf("blendMode,multiply") != -1)
	{
		newElement.blendMode = "multiply";
	}
	if (text.indexOf("blendMode,subtract") != -1)
	{
		newElement.blendMode = "subtract";
	}
	parseAdjustColorFilter(_brightness,_saturation,_contrast,_hue);
	$timeline.selectedLayers[0].frames[$timeline.currentFrame].actionScript = "";
	fl.getDocumentDOM().selection[0].setTransformationPoint({x:xPoint, y:yPoint});
	if (!isFirst)
	{
		fl.getDocumentDOM().swapElement(struct[_name]);
		fl.getDocumentDOM().selection[0].skewX = xSkew;
		fl.getDocumentDOM().selection[0].skewY = ySkew;
		fl.getDocumentDOM().selection[0].scaleX = xScale;
		fl.getDocumentDOM().selection[0].scaleY = yScale;
		fl.getDocumentDOM().selection[0].x = xPosition;
		fl.getDocumentDOM().selection[0].y = yPosition;
		fl.getDocumentDOM().library.selectNone();
		fl.getDocumentDOM().library.selectItem(new_name);
		fl.getDocumentDOM().library.deleteItem();
	}
	else
	{
		fl.getDocumentDOM().selection[0].skewX = xSkew;
		fl.getDocumentDOM().selection[0].skewY = ySkew;
		fl.getDocumentDOM().selection[0].scaleX = xScale;
		fl.getDocumentDOM().selection[0].scaleY = yScale;
		fl.getDocumentDOM().selection[0].x = xPosition;
		fl.getDocumentDOM().selection[0].y = yPosition;
	}
}

function ProcessFramesToMC( pFrame )
{
	for( var i = 0; i < pFrame.elements.length; i++ )
	{
		processBitmap( pFrame.elements[ i ] );
	}
	return;
}

function mainFuncToMC(flag)
{
	var element = fl.getDocumentDOM().selection[0];
	if (element.instanceType != "bitmap")
	{
		alert("You must select bitmap");
		return;
	}
	if (!flag)
	{
		processBitmap(element);
	}
	else
	{
		var layer = $timeline.getSelectedLayers();
		for (var j = 0; j < layer.length; j++)
		{
			new_name = "";
			var arrayFrames = $timeline.layers[layer[j]].frames;
			for( var i = 0; i < arrayFrames.length; i++ )
			{
				if( i == arrayFrames[ i ].startFrame )
				{
					$timeline.currentFrame = i;
					ProcessFramesToMC( arrayFrames[ i ]);
				}
			}
		}
	}
}
trace("DONE, thx Troy")