var n = fl.getDocumentDOM().selection.length;
var textField;

for(var i = 0; i < n; i++){
	textField = fl.getDocumentDOM().selection[i];
	textField.setTextString(textField.getTextString().toUpperCase());
}