/**
 * Assign tints to selected objects
 * @icon {iconsURI}design/color/color_wheel.png
 */
fl.outputPanel.clear();
xjsfl.init(this);
//var xul = new XUL('Adding color');
var t = fl.getDocumentDOM().getTimeline();
var s1 = 0;
var s2 = 0;
var s3 = 0;
var a = 100;
var a1 = 0;
var c1 = "000000";
var useAlpha = true;
var xul = new XUL
	.factory()
	.setTitle('Adding color')
	.addColorchip('Color', 'Color', {value:'0xFF0000'})
	.addSlider('Alpha', 'alpha', [100, 0, 100])
	.addCheckbox('Use 100% alpha', 'useAlpha', {checked:true})
	.addButton('Advanced', 'button1', {width:200}, {click:onClick})
	.addButton('Property', 'button2', {width:200}, {click:onClick1})
run(c1);	

function onClick()
	{	
		if (this.controls.Color.value != null)
			c1 = this.controls.Color.rawValue;
		c1 = c1.replace("#",'');
		s1 = c1.substr(0,2);
		s2 = c1.substr(2,2);
		s3 = c1.substr(4,2);
		a = this.controls.alpha.value;
		s1 = parseInt(s1, 16);
		s2 = parseInt(s2, 16);
		s3 = parseInt(s3, 16);
		//inspect(this.controls);
		useAlpha = this.controls.useAlpha.value;
		if (useAlpha)
		{
			a = 100;
		}
		else
		{
			a = this.controls.alpha.value;
		}
		s1 = s1/255*100;
		s2 = s2/255*100;
		s3 = s3/255*100;
		window.s1 = s1;
		window.s2 = s2;
		window.s3 = s3;
		trace(a);
		fl.getDocumentDOM().setInstanceAlpha(a);
		fl.getDocumentDOM().setElementProperty('colorMode', 'advanced');
		fl.getDocumentDOM().setElementProperty('colorRedPercent', s1);
		fl.getDocumentDOM().setElementProperty('colorGreenPercent', s2);
		fl.getDocumentDOM().setElementProperty('colorBluePercent', s3);
		
		xul.close();
		
	}

function onClick1()
	{	
		if (this.controls.Color.value != null)
			c1 = this.controls.Color.rawValue;
		c1 = c1.replace("#",'');
		s1 = c1.substr(0,2);
		s2 = c1.substr(2,2);
		s3 = c1.substr(4,2);
		a = this.controls.alpha.value;
		s1 = parseInt(s1, 16);
		s2 = parseInt(s2, 16);
		s3 = parseInt(s3, 16);
		useAlpha = this.controls.useAlpha.value;
		if (useAlpha)
		{
			a = 100;
		}
		else
		{
			a = this.controls.alpha.value;
		}
		a1 = Math.round(a * 2.55);
		window.s1 = s1;
		window.s2 = s2;
		window.s3 = s3;
		fl.getDocumentDOM().getTimeline().layers[t.currentLayer].frames[t.currentFrame].actionScript = '/*\nproperty:Color,' + s1 + ',' + s2 + ',' + s3 + ',' + a1 + '\n*/';
		xul.close();
		
	}
function run(c1)
{
	xul.show();
}
