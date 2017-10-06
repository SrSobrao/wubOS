var accesos = 0;
var accesoDirecto = function(icono, texto, path, targetEsc, posX, posY){
	var selfAd = this;
	this.target = path;
	this.div = uiFramework.createNodeElement('div',{
		id: 'accesoDirecto' + accesos,
		innerHTML: '<span>' + texto + '</span>',
		className: "accesoDirecto",
		exePath: path,
		ondblclick: function(){
			if(isFunction(this.exePath))
				this.exePath();
			else
				OS.ejecutar(this.exePath);
		}
	},{
		top: posY + "px",
		left: posX + "px",
		backgroundImage: 'url('+icono+')',
	});
	accesos++;
	targetEsc.appendChild(this.div);
	$(this.div).draggable({
		opacity: 0.8,
		iframeFix: true,
		grid: [ 110, 80 ],
		containment: "parent"
	});
	this.eliminar = function(){
		$.contextMenu( 'destroy', '#' + this.div.id );
		this.div.remove();
	};
	this.actualizarCM = function(){
		$.contextMenu( 'destroy', '#' + this.div.id );
		createCM.call(this);
	};
	var createCM = function(){
		var itemsCM ={
			"name": "Abrir con:", 
			"items": {}
		};
		itemsCM.items['yesno'] = {
			name: "Ejecutar con permisos", 
			type: 'checkbox', 
			selected: false
		};
		itemsCM.items['sep1'] = "---------";
		for(var k = 0; k < OS.apps.length; k++)
		{
			if(OS.apps[k].primaryExt && OS.apps[k].primaryExt.test(path))
			{
				itemsCM.items[OS.apps[k].name] = {
					name: OS.apps[k].displayName,
					icon: OS.apps[k].name,
					callback: function(key, options){
						OS.getAppByName(key).run(selfAd.target);
					}
				};
			}
		}
		$.contextMenu({
			selector: '#' + selfAd.div.id, 
			callback: function(key, options) {
				if(key == "Eliminar")
				{
					selfAd.eliminar();
				}
			},
			items: {
				itemsCM,
				"sep1": "---------",
				"Eliminar": {name: "Eliminar", icon:"fa-trash"}
			},
			zIndex: 1000//997
		});
	};
	createCM.call(this);
}