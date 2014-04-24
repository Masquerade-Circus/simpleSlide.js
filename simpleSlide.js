(function ($) {
	"use strict";
	$.fn.simpleSlide = function( time ) {
			var 	a = time || 5000,
					t = this,
					e = t.children(), 
					l = e.length - 1, 
					c = 0, 
					n = 0;
					
			t.css('position') == 'static' ? t.css('position','relative') : null;
			e.css('position', 'absolute').not(':eq(0)').fadeOut(0);
					
			setInterval(function(){
					e.eq(c).fadeOut();
					c == l ? n = 0 : n++;
					e.eq(n).fadeIn();
					c = n;
			}, a);
			
		};
})(jQuery);