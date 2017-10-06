(function(){ 
	var pruebaapp = new App('pruebaapp', 'apps/pruebaapp/img/favicon.png', 'pruebaapp',
					['apps/pruebaapp/pixlr.js'], [], 
					/((.+\.bmp)|(.+\.jpg)|(.+\.png)|(.+\.jpeg)|(.+\.ico))(\?.+|:\#.+)?$/i, null, true);
	pruebaapp.run = function(fileParam){
		var self = this;
		var prog = new Program(self, function(){
			var selfProg = this;
			var v = new ventana(selfProg.proceso,{
				sizeX: 720,
				sizeY: 520,
				minSizeX: 200,
				minSizeY: 200
			});
			v.getDivContenido().className += " pruebaapp";
			v.getDivContenido().style.overflow = "hidden";
			v.getDivContenido().style.backgroundColor = "black";
			v.setIcono('apps/pruebaapp/img/favicon.png');
			v.setTitulo('pruebaapp');
			v.onClose = function(){
				$(v.getDivContenido()).empty();
				selfProg.proceso.close();
			};
			pixlr.settings.target = 'http://demo.smarttutorials.net/pixlr-editor/save.php';
			pixlr.settings.exit = 'http://demo.smarttutorials.net/pixlr-editor/';
			pixlr.settings.method = 'GET';
			pixlr.settings.redirect = false;
			pixlr.overlay.show({
				//image: 'http://4.bp.blogspot.com/-oJ98Ta02qro/VJWBER3fI9I/AAAAAAAADxo/YDOtgBvAn8s/s1600/jQuery-Autocomplete-Mutiple-Fields-Using-jQuery-Ajax-PHP-and-MySQL.png',
				//title: 'Roof Crafters',
				paretElement: v.getDivContenido()
			});
			if(fileParam)
			{
				if(fileParam.startsWith("/files/"))
					fileParam = window.location.origin + fileParam;
				pixlr.overlay.show({
					image: fileParam,
					title: "prueba",
					paretElement: v.getDivContenido()
				});
			}
			else
				pixlr.overlay.show({
					paretElement: v.getDivContenido()
				});
			v.mostrar();
			/*v.cargarContenidoArchivo('apps/pruebaapp/index.xml', function(){
				v.mostrar();
				if(fileParam)
				{
					//v.controles.frmGoogleDocs.src = "http://docs.google.com/gview?url=http://" + document.location.host + encodeURI(fileParam) + "&embedded=true";
				}
			});*/
		});
	};
})();