/* eslint-disable */

function loginChkFx($isLogin){
	var _parent = $( ".lock-wrap" );
	if ($isLogin) {
		$("body").addClass("destroy");
		_parent.find("ul").addClass("disabled");
		_parent.find(".logo").addClass("chk rotaion");
	} else {
		_parent.find(".logo").addClass("zigzag");
		_parent.find("ul").addClass("zigzag");
		_parent.find(".gray").removeClass();
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
				_parent.find(".logo").removeClass("zigzag");
				_parent.find("ul").removeClass("zigzag");
			}
		});
	}
}

$(document).ready(function(){

});
