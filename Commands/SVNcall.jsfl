var comment = prompt("Enter a comment for the SVN commit", "test update");
if (comment){
    var path = fl.getDocumentDOM().path;
    var pathSplit = path.split("\\");
    var dir = path.replace("\\"+fl.getDocumentDOM().name, "").replace(pathSplit[0]+"\\", "");
    var cmd = pathSplit[0]+" & cd \""+dir+"\"";
    
    var path_to_bat_file = FLfile.platformPathToURI(fl.configDirectory).concat("PanelName_commit.bat");
    
    fl.getDocumentDOM().save();
    FLfile.runCommandLine(cmd + " & svn add \""+fl.getDocumentDOM().path+"\"");
    FLfile.write (path_to_bat_file, cmd + " & svn commit \""+fl.getDocumentDOM().path+"\" -m \""+comment+"\" & pause");
    FLfile.runCommandLine("start \""+path_to_bat_file+"\" \""+path_to_bat_file+"\"");
}



