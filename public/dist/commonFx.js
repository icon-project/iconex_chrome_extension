/* eslint-disable */
function scrollFx(){
	var _scrollT = $(window).scrollTop();
	if(_scrollT > 50){
		$(".header-wrap").addClass("on");
	} else {
		$(".header-wrap").removeClass("on");
	}
}

$(document).ready(function(){
	var _timer;
	var _frame = 0;
	_timer = setInterval( function(){updateCounter()}, 40);
	var updateCounter = function() {
		$(".main .loading").css("background-position-x",-(_frame*60)+"px")
		_frame++;
		if(_frame > 67){
			_frame = 55;
		}
	}

	$(window).scroll(function(){
		scrollFx();
	});
	scrollFx();
});
