var comment = prompt("Enter a comment for the SVN commit", "test update");
if (comment){
    var path = fl.getDocumentDOM().path;
    pathSplit = path.split("\\");
    dir = path.replace("\\"+fl.getDocumentDOM().name, "").replace(pathSplit[0]+"\\", "");
    cmd = pathSplit[0]+" & cd \""+dir+"\"";
    
    fl.getDocumentDOM().save();
    FLfile.runCommandLine(cmd + " & svn add \""+fl.getDocumentDOM().path+"\"");
    FLfile.runCommandLine(cmd + " & svn commit \""+fl.getDocumentDOM().path+"\" -m \""+comment+"\" & timeout /t 3");
    fl.outputPanel.trace("***********************\n"+fl.getDocumentDOM().name+" saved and committed to the SVN.\nComment: "+comment+"\n***********************");
}
else{
    fl.outputPanel.trace("Cancelled");
}