fl.outputPanel.clear();
var doc = fl.getDocumentDOM();
xjsfl.init(this);
load_settings ();
clone_text ();

function load_settings () {
    saveTo = "D|/Work/temp";
    saveAs = "textFormat_clone";
    XMLFile ="file:///"+saveTo+"/"+saveAs+".xml"
             var xml = new XML(FLfile.read(XMLFile));
    fl.trace (xml+"\n");

    text_a = xml.tf.attributes();
    text_f = xml.filters.attributes();
    result = "";
    textRuns_a = [];
    for (var i in xml.textRuns.attributes()) {
        textRuns_a[i] = xml.textRuns.attributes()[i];
    }
    fl.trace(textRuns_a.length+": textRuns_a = "+textRuns_a+"\n");
}
function clone_text () {


    var cur_selection = doc.selection;
    var mySelected = new Array();

    for (var i in cur_selection)
    {
        var sel = doc.selection[i];
        if (sel.elementType == "text")
            mySelected.push(sel);
    }
    for (var i in mySelected)
    {
        var cur_text = mySelected[i];
        //inspect(cur_text);
        cur_text.textType = text_a[0];
        cur_text.lineType = text_a[1];
        //cur_text.textRuns[0].characters = text_a[6];


        var i = 0;
        for (var a in cur_text.textRuns[0]["textAttrs"]) {
            var cur_a = cur_text.textRuns[0]['textAttrs'][a];
            i++;
        }

        cur_text.textRuns[0]['textAttrs'].characterSpacing = textRuns_a[3];
        cur_text.textRuns[0]['textAttrs'].letterSpacing = textRuns_a[4];
        cur_text.textRuns[0]['textAttrs'].face = textRuns_a[5];
        cur_text.textRuns[0]['textAttrs'].fillColor = textRuns_a[6];
        cur_text.textRuns[0]['textAttrs'].italic = (textRuns_a[7]=="true")?true:false;
        cur_text.textRuns[0]['textAttrs'].size = textRuns_a[9];
        cur_text.textRuns[0]['textAttrs'].alignment = textRuns_a[15];
        cur_text.textRuns[0]['textAttrs'].lineSpacing = textRuns_a[19];

    }
}
