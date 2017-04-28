xjsfl.init(this);
clear();

for each (var item in $library.items)
{
	if (item.itemType == "sound")
	{
		trace(item.name + "-Done");
		item.compressionType = "MP3";
		item.useImportedMP3Quality = false;
		item.bitRate = "160 kbps";
		item.quality = "Medium";
		item.convertStereoToMono = true;
	}
}
trace("DONE, thx Troy")