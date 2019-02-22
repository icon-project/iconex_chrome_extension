/* eslint-disable */

function scrollFx(){
	var _scrollT = $(window).scrollTop();
	if(_scrollT > 50){
		$(".header-wrap").addClass("on");
	} else {
		$(".header-wrap").removeClass("on");
	}
}

function setTimeoutFx(){
	$(".lock-wrap").remove();
}

function loginChkFx($isLogin){
	var _parent = $( ".lock-wrap" );
	if($isLogin){
		$("body").addClass("destroy");
		_parent.find(".logo").addClass("chk rotaion");
		setTimeout(setTimeoutFx, 350);
	} else {
		_parent.find("ul").addClass("zigzag");
		_parent.css("borderSpacing", 0);
		_parent.stop().animate({  borderSpacing: 1 }, {
			step: function(now,fx) {
				var int =  Math.round((1-now)*100/16);
				if(int){
					$(".pw-group ul li:nth-child("+int+")").addClass("on").siblings().removeClass();
				} else {
					$(".pw-group ul li:nth-child(1)").addClass("no").siblings().removeClass("on");
				}
			},duration:300,
			easing :'linear',
			complete: function(){
				_parent.find("ul").removeClass("zigzag");
			}
		});
	}
}

function coinLengthFx(){
	var _width = $(".content-wrap .wrap-holder .coin-holder .c div").width();
	var _scale = 500/(_width - $(".content-wrap .wrap-holder .coin-holder .c em").width() );
	_scale = Math.min(Math.max(_scale, 0.4), 1);
	$(".content-wrap .wrap-holder .coin-holder .c div").css({"font-size":_scale*46+"px", "display":"block"});
}

$(document).ready(function(){
	$(window).scroll(function(){
		scrollFx();
	});
	scrollFx();
	// loginChkFx();
});
