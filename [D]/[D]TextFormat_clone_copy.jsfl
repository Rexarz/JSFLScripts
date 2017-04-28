/*
*/
fl.outputPanel.clear();

var doc = fl.getDocumentDOM();

xjsfl.init(this);
if (fl.getDocumentDOM().selection.length > 0)
{
    get_settings();
    save_settings();
}
function get_settings() {
    var cur_selection = doc.selection;
    var cur_text = cur_selection[0];
	
    txtFileContent = "<settings>";		
    txtFileContent += "\n\t<textRuns ";
    for (i in cur_text.textRuns[0]["textAttrs"]) {
        txtFileContent += i + '="' + cur_text.textRuns[0]['textAttrs'][i] + '" ';
    }
    txtFileContent += "/>\n";

    txtFileContent += "\t<tf ";

    txtFileContent += 'textType' + '="' + cur_text.textType + '" ';
    txtFileContent += 'lineType' + '="' + cur_text.lineType + '" ';
    txtFileContent += 'scaleX' + '="' + cur_text.scaleX + '" ';
    txtFileContent += 'scaleY' + '="' + cur_text.scaleY + '" ';
    txtFileContent += 'skewX' + '="' + cur_text.skewX + '" ';
    txtFileContent += 'skewY' + '="' + cur_text.skewY + '" ';
    txtFileContent += 'characters' + '="' + cur_text.textRuns[0].characters + '" ';
    txtFileContent += "/>";
	
    txtFileContent += "\n\t<filters> ";
	
    for (f in cur_text.filters) {
		
    txtFileContent += "\n\t\t<"+"f_"+f+" ";
		for (p in cur_text.filters[f]) {
			txtFileContent += p + '="' + cur_text.filters[f][p] + '" ';
		}
		
    txtFileContent += "/>\n";
	}
    txtFileContent += "\t</filters>";
	
    txtFileContent += "\n</settings>";
    //for filters
    /*for (i in cur_text.filters[0]){
    	txtFileContent += i + "=" + cur_text.filters[0][i] + "&";
    }
    */
}
function save_settings () {
    saveTo = "D|/Work/temp";
    saveAs = "textFormat_clone";

    fl.outputPanel.clear();
    fl.outputPanel.trace(txtFileContent);
    fl.outputPanel.save("file:///"+saveTo+"/"+saveAs+".xml");
    fl.outputPanel.clear();

	inspect(fl.getDocumentDOM().selection[0]);
    //load_settings ();
}