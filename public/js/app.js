var App = function(n, ic, dn, jsr, cssr, pExt, sExt, isExec, beforeIntaled)
{
	var self = this;
	this.ejecutable = (isExec == true);
	this.icon = ic;
	this.name = n;
	this.primaryExt = pExt;
	this.secundaryExt = sExt;
	this.displayName = dn;
	var jsReferences = jsr;
	var cssReferences = cssr;
	//var baseDir;
	var resouceLoader = new loader2();
	this.loadResources = function(){
		resouceLoader.scripts = jsReferences;
		resouceLoader.onScriptsLoad = function(){
			OS.onAppInstaled(self);
		};
		resouceLoader.cargarScripts();
		for(var i = 0; i < cssReferences.length; i++)
			resouceLoader.cargarCssFile(cssReferences[i]);
	};
	var appIcons = [];
	this.getModifyIcon =  function(){
		var ico = $('<div class="icon"></div>');
		ico.css({backgroundImage: 'url('+this.icon+')', backgroundSize: '100% 100%'});
		appIcons.push(ico[0]);
		return ico[0];
	};
	var textIcon = null;
	this.modifyIcon = function(t, c){
		textIcon = t;
		$(appIcons).iosbadge({
			theme: 'ios',
			size: 24,
			content: t,
			theme: c,
			position: 'top-right'
		});
	};
	this.getModificationIconText = function(){
		return textIcon;
	};
	this.run = function(){ };
	if(isFunction(beforeIntaled))
		beforeIntaled.call(self);
	this.loadResources();
};
var Program = function(app ,mainFuc, mainP)
{
	var self = this;
	/*var lineal = true;
	this.waitFor = function(process){
		if(process instanceof proceso)
		{
			lineal = false;
			proceso.onClose = function(){
				self.proceso.close();
			};
		}
	};*/
	this.aplication = app;
	this.proceso = (mainP)?new proceso(false, this.aplication, mainP):new proceso(true, this.aplication);
	this.main = mainFuc || function(){};
	this.main();
}