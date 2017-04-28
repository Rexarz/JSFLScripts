xjsfl.init(this);
clear();
var doc = fl.getDocumentDOM();
var tline = doc.getTimeline();

//var scaleTxt = prompt("Enter step", "3");
var step = parseInt(scaleTxt.replace(",", "."));
var j = 0;
for (var i = tline.layers.length - 1; i >= 0; i--)
{
 var str = "/*effects:mask*/"
 tline.layers[j].frames[0].actionScript += "\n" + str;
 j++;
}

trace("DONE, thx Troy")