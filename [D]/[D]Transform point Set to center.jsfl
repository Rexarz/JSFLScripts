// Transform point Set to center

fl.outputPanel.clear();


for ( var i=0; i < fl.getDocumentDOM().selection.length; i++)
{
	//fl.getDocumentDOM().selection[i].setTransformationPoint({x:0, y:0});
	sel = fl.getDocumentDOM().selection[i] 
	w=sel.width;
	h=sel.height;
	xs=Math.floor(sel.scaleX*10000)/10000;
	ys=Math.floor(sel.scaleY*10000)/10000;
	wc=w/2;
	hc=h/2;
	ncx=Math.floor(wc);//*xs
	ncy=Math.floor(hc);//*ys
	fl.getDocumentDOM().selection[i].setTransformationPoint({x:ncx/xs, y:ncy/ys});
}
