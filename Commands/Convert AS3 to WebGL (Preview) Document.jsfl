///////////////////////////////////////////////////////
// ERROR STRINGS FOR LOCALIZATION

var notFlash_ERROR = "Only Actionscript Document can be converted.";
var notSaved_ERROR = "Unused library items are not copied.To copy them save the Actionscript document and convert the file.";
var noDOM_ERROR = "No valid Document is open.";
var nofilelocation_ERROR = "Failed to create WebGL (Preview) Document. Specify a destination filename to convert the file.";
var conversion_SUCCESS = "New WebGL (Preview) Document created.";

////////////////////////////////////////////////////////


var height;
var width;
var bgColor;
var frameRate;
var unusedItems;



fl.outputPanel.clear();

var dom = fl.getDocumentDOM();
if (!dom) {
	alert(noDOM_ERROR);
} else if (dom.type !== "Flash") {
	alert(notFlash_ERROR);
} else {
	convertFile();
}



function convertFile() {
	try {
		var filePath = dom.pathURI;
		height = dom.height;
		width = dom.width;
		bgColor = dom.backgroundColor;
		frameRate = dom.frameRate;
		var tls = dom.timelines;
		var sourceLibrary = dom.library.items;


		for (var j = 0; j < tls.length; j++) {
			
			var fileURL = fl.browseForFileURL("save", "Save File", "FLA document (*.fla)", "fla");
			
			if (fileURL == null) {
				fl.trace(nofilelocation_ERROR);
				return;
			}
			var dom2 = fl.createDocument("webGLDoc");
			var fileSave_start = fl.saveDocument(dom2, fileURL);
			if (!fileSave_start) {
				//alert(nofilelocation_ERROR);
				return;
			}
			
			dom.editScene(j);
			var tl = dom.getTimeline();
			var fileName = tl.name;
			

			var m = tl.layerCount;
			tl.copyLayers(0, m - 1);
			dom2.width = width;
			dom2.height = height;
			dom2.backgroundColor = bgColor;
			dom2.frameRate = frameRate;
			var tl2 = dom2.getTimeline();
			tl2.pasteLayers();

			var unusedItems = [];

			var destLibrary = dom2.library;
			for (var sourceCount in sourceLibrary) {
				if (!destLibrary.itemExists(sourceLibrary[sourceCount].name)) {
					unusedItems.push(sourceLibrary[sourceCount]);
				}
			}

			var layerIndex = tl2.addNewLayer("unusedItem", "guide");

			for (var unusedCount in unusedItems) {
				dom2.addItem({
					x: 0,
					y: 0
				}, unusedItems[unusedCount]);
			}
			tl2.deleteLayer(layerIndex);



			//convertAS(dom2);

			var fileSave = fl.saveDocument(dom2, fileURL);
			fl.closeDocument(dom2, false);
			if (!fileSave) {
				//alert(nofilelocation_ERROR);
				return;
			}
			fl.openDocument(fileURL);
		}
		fl.trace(conversion_SUCCESS);
	} catch (err) {
		fl.trace("ERROR : " + err);
	}

}
