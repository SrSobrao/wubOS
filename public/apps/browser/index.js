(function(){ 
	var browser = new App('browser', 'apps/browser/img/favicon.png', 'Browser',
					['apps/browser/chrome-tabs.js'],
					['apps/browser/index.css'],
					/^https?:\/\/.+/i, /((.+\.html)|(.+\.txt)|(.+\.xhtml)|(.+\.php)|(.+\.css))$/i, true);
	browser.instance = null;
	
	browser.run = function(fileParam){
		var self = this;
		if(self.instance)
		{
			if(!self.instance.v.getVisible())
				self.instance.v.mostrar();
			if(self.instance.v.getEstado() == 'minimizado')
				self.instance.v.restaurar();
			OS.ventanaAlTop(self.instance.v);
			if(OS.obtenerEscritorioVentana(self.instance.v) != OS.getTopDesktop())
				OS.desktopToTop(OS.obtenerEscritorioVentana(self.instance.v).pos);
			
			if(fileParam)
			{ }
		}
		else
		{
			var prog = new Program(self, function(){
				var selfProg = this;
				selfProg.v = new ventana(selfProg.proceso,{
					sizeX: 900,
					sizeY: 700,
				});
				self.instance = selfProg;
				selfProg.v.getDivContenido().className += " browserApp";
				selfProg.v.setIcono('apps/browser/img/favicon.png');
				selfProg.v.setTitulo('Browser');
				selfProg.v.onClose = function(){
					selfProg.proceso.close();
					self.instance = null;
				};
				var tabCounter = 1;
				
				
				selfProg.v.cargarContenidoArchivo('apps/browser/index.xml', function(){
					
					selfProg.v.mostrar();
					
					
					
					if(fileParam)
					{
						
					}
					
				});
			});
		}
	};
})();