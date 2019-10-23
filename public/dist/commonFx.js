/* eslint-disable */

function scrollFx(){
	var _scrollT = $(window).scrollTop();
	if(_scrollT > 50){
		$(".header-wrap").addClass("on");
	} else {
		$(".header-wrap").removeClass("on");
	}
	// if( $("div").hasClass("vote")){
	// 	console.log($("body, html").height(), $("body, html").scrollTop(), $(".myvote.choice").offset().top, $(".myvote.choice").height() )
	// 	if( $(".myvote.choice").offset().top+$(".myvote.choice").height() - $("body, html").height() > $("body, html").scrollTop() -78 ){
	// 		$(".vote").addClass("fixed");
	// 	} else {
	// 		$(".vote").removeClass("fixed");
	// 	}
	// }
}

function setTimeoutFx(){
	$(".lock-wrap").remove();
}

function loginChkFx($isLogin){
	var _parent = $( ".lock-wrap" );
	if ($isLogin) {
		$("body").addClass("destroy");
		_parent.find("ul").addClass("disabled");
		_parent.find(".logo").addClass("chk rotaion");
		//setTimeout(setTimeoutFx, 1500);
	} else {
		_parent.find(".logo").addClass("zigzag");
		_parent.find("ul").addClass("zigzag");
		_parent.css("borderSpacing", 0);
		_parent.stop().animate({ borderSpacing: 1 }, {
			step: function(now,fx) {
				var int = Math.round((1-now)*100/16);
				if (int) {
					$(".pw-group ul li:nth-child("+int+")").addClass("on").siblings().removeClass();
				} else {
					$(".pw-group ul li:nth-child(1)").addClass("no").siblings().removeClass("on");
				}
			},
			duration:300,
			easing :'linear',
			complete: function(){
				_parent.find(".logo").removeClass("zigzag");
				_parent.find("ul").removeClass("zigzag");
			}
		});
	}
}

$(document).ready(function(){
	$(window).scroll(function(){
		scrollFx();
	});
	scrollFx();
	// loginChkFx();
});
