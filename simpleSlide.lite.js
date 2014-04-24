(function ($) {
	"use strict";
	$.fn.simpleSlide = function( time ) {
			var 	a = time || 5000,
					t = this, 
					e = t.children(), 
					l = e.length - 1, 
					c = 0, 
					n = 0, 
					s;
					
			t.css('position') == 'static' ? t.css('position','relative') : null;
			e.css('position', 'absolute').fadeOut(0);
			
			function g(a){
				clearTimeout(s); 
				e.eq(c).fadeOut();
				a.big ? a == 'n' ? c == l ? n = 0 : n++ : c == 0 ? n = l : n-- :  n = a;
				e.eq(n).fadeIn();
				c = n;
				s = p();
			}
			
			function p() {
				return setTimeout(function(){
					g('n');
				}, a);
			}
			
			g(0);
			s = p();
			
			return {
				go: function(a) {g(a);}
			};
	};
	
})(jQuery);