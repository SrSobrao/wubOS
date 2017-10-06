(function(){ 
	var fileviwer = new App('fileviwer', 'apps/fileviwer/img/favicon.png', 'FileViWer',
					[], ['apps/fileviwer/index.css'], 
					new RegExp("^((\/files\/(" + OS.user.folders.join('|') + ")\/?.*)|(https?:\/\/.*))"), null);
	fileviwer.run = function(fileParam){
		var self = this;
		var prog = new Program(self, function(){
			var selfProg = this;
			var v = new ventana(selfProg.proceso,{
				sizeX: 720,
				sizeY: 520,
				minSizeX: 720,
				minSizeY: 520
			});
			v.getDivContenido().className += " fileviwer";
			v.setIcono('apps/fileviwer/img/favicon.png');
			v.setTitulo('FileViwer');
			v.onClose = function(){
				v.controles.iframeUI.src = "";
				selfProg.proceso.close();
			};
			v.cargarContenidoArchivo('apps/fileviwer/index.xml', function(){
				v.mostrar();
				v.getDivContenido().style.overflow = 'hidden';
				v.controles.iframeUI.style.border = 'none';
				v.controles.iframeUI.style.height = '100%';
				v.controles.iframeUI.style.width = '100%';
				v.controles.iframeUI.onload = function(){
					if(v.controles.iframeUI.contentWindow.document)
					{
						/*var favicon = undefined;
						var nodeList = v.controles.iframeUI.contentWindow.document.getElementsByTagName("link");
						for (var i = 0; i < nodeList.length; i++)
						{
							if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon"))
							{
								favicon = nodeList[i].getAttribute("href");
							}
						}
						v.setIcono(favicon);*/
						if(v.controles.iframeUI.contentWindow.document.title != '')
							v.setTitulo(v.controles.iframeUI.contentWindow.document.title + ' - FileViwer');
					}
				};
				if(fileParam)
				{
					v.setTitulo(fileParam.replace(/^\/files/, '').replace(/\?authToken=.+$/, '') + ' - FileViwer');
					v.controles.iframeUI.src = fileParam;
				}
				$(v.controles.iframeUI).iframeTracker({
					blurCallback: function(){
						//$(v.getDivBase()).trigger('mousedown');
						v.getDivBase().dispatchEvent(new Event('mousedown'));
					}
				});
			});
		});
	};
})();