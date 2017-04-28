xjsfl.init(this);
clear();
var doc = fl.getDocumentDOM();
var tline = doc.getTimeline();

var scaleTxt = prompt("Enter step", "3");
var step = parseInt(scaleTxt.replace(",", "."));
var j = 0;
for (var i = tline.layers.length - 1; i >= 0; i--)
{
 var str = "property:drawOrder, " + (Math.floor((i - 1)/2) * step + 3);
 tline.layers[j].frames[0].actionScript = str;
 j++;
}

trace("DONE, thx Troy")