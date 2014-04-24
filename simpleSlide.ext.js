(function ($) {
	"use strict";
	$.fn.simpleSlide = function( o ) {
			var 	o = $.extend({
						time: 400,
						delay: 5000,
						nav: null,
						thumbs: false
					}, o),
					t = this, 
					e = t.children(), 
					l = e.length - 1, 
					c = 0, 
					n = 0, 
					s, 
					v = 'currentSlide',
					nv = $(o.nav), 
					na, 
					i;
					
			for (i = 0; i <= l; i++){
				var a = $('<a href="#"/>');
				o.thumbs ? a.append('<img src="'+e.eq(i).find('img').eq(0).attr('src')+'"/>') : a.html(i+1);
				nv.append(a);
			}
			na = nv.find('a').on('click', function(){
				g($(this).index()); 
				return false;
			});
					
			t.css('position') == 'static' ? t.css('position','relative') : null;
			e.css('position', 'absolute').fadeOut(0);
			
			function g(a){
				clearTimeout(s); 
				e.eq(c).fadeOut(o.time).removeClass(v);
				a.big ? a == 'n' ? c == l ? n = 0 : n++ : c == 0 ? n = l : n-- :  n = a;
				e.eq(n).fadeIn(o.time).addClass(v);
				na.removeClass(v).eq(n).addClass(v);
				c = n;
				s = p();
			}
			
			function p() {
				return setTimeout(function(){
					o.delay ? g('n') : null;
				}, o.delay);
			}
			
			g(0);
			s = p();
			
			return {
				go: function(a) {g(a);}
			};
	};
	
})(jQuery);