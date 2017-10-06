$.fn.wubOSNavBar = function(items) {
	$(this).addClass('wubOSMenuNav');
	var span = $('<span></span>');
	$(this).append(span);
	var ulBase = $('<ul class="wubOSNav"></ul>');
	span.append(ulBase);
	
	function loadItems(parentEle ,it, isTop){
		for(var i = 0; i < it.length; i++)
		{
			var li = $('<li class="ui-button"><a>' + it[i].content + '</a></li>');
			if(isTop && it[i].items)
			{
				var fDiv = $('<div class="wubOSNavSubs"></div>');
				var sDiv = $('<div class="ui-button"></div>');
				fDiv.append(sDiv);
				var ul = $('<ul class="ui-button"></ul>');
				var l = $('<li class="ui-button"></li>');
				sDiv.append(ul);
				ul.append(l);
				li.append(fDiv);
			}
			if(!isTop && it[i].items)
			{
				li.find('a').append($('<span class="menuArrowW"><i class="fa fa-caret-right" aria-hidden="true"></i></span>'));
				li.addClass('liContainer');
			}
			parentEle.append(li);
			if(it[i].onclick)
			{
				li.find('a').click(it[i].onclick);
			}
			if(it[i].items)
			{
				var ulp = $('<ul class="ui-widget-header"></ul>');
				if(isTop)
				{
					l.append(ulp);
				}
				else
				{
					li.append(ulp);
				}
				loadItems(ulp, it[i].items,false);
			}
		}
	};
	
	loadItems(ulBase, items, true);
	
	$(this).find(".wubOSNav > li > a").click(function (e) { // binding onclick
		if ($(this).parent().hasClass('selectedWubOSNav')) {
			$(".wubOSNav .selectedWubOSNav div div").slideUp(100); // hiding popups
			$(".wubOSNav .selectedWubOSNav").removeClass("selectedWubOSNav");
		} else {
			$(".wubOSNav .selectedWubOSNav div div").slideUp(100); // hiding popups
			$(".wubOSNav .selectedWubOSNav").removeClass("selectedWubOSNav");
			if ($(this).next(".wubOSNavSubs").length) {
				$(this).parent().addClass("selectedWubOSNav"); // display popup
				$(this).next(".wubOSNavSubs").children().slideDown(200);
			}
		}
		e.stopPropagation();
	});
	$(this).find('.wubOSNav .wubOSNavSubs > div > ul > li > ul > li a').click(function(e){
		if($(this).siblings('ul').length > 0)
		{
			$(this).siblings('ul').toggle();
			e.stopPropagation();
		}
	});
	$("html").click(function () { // binding onclick to body
		$(".wubOSNav .selectedWubOSNav div div").slideUp(100); // hiding popups
		$(".wubOSNav .selectedWubOSNav").removeClass("selectedWubOSNav");
		$('.wubOSMenuNav .wubOSNav .wubOSNavSubs > div > ul > li > ul > li ul').hide();
	}); 
};