xjsfl.init(this);
fl.outputPanel.clear();
var tempNames = [];
start();
layerRename();
function start(){

	var t = fl.getDocumentDOM().getTimeline();
	var doc = fl.getDocumentDOM();
	var sel = doc.selection;
	var t1 = t.layers[0].name;
	layerNames = [];
	var xul = new XUL
		.factory()
		.setTitle('Layer naming tool')
		.addTextbox('Names', "names", {multiline:true, value:names})
		.addButton('Load', 'button', {width:200}, {click:onClick})
		.addEvent('initialize', onInitialize)
		.show();
	
	function onInitialize(event){
		trace("init");
		for (var i=0; i < t.layers.length ; i++){
			s = t.layers[i];
			layerNames.push(s.name);
		}
		layerNames = layerNames.toString().split(",").join("\n");
		xul = this.controls;
		}
	function onClick(event)
		{   
			trace("Click");
			xul.names.value=layerNames;
			tempNames = xul.names.value;
		}	
}
function layerRename(){
	var dc = fl.getDocumentDOM();
    var sel_array = dc.getTimeline().layers;
    ln = tempNames.toString().split("\n");
    //new_name = xul.names.value.toString().split("\n");
	trace (ln);
    if (new_name == 0) new_name = " ";
    for (var i=0;i<sel_array.length;i++)
    {
		//fl.getDocumentDOM().getTimeline().layers[i].name = layerNames[i];
		//trace(fl.getDocumentDOM().getTimeline().layers[i].name);
		//trace(new_name[i]);
		fl.getDocumentDOM().getTimeline().layers[i].name = ln[i];
    }
}