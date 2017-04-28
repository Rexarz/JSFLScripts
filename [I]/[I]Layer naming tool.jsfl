
xjsfl.init(this);
clear();
//Start();
//reName();
trace ("Done");
var xul = new XUL
    .factory()
	.setTitle('Adding color')
    .addButton('Load', 'button', {width:200}, {click:onClick})
	.addTextbox('Names', "names", {multiline:true, value:names})
function Start()
{

    var dc = fl.getDocumentDOM();
    var sel_array = dc.selection;
	prefix = "_blur";
    names=[];

    for (var i=0;i<sel_array.length;i++)
    {
        s = sel_array[i];
        names.push(s.name);
		//names.push(s.lay);
    }
        names = names.toString().split(",").join("\n");

    function onInitialize(event)
    {
		xu = this.controls;		
		xu.names.value=names;
    }
    function onClick(event)
    {   
		xu.names.value=names;
		xu.prefix.value=prefix;
		xu.prefix_chb.value=false;
		inspect(this.controls);
    }
    function onChange(event)
    {
		xu.prefix.enabled=xu.prefix_chb.value;	   
	   inspect(this.controls);
    }

    if (UI.selection)
    {
        XUL
		
		.factory('title:Rename instance names')
				
		.addButton('Load', 'button', {width:200}, {click:onClick})
		.addTextbox('Names', "names", {multiline:true, value:names})
		
		.addTextbox('Prefix', "prefix", {multiline:false, value:"_blur"})//, {change:onChange}
		
		.addCheckbox('Add prefix to All objects', 'prefix_chb', {checked:false},{click:onChange})
		.addEvent("prefix_chb", 'change', onChange)
		
		.addEvent('initialize', onInitialize)

        .show();
    }

}
function reName () {

    var dc = fl.getDocumentDOM();
    var sel_array = dc.selection;

    names=[];
    new_name = xu.names.value.toString().split("\n");
    if (new_name == 0) new_name = " ";
    for (var i=0;i<sel_array.length;i++)
    {
        s = sel_array[i];

        if (new_name.length <2) {
            s.name = new_name[0];
        } else {
            s.name = (new_name[i] == undefined || new_name[i] == " ")?"":new_name[i];		
        }
		if(s.name !=="" && xu.prefix_chb.value) s.name+=xu.prefix.value;
    }

}