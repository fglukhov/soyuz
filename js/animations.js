if ($("#mobile-indicator").css("display") == "none") {

	var is_mobile = false;

} else {

	var is_mobile = true;

}

var animMultiplier = 0.75;

function animateAll() {

	// $(".section-header h2, .section-header .h2, h1, .h1, .section-top-text").each(function (index, element) {
	//
	// 	$(this).splitLines();
	//
	// });

	var controller2 = new ScrollMagic.Controller();

	// Growing numbers

	// $(".fact-tmb-num .num").each(function (index, element) {
	//
	// 	var counter = { var: 0 };
	//
	// 	var numTween = TweenMax.to(counter, $(element).data("time"), {
	// 		var: $(element).data("num"),
	// 		onUpdate: function () {
	// 			$(element).html(Math.ceil(counter.var));
	// 		},
	// 		ease: Linear.easeNone
	// 	});
	//
	// 	var numScene = new ScrollMagic.Scene({
	// 		triggerElement: element.closest(".section"),
	// 		offset: 0,
	// 		reverse:false
	// 	})
	// 		.setTween(numTween)
	// 		.addTo(controller2);
	//
	// });

	// Growing numbers END

	if ($("#mobile-indicator").css("display") == "none" && !$("body").hasClass("animated")) {

		$("body").addClass("animated");

		var controller = new ScrollMagic.Controller();

		$(".section-top .anim").each(function (index, element) {

			let elTween = TweenMax.to($(element), .7 * animMultiplier, {
				y: 0,
				x: 0,
				scale: 1,
				opacity: 1,
				ease: Sine.easeOut,
				// overwrite: "none",
				delay: $(element).data("anim-index") * .7 * animMultiplier + .5 * animMultiplier
			});

			let elScene = new ScrollMagic.Scene({
				triggerElement: $("main"),
				offset: 0,
				reverse: false
			})
				.setTween(elTween)
				.addTo(controller);

		});

		$(".serv-tmb").each(function (index, element) {

			let elTween = TweenMax.to($(element), 1 * animMultiplier, {
				y: 0,
				x: 0,
				scale: 1,
				opacity: 1,
				ease: Sine.easeOut,
				// overwrite: "none",
				delay: $(element).prevAll().length * .5 * animMultiplier + .5 * animMultiplier
			});

			let elScene = new ScrollMagic.Scene({
				triggerElement: element.closest(".section"),
				offset: -200,
				reverse: false
			})
				.setTween(elTween)
				.addTo(controller);

		});

		$(".section-header h2, .section-header .h2").each(function (index, element) {

			let elTween = TweenMax.to($(element), 1 * animMultiplier, {
				y: 0,
				x: 0,
				scale: 1,
				opacity: 1,
				ease: Sine.easeOut,
				// overwrite: "none",
				delay: $(element).prevAll().length * .7 * animMultiplier
			});

			let elScene = new ScrollMagic.Scene({
				triggerElement: element.closest(".section"),
				offset: -200,
				reverse: false
			})
				.setTween(elTween)
				.addTo(controller);

		});

		$(".pros-tmb").each(function (index, element) {

			let elTween = TweenMax.to($(element), .7 * animMultiplier, {
				y: 0,
				x: 0,
				scale: 1,
				opacity: 1,
				ease: Sine.easeOut,
				// overwrite: "none",
				delay: $(element).prevAll().length * .5 * animMultiplier
			});

			let elScene = new ScrollMagic.Scene({
				triggerElement: element.closest(".section"),
				offset: -200,
				reverse: false
			})
				.setTween(elTween)
				.addTo(controller);

		});

		$(".fact-tmb").each(function (index, element) {

			let elTween = TweenMax.to($(element), .7 * animMultiplier, {
				y: 0,
				x: 0,
				scale: 1,
				opacity: 1,
				ease: Sine.easeOut,
				// overwrite: "none",
				delay: $(element).closest(".col").prevAll().length * .5 * animMultiplier
			});

			let elScene = new ScrollMagic.Scene({
				triggerElement: element.closest(".section"),
				offset: -200,
				reverse: false
			})
				.setTween(elTween)
				.addTo(controller);

		});

		$(".work-video-caption .anim").each(function (index, element) {

			let elTween = TweenMax.to($(element), .7 * animMultiplier, {
				y: 0,
				x: 0,
				scale: 1,
				opacity: 1,
				ease: Sine.easeOut,
				// overwrite: "none",
				delay: $(element).data("anim-index") * .7 * animMultiplier + .5 * animMultiplier
			});

			let elScene = new ScrollMagic.Scene({
				triggerElement: element.closest(".section"),
				offset: 0,
				reverse: false
			})
				.setTween(elTween)
				.addTo(controller);

		});



	} else if ($("#mobile-indicator").css("display") == "block") {

		$("body").removeClass("animated");

		//controller = controller.enabled(false);
		//controller = controller.destroy(true);

	}

}

$(window).on("resize", function () {

	animateAll();

});

$(document).ready(function () {

	animateAll();

});


$(window).on("resize scroll load", function () {

	$(".section-video-bg-2-inner").prlx($(".section-video-bg"), -100, 0, false)


});

(function( $ ) {
	$.fn.prlx = function(pTrigger, yStart, yFinish, fromTop) {

		if (!is_mobile && $(this).length) {

			var obj = $(this);

			var yPos;

			if (fromTop == false && $(window).scrollTop() < pTrigger.offset().top - $(window).height()) {

				yPos = yStart;

			} else if (fromTop == false && $(window).scrollTop() > pTrigger.offset().top + $(window).height()) {

				yPos = yFinish;

			} else {

				if (fromTop) {

					if (pTrigger.offset().top <= $(window).scrollTop()) {

						var percentOffset = (pTrigger.offset().top - $(window).scrollTop()) / ($(window).height() * 2);

					} else {

						percentOffset = 0;

					}

				} else {

					var percentOffset = (pTrigger.offset().top + $(window).height() - $(window).scrollTop()) / ($(window).height() * 2);

				}


				
				var yRange = yStart - yFinish,
					posInRange = yRange * percentOffset,
					yPos = posInRange + yFinish;

				obj.attr("percentOffset", percentOffset);


				// if (yStart < yFinish) {
				//
				// 	if (yPos < yStart) {
				//
				// 		yPos = yStart;
				//
				// 	}
				//
				// 	if (yPos > yFinish) {
				//
				// 		yPos = yFinish;
				//
				// 	}
				//
				// } else {
				//
				// 	if (yPos > yStart) {
				//
				// 		yPos = yStart;
				//
				// 	}
				//
				// 	if (yPos < yFinish) {
				//
				// 		yPos = yFinish;
				//
				// 	}
				//
				// }

			}

			TweenMax.to(obj, .5, {y: yPos, ease:Linear.ease});

		}

	};
})( jQuery );

(function ($) {
	"use strict";

	// Written for: http://stackoverflow.com/questions/4671713/#7431801
	// by Nathan MacInnes, nathan@macinn.es

	// use square bracket notation for Closure Compiler
	$.fn['breakLines'] = function (options) {
		var defaults = {
			// HTML to insert before each new line
			'lineBreakHtml' : '<br />',
			// Set this to true to have the HTML inserted at the start of a
			// <p> or other block tag
			'atStartOfBlocks' : false,
			// false: <LINEBREAK><span>text</span>;
			// true: <span><LINEBREAK>text</span>
			'insideStartOfTags' : false,
			// If set, the element's size will be set to this before being
			// wrapped, then reset to its original value aftwerwards
			'widthToWrapTo' : false
		};
		options = $.extend(defaults, options);
		return this.each(function () {
			var textNodes, // all textNodes (as opposed to elements)
				copy, // jQuery object for copy of the current element
				el = $(this), // just so we know what we're working with
				recurseThroughNodes, // function to do the spitting/moving
				insertedBreaks, // jQuery collection of inserted line breaks
				styleAttr; // Backup of the element's style attribute

			// Backup the style attribute because we'll be changing it
			styleAttr = $(this).attr('style');

			// Make sure the height will actually change as content goes in
			el.css('height', 'auto');

			// If the user wants to wrap to a different width than the one
			// set by CSS
			if (options.widthToWrapTo !== false) {
				el.css('width', options.widthToWrapTo);
			}

			/*
					This function goes through each node in the copy and splits
					it up into words, then moves the words one-by-one to the
					element. If the node it encounters isn't a text node, it
					copies it to the element, then the function runs itself again,
					using the copy as the currentNode and the equivilent in the
					copy as the copyNode.
			*/
			recurseThroughNodes = function (currentNode, copyNode) {
				$(copyNode).contents().each(function () {
					var nextCopy,
						currentHeight;

					// update the height
					currentHeight = el.height();

					// If this is a text node
					if (this.nodeType === 3) {
						// move it to the original element
						$(this).appendTo(currentNode);
					} else {
						// Make an empty copy and put it in the original,
						// so we can copy text into it
						nextCopy = $(this).clone().empty()
							.appendTo(currentNode);
						recurseThroughNodes(nextCopy, this);
					}

					// If the height has changed
					if (el.height() !== currentHeight) {
						// insert a line break and add to the list of
						// line breaks
						insertedBreaks = $(options.lineBreakHtml)
							.insertBefore(this)
							.add(insertedBreaks);
					}
				});
			};

			// Clone the element and empty the original
			copy = el.clone().insertAfter(el);
			el.empty();

			// Get text nodes: .find gets all non-textNode elements, contents
			// gets all child nodes (inc textNodes) and the not() part removes
			// all non-textNodes.
			textNodes = copy.find('*').add(copy).contents()
				.not(copy.find('*'));

			// Split each textNode into individual textNodes, one for each
			// word
			textNodes.each(function (index, lastNode) {
				var startOfWord = /\W\b/,
					result;
				while (startOfWord.exec(lastNode.nodeValue) !== null) {
					result = startOfWord.exec(lastNode.nodeValue);
					// startOfWord matches the character before the start of a
					// word, so need to add 1.
					lastNode = lastNode.splitText(result.index + 1);
				}
			});

			// Go through all the nodes, going recursively deeper, until we've
			// inserted line breaks in all the text nodes
			recurseThroughNodes(this, copy);

			// We don't need the copy anymore
			copy.remove();

			// Clean up breaks at start of tags as per options
			insertedBreaks.filter(':first-child').each(function () {
				if (!options.atStartOfBlocks &&
					$(this).parent().css('display') === "block") {
					$(this).remove();
				}
				if (!options.insideStartOfTags) {
					$(this).insertBefore($(this).parent());
				}
			});
			// Restore backed-up style attribute
			$(this).attr('style', styleAttr);
		});
	};
}(jQuery));

(function( $ ) {
	$.fn.splitLines = function() {

		var element = $(this);

		element.breakLines({
			lineBreakHtml : '<br/>'
		});

		if (element.find("br").length) {

			var arr = element.html().split('<br>');

		} else {

			var arr = element.get(0).innerHTML.split(/\r\n|\r|\n/)

			console.log(arr)

		}

		element.empty();

		$.each(arr, function( index, value ) {
			element.append("<div class='revealing'><span class='revealing-content-wrapper'><span class='revealing-content'>"+arr[index]+"</span><span class='revealing-mask'></span></span></div>");
		});

	};
})( jQuery );
