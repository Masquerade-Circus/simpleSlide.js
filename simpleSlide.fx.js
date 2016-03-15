!function($) {
	"use strict";
    $.fn.simpleSlide = function(options) {
		$(this).data('options', options);
		return this.each(function(){
			var to,
				i,
				fx,
				char,
				undefinedVal = []._,
				ths = $(this),
	            options = $.extend({
	                delay: ths.data('delay') || 8000,
	                nav: ths.data('nav') || undefinedVal,
	                thumbs: ths.data('thumbs') || false,
	                fx: ths.data('fx') || "fade",
	                easingIn: ths.data('easingIn') || "swing",
	                easingOut: ths.data('easingOut') || "swing",
	                durationIn: ths.data('durationIn') || 400,
	                durationOut: ths.data('durationOut') || 400,
					enter: undefinedVal,
	                complete: undefinedVal,
	                out: undefinedVal,
	                end: undefinedVal,
	                resize: ths.data('resize') || true,
	                next: ths.data('next') || undefinedVal,
	                prev: ths.data('prev') || undefinedVal
	            }, ths.data('options')),
	            children = ths.children(),
	            length = children.length - 1,
	            current = length,
	            next = 0,
	            classCurrent = "currentSlide",
	            nav = $(options.nav),
	            navItems = undefinedVal,
	            fxIn = "fadeIn",
	            fxOut = "fadeOut",
	            fxCharOne = options.fx.charAt(0);

	        function testCallback(callback, element, index) {
	            callback && callback.call && callback.call(element, index);
	        }

	        function reverse(number, reversed) {
	            return reversed = parseInt(number), reversed - 2 * reversed + "%";
	        }

	        function animate(index, duration, easing, top, left, fx, onStartAnimation, onEndAnimation, onCompleteInternalCallback) {
	            var element = children.eq(index);

				testCallback(onStartAnimation, element, index);

				"f" == fxCharOne || "h" == fxCharOne ?
					element.stop()[fx](duration, easing, function() {
		                testCallback(onEndAnimation, element, index);
						testCallback(onCompleteInternalCallback, element, index);
		            }) :
					element.stop().animate({
		                "margin-top": top,
		                "margin-left": left
		            }, duration, easing, function() {
		                testCallback(onEndAnimation, element, index);
						testCallback(onCompleteInternalCallback, element, index);
		            });

				return element;
	        }

	        function goTo(element) {
	            clearTimeout(to);
	            var isPrev = element.big && "p" == element,
	                top = isPrev ? options.t : reverse(options.t),
	                left = isPrev ? options.l : reverse(options.l);

	            animate(current, options.durationOut, options.easingOut, top, left, fxOut, options.out, options.end, function() {
	                $(this).css({
	                    "margin-top": options.t,
	                    "margin-left": options.l
	                });
	            }).removeClass(classCurrent);

				element.big ?
					"n" == element ?
						current == length ?
							next = 0 :
							next++ :
						0 == current ?
							next = length :
							next-- :
					next = element;
				isPrev && children.eq(next).css({
	                "margin-top": reverse(options.t),
	                "margin-left": reverse(options.l)
	            });

				animate(next, options.durationIn, options.easingIn, "0%", "0%", fxIn, options.enter, options.complete).addClass(classCurrent);

				undefinedVal != options.nav && navItems.removeClass(classCurrent).eq(next).addClass(classCurrent);
				current = next;
				options.resize && resize();
				to = timeout();
	        }

	        function timeout() {
	            return setTimeout(function() {
	                options.delay ? goTo("n") : undefinedVal
	            }, options.delay);
	        }

	        function resize(height) {
	            ths.stop().animate({
	                height: height || children.eq(current).height()
	            });
	        }

			"h" == fxCharOne && (fxIn = "show", fxOut = "hide");

	        if (/t|b|l|r/.test(fxCharOne))
	            for (i = 2; i--;){
					fx = options.fx.charAt(i);
					if (fx.length > 0){
						char = "t" == fx || "b" == fx ? "t" : "l";
						options[char] = "t" == fx || "l" == fx ? "-100%" : "100%";
					}
				}

	        if (undefinedVal != options.nav) {
	            for (i = 0; length >= i; i++) {
	                var link = $('<a href="#"/>');
	                options.thumbs ?
						link.append('<img src="' + children.eq(i).find("img").eq(0).attr("src") + '"/>') :
						link.html(i + 1);
					nav.append(link);
	            }
	            navItems = nav.find("a").on("click", function() {
					goTo($(this).index());
	                return false;
	            });
	        }

			"static" == ths.css("overflow", "hidden").css("position") && ths.css("position", "relative");
			children.css({
				position: "absolute",
				top: 0,
				left: 0,
				"margin-top": options.t,
				"margin-left": options.l
			});

			/h|f/.test(fxCharOne) && children[fxOut](0);

			options.resize && $(window).on("resize", function() {
	            resize();
	        });
			goTo(0);
			to = timeout();

			undefinedVal != options.prev && $(options.prev).on("click", function() {
				goTo("p");
	            return false;
	        });

			undefinedVal != options.next && $(options.next).on("click", function() {
				goTo("n");
	            return false;
	        });
		});
    }
}(jQuery);
