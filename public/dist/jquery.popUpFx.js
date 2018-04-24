/* eslint-disable */
(function($){
	var defaults = {
		author : "kissyweb@gmail.com, couldseeme@nomadconnection.com"
	};

	$.fn.popUpFx = function(options){
		var I_F 			= {};
		var _id 			= this.attr("id");
		var _class 			= this.attr("class");

		var init = function(){
			I_F.set = $.extend({}, defaults, options);
			loadedFx();
		};

		var loadedFx = function(){
			if( $("div").hasClass(_class) && $("div").is(`[id='${_id}']`)){
				var _objH = parseInt($(`#${_id} > div > .popup`).css("height"));
				var _winH = $(window).height();
				var _top = $(document).scrollTop();
				if(_objH+20 > _winH){
					var _add = (_objH - _winH);
					if (_id.includes('popup')) {
						$(`#${_id}`).css({"position":"absolute"});
						$(`#${_id} > div > .popup`).css({"top":(_top + 10)+"px", "bottom":"auto"});
					} else {
						$(`#${_id}`).css({"position":"fixed"});
						$(`#${_id} > div > .popup`).css({"top":"0", "bottom":"0"});
					}

				} else {
					$(`#${_id}`).css("position", "fixed");
					$(`#${_id} > div > .popup`).css({"top":"0", "bottom":"0"});
				}
			}
		};

		$(window).resize(function() {
			loadedFx();
		});

		init();
		return this;
	};
})(jQuery);
