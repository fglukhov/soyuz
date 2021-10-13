var numFormat = wNumb({
	thousand: ' '
});

$("#servModal").on("scroll touchmove",  function() {

	$(".photo-slider").each(function () {

		photoSlider($(this));

	});

	fixedPopupMenu();



});


$(window).on("scroll touchmove", function() {

	fixedHeader();


	var scrollPos = $(window).scrollTop();

	$("a[name]").each(function() {
		if (scrollPos >= $(this).offset().top - 170) {
			$(".navbar-nav a").removeClass("active");
			$(".navbar-nav a[href='#" + $(this).attr("name") + "']").addClass("active");
		}
	});

	// if (scrollPos > 300) {
	// 	$(".up-link").fadeIn(150);
	// } else {
	// 	$(".up-link").fadeOut(150);
	// }

});
$(window).resize(function() {

	fixedHeader();

	$(".slick-slider").slick("setPosition");

});
$(window).on("load", function() {
	//makeUp();
});
var baseUrl = "";

$(document).ready(function() {

	// Mobile filter

	$("body").on("click", ".filter-trigger", function () {

		$(".filter").fadeIn(150).addClass("open");

		$("body").addClass("modal-open");

	});

	$("body").on("click", ".filter-close, .filter-apply", function () {

		$(".filter").fadeOut(150).removeClass("open");

		$("body").removeClass("modal-open");

	});

	// Mobile filter END

	// Contacts map

	ymaps.ready(function () {

		var myMap = new ymaps.Map('footerMap', {
				center: [56.893741, 53.238628],
				zoom: 16,
				controls: []
			}, {}),

			myPlacemark1 = new ymaps.Placemark([56.893741, 53.238628], {
				hintContent: '',
				balloonContent: ''
			}, {
				// Опции.
				// Необходимо указать данный тип макета.
				iconLayout: 'default#image',
				// Своё изображение иконки метки.
				iconImageHref: 'images/map-pin.svg',
				// Размеры метки.
				iconImageSize: [30, 30],
				// Смещение левого верхнего угла иконки относительно
				// её "ножки" (точки привязки).
				iconImageOffset: [-15, -15]
			});



		myMap.behaviors.disable('scrollZoom');

		myMap.geoObjects
			.add(myPlacemark1);

	});

	// Contacts map END

	// Product pic switch

	$(".product-pic-switch-item").click(function () {

		if (!$(this).hasClass("active")) {

			var curIndex = $(this).prevAll().length;

			$(".product-pic-switch-item").removeClass("active");

			$(this).addClass("active");

			$(".product-pic").hide();

			$(".product-pic").filter(function () {

				return $(this).prevAll().length == curIndex;

			}).fadeIn(200);

		}

	});

	// Product pic switch END

	$(".lang-selector-trigger").click(function () {

		$(this).toggleClass("active");

		$(".lang-selector-dropdown").fadeToggle(150);

	});

	$("body").on("click", function (e) {

		if (!$(e.target).hasClass("lang-selector-trigger") && !$(e.target).parents().hasClass("lang-selector-trigger") && !$(e.target).hasClass("lang-selector-wrapper") && !$(e.target).parents().hasClass("lang-selector-wrapper")) {

			$(".lang-selector-trigger").removeClass("active");

			$(".lang-selector-dropdown").fadeOut(150);

		}


	});

	$("#calcForm").submit(function () {
		return false;
	});



	// Forms submit

	$("#callbackForm").submit(function() {
		if ($(this).valid()) {
			var form = $(this);
			$.ajax({
				type: "POST",
				url: "order.php",
				data: {
					subject: "Зенит - Заявка на обратный звонок",
					phone: $("#callback_phone").val()
				}
			}).done(function() {

				formSuccess(form);

			});
			return false;
		}
	});

	$("body").on("click", "#servForm input[type=submit]", function() {
		if ($(this).closest("form").valid()) {
			var form = $(this).closest("form");
			$.ajax({
				type: "POST",
				url: "order.php",
				data: {
					subject: "Зенит - Запрос стоимости услуги",
					phone: $("#serv_phone").val(),
					serv: $(this).closest(".modal").find("h2").html()
				}
			}).done(function() {

				formSuccess(form);

			});
			return false;
		}
	});

	$("#orderForm").submit(function() {
		if ($(this).valid()) {
			var form = $(this);
			$.ajax({
				type: "POST",
				url: "order.php",
				data: {
					subject: "Зенит - Заявка на расчет",
					phone: $("#order_phone").val()
				}
			}).done(function() {

				formSuccess(form);

			});
			return false;
		}
	});

	$("#paintForm").submit(function() {
		if ($(this).valid()) {
			var form = $(this);
			$.ajax({
				type: "POST",
				url: "order.php",
				data: {
					subject: "Зенит - Подбор краски",
					phone: $("#paint_phone").val()
				}
			}).done(function() {

				formSuccess(form);

			});
			return false;
		}
	});

	$("#estimateForm").submit(function() {
		if ($(this).valid()) {
			var form = $(this);
			$.ajax({
				type: "POST",
				url: "order.php",
				data: {
					subject: "Зенит - Заявка на расчет",
					phone: $("#estimate_phone").val()
				}
			}).done(function() {

				formSuccess(form);

			});
			return false;
		}
	});

	$("#calcModalForm").submit(function() {
		if ($(this).valid()) {
			var form = $(this);
			$.ajax({
				type: "POST",
				url: "order.php",
				data: {
					subject: "Зенит - Узнать точную стоимость",
					phone: $("#calc_modal_phone").val(),
					obj: $("#calc_object option:selected").html(),
					prepare: $("#calc_prepare option:selected").html(),
					coating: $("#calc_coating option:selected").html(),
					area: $("#calc_area").val()
				}
			}).done(function() {

				formSuccess(form);

			});
			return false;
		}
	});

	// Forms submit END

	// Area slider

	$(".num-slider").each(function () {

		var numSlider = $(this),
			nSlider = document.getElementById(numSlider.attr("id")),
			numInput = $(numSlider.attr("data-input")),
			rangeMin = numSlider.attr("data-min")*1,
			rangeMax = numSlider.attr("data-max")*1;



		noUiSlider.create(nSlider, {
			start: rangeMin,
			tooltips: true,
			connect: [true, false],
			range: {
				'min': rangeMin,
				'max': rangeMax
			}
		});

		nSlider.noUiSlider.on('update', function (value, handle) {

			numInput.val(numFormat.to(Math.round(value)));

			numSlider.find(".noUi-tooltip").html(numFormat.to(Math.round(value)));


		});

		nSlider.noUiSlider.on('end', function (value, handle) {


			calc();

		});

		numInput.on("input", function () {

			//$(this).val(numFormat.to($(this).val().replace(/\D/g,''))).change();
			nSlider.noUiSlider.set($(this).val().replace(/\s/g, ''));

			calc();


		});



		// fromInput.addEventListener('change', function () {
		// });
		//
		// toInput.addEventListener('change', function () {
		// });



	});

	// Area slider END

	$(".calc-form select").on("changed.bs.select", function () {
		calc();
	});

	initSliders();

	// Header timetable

	// $(".header-timetable-trigger").click(function () {
	//
	// 	$(".header-timetable-popup").fadeToggle(150);
	//
	// 	$(this).toggleClass("active");
	//
	// });
	//
	// $("body").on("click", function (e) {
	//
	// 	if ($(".header-timetable-trigger").hasClass("active") && !$(e.target).hasClass("header-timetable-trigger") && !$(e.target).parents().hasClass("header-timetable-trigger") && !$(e.target).hasClass("header-timetable-popup") && !$(e.target).parents().hasClass("header-timetable-popup") ) {
	//
	// 		$(".header-timetable-popup").fadeOut(150);
	//
	// 		$(".header-timetable-trigger").removeClass("active");
	//
	// 	}
	//
	// });

	// Header timetable END

	// Map popup

	$(".map-pin").click(function () {

		var curPopup = $(this).closest(".map-object").find(".map-popup");
		$(".map-popup").not(curPopup).hide();


		curPopup.fadeIn(150, function () {

		});

		console.log(curPopup.offset().left + curPopup.outerWidth() + " > " + $(window).width())



		if (curPopup.offset().left < 0) {

			curPopup.css({
				marginLeft: - curPopup.offset().left
			});

		} else {

			if (curPopup.offset().left + curPopup.outerWidth() > $(window).width()) {

				curPopup.css({

					marginLeft: - (curPopup.offset().left + curPopup.outerWidth() - $(window).width())

				})

			} else {

				curPopup.css({

					marginLeft: 0

				})

			}


		}

		$(this).toggleClass("active");

	});

	$("body").on("click", function (e) {

		if ($(".map-pin").hasClass("active") && !$(e.target).hasClass("map-pin") && !$(e.target).parents().hasClass("map-pin") && !$(e.target).hasClass("map-popup") && !$(e.target).parents().hasClass("map-popup") ) {

			$(".map-popup").hide().css({
				marginLeft: 0
			});

			$(".map-pin").removeClass("active");

		}

	});

	// Map popup END

	// Modal swipe

	$("body").on("swipeleft", ".profile-modal .side-modal-r", function () {

		var modalContent = $(this).closest(".modal").find(".ajax-modal-content"),
			curModal = $(this).closest(".modal");

		if (!modalContent.hasClass("animating") && curModal.find(".ajax-modal-menu a.active").closest("li").next("li").length) {

			modalContent.addClass("animating");

			TweenMax.to(modalContent, .2, {
				x: -100,
				opacity: 0,
				ease: Linear.easeNone,
				onComplete: function () {

					curModal.find(".ajax-modal-menu a.active").closest("li").next("li").find("a").click();

					TweenMax.fromTo(modalContent, .2, {
						x: 100,
						opacity: 0
					},{
						x: 0,
						opacity: 1,
						ease: Linear.easeNone,
						onComplete: function () {
							modalContent.removeClass("animating")
						}
					});

				}
			});

		}

	});

	$("body").on("swiperight", ".profile-modal .side-modal-r", function () {

		var modalContent = $(this).closest(".modal").find(".ajax-modal-content"),
			curModal = $(this).closest(".modal");

		if (!modalContent.hasClass("animating") && curModal.find(".ajax-modal-menu a.active").closest("li").prev("li").length) {

			modalContent.addClass("animating");

			TweenMax.to(modalContent, .2, {
				x: 100,
				opacity: 0,
				ease: Linear.easeNone,
				onComplete: function () {

					curModal.find(".ajax-modal-menu a.active").closest("li").prev("li").find("a").click();

					TweenMax.fromTo(modalContent, .2, {
						x: -100,
						opacity: 0
					},{
						x: 0,
						opacity: 1,
						ease: Linear.easeNone,
						onComplete: function () {
							modalContent.removeClass("animating")
						}
					});

				}
			});

		}

	});

	// Modal swipe END

	$(".btn-scroll").click(function () {

		$("[href='#directions']").click();

	});

	// Close modal

	$(".modal").click(function (e) {

		if ($(this).find(".who-item").length) {

			if (!$(e.target).hasClass("who-item") && !$(e.target).parents().hasClass("who-item")) {

				$(this).modal("hide");

			}

		} else {

			if (!$(e.target).hasClass("modal-content-wrapper") && !$(e.target).parents().hasClass("modal-content-wrapper")) {

				$(this).modal("hide");

			}

		}


	});

	// Close modal END

	// Ajax modals

	$("[data-toggle='modal'][data-url]").on("click", function () {

		var curModal = $($(this).attr("data-target"));

		curModal.find(".ajax-modal-content").html("").addClass("loading");

		var hashVal = $(this).attr("data-hash");

		setHashVar("modal", hashVal);

		$.ajax({
			url: $(this).attr("data-url"),
			dataType: "html"
		}).done(function(data) {

			curModal.find(".ajax-modal-content").html($(data));

			curModal.find(".ajax-modal-content").removeClass("loading");

			curModal.find(".ajax-modal-menu a").removeClass("active");

			curModal.find(".ajax-modal-menu a[data-hash='" + hashVal + "']").addClass("active");

			initSliders();

			validateForms();

			curModal.on("shown.bs.modal", function () {


			});

			setTimeout(function () {

				scrollToActive();

				$(window).trigger("resize");

			}, 250);

		});

	});

	$(".ajax-modal-menu a").on("click", function () {

		if (!$(this).hasClass("active")) {

			var curModal = $(this).closest(".modal");

			curModal.find(".ajax-modal-content").html("").addClass("loading");

			var hashVal = $(this).attr("data-hash");

			setHashVar("modal", hashVal);

			$.ajax({
				url: $(this).attr("data-url"),
				dataType: "html"
			}).done(function(data) {

				curModal.find(".ajax-modal-content").html($(data));

				curModal.find(".ajax-modal-content").removeClass("loading");

				curModal.find(".ajax-modal-menu a").removeClass("active");

				curModal.find(".ajax-modal-menu a[data-hash='" + hashVal + "']").addClass("active");

				scrollToActive();

				initSliders();

				setTimeout(function () {

					$(window).trigger("resize");

				}, 250);

			});

		}

		return false;

	});

	var hashVars = getHashVars();

	if (hashVars["modal"]) {

		var modalLink = $("[data-toggle='modal'][data-hash='" + hashVars["modal"] + "']");

		modalLink.click();

	}

	$(".modal").on("hidden.bs.modal", function () {

		setHashVar("modal", "");

	});

	// Ajax modals END


	anchorsMenu();

	stickyBlocks();

	// Forward button

	$(".btn-fwd").click(function () {

		$("html, body").animate({

			scrollTop: $(".page-body .section:first-child").offset().top

		}, 1000);

	});

	// Forward button END

	// Poll

	quiz();

	// Poll END

	// FAQ

	$("body").on("click", ".faq-item-ttl", function () {

		if (!$(this).closest(".faq-item").hasClass("active")) {

			var faqItemActive = $(".faq-item.active"),
				faqItemCur = $(this).closest(".faq-item");

			faqItemActive.removeClass("active");
			faqItemActive.find(".faq-item-content").show().slideUp("250");

			faqItemCur.addClass("active");
			faqItemCur.find(".faq-item-content").hide().slideDown("250");

			$(".faq-answer").html(faqItemCur.find(".faq-item-content").html());

		} else {

			var faqItemCur = $(this).closest(".faq-item");

			faqItemCur.removeClass("active");
			faqItemCur.find(".faq-item-content").show().slideUp("250");

		}

	});

	// FAQ END

	// Profile menu

	$("body").on("click", ".profile-menu-ttl", function () {

		if (!$(this).closest(".profile-menu-item").hasClass("active")) {

			$(".profile-slider").slick("slickGoTo", $(this).closest(".profile-menu-item").prevAll().length);

			var profileItemActive = $(".profile-menu-item.active"),
				profileItemCur = $(this).closest(".profile-menu-item");

			profileItemActive.removeClass("active");
			profileItemActive.find(".profile-submenu").show().slideUp("250");

			profileItemCur.addClass("active");
			profileItemCur.find(".profile-submenu").hide().slideDown("250");

			$(".profile-answer").html(profileItemCur.find(".profile-submenu").html());

		} else {

			var profileItemCur = $(this).closest(".profile-menu-item");

			profileItemCur.removeClass("active");
			profileItemCur.find(".profile-submenu").show().slideUp("250");

		}

	});

	// Profile-menu END

	// Show more link

	$("body").on("click", ".show-more", function () {

		var curLink = $(this),
			curUrl = $(this).attr("href"),
			curTarget = $($(this).closest(".show-more-wrapper").parent());

		curLink.addClass("loading");

		$.ajax({
			url: curUrl,
			dataType: "html"
		}).done(function(data) {

			curTarget.append($(data)).removeClass("loading");

			curLink.closest(".show-more-wrapper").remove();;

			if ($(data).find("[data-dates]").length) {

				castFilter(curTarget.closest(".cast-over-wrapper"));

			}

		});

		return false;

	});

	// Show more link END

	childSelects();

	$("select[data-child]").on("change", function () {

		childSelects();

	});

	$(".select-modal-link").on("click", function () {

		var realSelect = $($(this).closest(".select-modal-categories").data("select"));

		realSelect.val($(this).data("value")).selectpicker("refresh");

		$(this).closest(".modal").modal("hide");

		$("[data-target='#" + $(this).closest(".modal").attr("id") + "']").addClass("active");
		$("[data-target='#" + $(this).closest(".modal").attr("id") + "'] span").html(realSelect.find("option:selected").html());

	});

	fixedHeader();

	// Ajax links

	$("body").on("click", ".ajax-link", function () {

		var curLink = $(this),
			curUrl = $(this).data("url"),
			curTarget = $($(this).data("target")),
			curSiblings = $(this).closest(".ajax-links").find(".ajax-link");

		curTarget.addClass("loading");

		$.ajax({
			url: curUrl,
			dataType: "html"
		}).done(function(data) {

			curTarget.html($(data)).removeClass("loading");

			curSiblings.removeClass("active");

			curLink.addClass("active");

			if (curLink.hasClass("location-link")) {

				$(".location-tabs-select").val(curLink.data("index"));

				if ($("#mobile-indicator").css("display") != "block") {

					$(".location-tabs-select").change();

				}

			}

		});

		return false;

	});



	$(".location-tabs-select").on("change", function () {

		if ($("#mobile-indicator").css("display") == "block") {

			$(".location-link[data-index='" + $(this).val() + "']").click();

		}

	});


	// Ajax links END

	// Anchors

	$(".navbar-nav a").click(function() {

		$(".navbar-nav a").removeClass("active");

		var curLink = $(this);

		var anchor = $(this).attr("href").replace("#","");

		var link = $(this);

		if ($("#mobile-indicator").css("display") == "block") {
			var yDiff = 120;
		} else {
			var yDiff = 130;
		}


		$("html,body").animate({
			scrollTop: $("a[name='"+anchor+"']").offset().top - yDiff
		},1000,function () {
			curLink.addClass("active")
		});

		history.pushState(null,null,$(this).attr("href"));

		return false;

	});

	$("body").on("click", ".page-nav li", function() {

		var curLink = $(this);

		var link = $(this);

		if ($("#mobile-indicator").css("display") == "block") {
			var yDiff = -20;
		} else {
			var yDiff = 10;
		}

		$("html,body").animate({
			scrollTop: $(".section[data-index='" + $(this).data("index") + "']").offset().top - yDiff
		},1000,function () {
			//curLink.addClass("active")
		});

	});


	$('.svg-inline').each(function() {
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');
		jQuery.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var $svg = jQuery(data).find('svg');
			// Add replaced image's ID to the new SVG
			if (typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}
			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');
			// Replace image with new SVG
			$img.replaceWith($svg);
		}, 'xml');
	});
	$("[data-fancybox]").fancybox({
		closeClickOutside: true,
		backFocus: false
	});

	// Show more

	$("body").on("click", ".more-link", function () {
		var moreLink = $(this),
			moreUrl = $(this).attr("href");
		if (!moreLink.hasClass("loading")) {
			moreLink.addClass("loading");
			$.ajax({
				url: moreUrl,
				dataType: "html"
			}).done(function(data) {
				moreLink.closest(".more-link-wrapper").before($(data));
				moreLink.closest(".more-link-wrapper").remove();

				if ($(".more-link").closest(".projects-list").length) {

					$(".more-link").closest(".projects-list").find(".project-tmb").css("opacity", "1");

				}

			});
		}
		return false;
	});

	// Show more END

	$(".up-link, .header-logo").click(function() {
		$("html, body").animate({
			scrollTop: 0
		}, 1000);
	});

	// Main menu
	$(".navbar-trigger").click(function() {
		$(this).toggleClass("active");
		$(".navbar-wrapper").fadeToggle(150);
		$("body").toggleClass("menu-open");
	});
	$(".navbar-wrapper .close, .navbar-nav a").click(function() {
		$(".navbar-wrapper").fadeOut(150);
		$("body").removeClass("menu-open");
		$(".navbar-trigger").removeClass("active");
	});

	$(".navbar-wrapper").click(function(e) {
		if ($("#sm-indicator").css("display") == "block" && !$(e.target).hasClass("navbar-wrapper-inner") && !$(e.target).parents().hasClass("navbar-wrapper-inner")) {
			$(".navbar-wrapper").fadeOut(150);
			$("body").removeClass("menu-open");
			$(".navbar-trigger").removeClass("active");
		}
	});

	$("body").on("click", function (e) {

		if ($("#sm-indicator").css("display") != "block") {

			if (!$(e.target).hasClass("navbar-trigger") && !$(e.target).parents().hasClass("navbar-trigger") && !$(e.target).hasClass("navbar-wrapper") && !$(e.target).parents().hasClass("navbar-wrapper") && $(".navbar-trigger").hasClass("active")) {

				$(".navbar-wrapper").fadeOut(150);

				$(".navbar-trigger").removeClass("active");

			}

		}

	});

	// Expandable
	$("body").on("click", ".expandable-trigger", function() {
		var exTrigger = $(this);
		if (!exTrigger.hasClass("active")) {
			exTrigger.closest(".expandable").find(".expandable-content").slideDown(500, function() {
				exTrigger.addClass("active");
				exTrigger.find(".expandable-trigger-text").html(exTrigger.data("collapsetext"));
				exTrigger.closest(".expandable").addClass("open");
			});
		} else {
			exTrigger.closest(".expandable").find(".expandable-content").slideUp(500, function() {
				exTrigger.removeClass("active");
				exTrigger.find(".expandable-trigger-text").html(exTrigger.data("expandtext"));
				exTrigger.closest(".expandable").removeClass("open");
			});
		}

		return false;

	});

	$("input[type=file]").each(function () {

		if ($(this).data("label")) {
			var inputLabel = $(this).data("label");
		} else {
			var inputLabel = "Прикрепить файл";
		}

		$(this).fileinput({
			showUpload: false,
			showPreview: false,
			showCancel: false,
			browseLabel: inputLabel,
			msgPlaceholder: "",
			dropZoneEnabled: false,
			maxFileCount: 1,
			mainClass: "input-group-lg"
		});

	});
	// Numeric input
	$(document).on("input", ".numeric", function() {
		this.value = this.value.replace(/\D/g, '');
	});
	// Fancybox

	// Forms

	$("body").on("mouseup", "li.dropdown-header", function () {
		$(this).toggleClass("active");
		$(this).nextAll("li[data-optgroup='" + $(this).data("optgroup") + "']").fadeToggle(150);
		return false;
	});

	$("select").not(".picker__select--month, .picker__select--year, .rates-nav-select").each(function () {
		if ($(this).attr("multiple")) {
			$(this).selectpicker({
				selectAllText: "Выбрать всё",
				deselectAllText: "Снять выбор",
				noneSelectedText: "",
				selectedTextFormat: "count",
				countSelectedText: function(count) {
					return count + " " + declOfNum(count, ['элемент', 'элемента', 'элементов']);
				}
			});
		} else {
			$(this).selectpicker();
		}
	});

	$("select[multiple]").not(".simple-multi").on("shown.bs.select",function () {
		if (!$(this).prev(".dropdown-menu").find(".dropdown-footer").length) {
			dropdownFooter = '\
      <div class="dropdown-footer">\
      <div class="btn btn-1 btn-ico btn-save">Выбрать</div>\
      <div class="btn btn-cancel">Очистить</div>\
      </div>\
      ';
			$(this).prev(".dropdown-menu").find("ul").append(dropdownFooter);
		}
	});

	$("select").on("show.bs.select", function () {

		$(this).closest(".form-group").find("label.placeholder").addClass("active");

	});

	$("select").on("hide.bs.select", function () {

		if (!$(this).val() || $(this).val() == null) {

			$(this).closest(".form-group").find("label.placeholder").removeClass("active");

		} else {

			$(this).closest(".form-group").find("label.placeholder").addClass("active");

		}



	});

	$("body").on("click",".bootstrap-select .btn-save", function () {
		$(this).closest("div.dropdown-menu").next("select").selectpicker("toggle");
		return false;
	});

	$("body").on("click",".bootstrap-select .btn-cancel", function () {
		$(this).closest("div.dropdown-menu").next("select").selectpicker('deselectAll');
		return false;
	});


	$('.input-numeric').bind('keyup paste', function(){
		this.value = this.value.replace(/[^0-9]/g, '');
	});

	if ($("input:text").length) {
		$("input:text").each(function() {
			if ($(this).val()) {
				$(this).prev(".placeholder").addClass("active");
			}
		});
	}

	if ($("textarea").length) {
		$("textarea").each(function() {
			if ($(this).val()) {
				$(this).prev(".placeholder").addClass("active");
			}
		});
	}

	$("body").on("focus","input, textarea",function() {
		var el = $(this);

		if (el.parent().find(".placeholder").length) {
			var placeholder = el.parent().find(".placeholder");

			placeholder.addClass("active");

		}

	});

	$("body").on("blur","input, textarea",function() {
		var el = $(this);

		if (el.parent().find(".placeholder").length) {
			var placeholder = el.parent().find(".placeholder");

			if (!el.val() || (el.hasClass("input-phone") && ! /^(?=.*[0-9])[- +()0-9]+$/.test(el.val()))) {
				placeholder.removeClass("active");
			}

		}

	});

	$("body").on("click",".placeholder",function(e) {
		if ($(this).parent().find("input").length) {
			$(this).parent().find("input").trigger("focus");
		}
		if ($(this).parent().find("textarea").length) {
			$(this).parent().find("textarea").trigger("focus");
		}
	});

	$("body").on("focus","input[type=text], input[type=email], input[type=password], textarea", function () {
		$(this).closest(".form-item").addClass("focus");
	});

	$("body").on("blur","input[type=text], input[type=email], input[type=password], textarea", function () {
		$(this).closest(".form-item").removeClass("focus")
	});

	validateForms();

	// Forms END


});

function validateForms() {
	$('.textarea-autogrow').autogrow();
	$("input.input-phone").mask("+7 (999) 999-99-99");
	jQuery.validator.addClassRules('phone-email-group', {
		require_from_group: [1, ".phone-email-group"]
	});
	$("select").not(".location-tabs-select").not(".filter-form select").on("change", function() {
		if (!$(this).closest(".picker").length && !$(this).hasClass("faq-select")) {
			$(this).valid();
		}
	});
	$("body").on("click", ".form-item", function(e) {
		if ($(this).find(".bootstrap-select").length && !$(e.target).hasClass("bootstrap-select") && !$(e.target).parents().hasClass("bootstrap-select")) {
			$(e.target).closest(".form-item").find("select").selectpicker('toggle');
		}
	});
	$("form").not("#calcForm").each(function() {
		form = $(this);
		$(this).validate({
			focusInvalid: true,
			sendForm: false,
			errorPlacement: function(error, element) {
				if (element[0].tagName == "SELECT") {
					element.closest(".form-item").addClass("error");
					element.closest(".btn-group").addClass("btn-group-error");
					if (element.closest(".form-item").length) {
						error.insertAfter(element.closest(".form-item"));
					} else {
						error.insertAfter(element.closest(".btn-group"));
					}
				} else {
					if (element.attr("type") == "checkbox") {
						element.siblings("label").addClass("checkbox-label-error")
					} else {
						error.insertAfter(element);
						element.closest(".form-group").addClass("form-group-error");
					}
				}
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).removeClass(errorClass);
				$(element).closest(".form-item").removeClass("error").addClass("valid");
				$(element).closest(".form-group").removeClass("form-group-error");
				if ($(element)[0].tagName == "SELECT") {
					$(element).closest(".form-item").removeClass("error");
					$(element).closest(".btn-group").removeClass("btn-group-error");
					if ($(element).closest(".form-item").length) {
						error.insertAfter(element.closest(".form-item"));
						$(element).closest(".form-item").next("label.error").remove();
					} else {
						$(element).closest(".btn-group").next("label.error").remove();
					}
				} else {
					$(element).next(".error").remove();
					if ($(element).attr("type") == "checkbox") {
						$(element).siblings("label").removeClass("checkbox-label-error")
					}
				}
			},
			invalidHandler: function(form, validatorcalc) {
				var errors = validatorcalc.numberOfInvalids();
				if (errors && validatorcalc.errorList[0].element.tagName == "INPUT") {
					validatorcalc.errorList[0].element.focus();
				}
			},
			submitHandler: function(form) {
				var formData = new FormData(form);
				$.ajax({
					type: "POST",
					url: $(form).attr('action'),
					data: formData,
					processData: false,
					contentType: false,
					success: function () {
						//formSuccess(form);
					}
				});
				return false;
			}
		});
		if ($(this).find("input.password").length && $(this).find("input.password-repeat").length) {
			$(this).find("input.password-repeat").rules('add', {
				equalTo: "#" + form.find("input.password").attr("id")
			});
		}
	});
}
jQuery.extend(jQuery.validator.messages, {
	required: "Не заполнено поле",
	remote: "Please fix this field.",
	email: "Введите правильный e-mail.",
	url: "Please enter a valid URL.",
	date: "Please enter a valid date.",
	dateISO: "Please enter a valid date (ISO).",
	number: "Please enter a valid number.",
	digits: "Please enter only digits.",
	creditcard: "Please enter a valid credit card number.",
	equalTo: "Пароли не совпадают.",
	accept: "Please enter a value with a valid extension.",
	maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
	minlength: jQuery.validator.format("Please enter at least {0} characters."),
	rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
	range: jQuery.validator.format("Please enter a value between {0} and {1}."),
	max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
	min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

function declOfNum(number, titles) {
	cases = [2, 0, 1, 1, 1, 2];
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

function formSuccess(form) {
	form.find(".form-group input, .form-group textarea").val("");
	form.find(".placeholder").show();
	$("#successModal").modal("show");
	if (form.attr("id") != "servForm") {

		form.closest(".modal").modal("hide");

	}
}

(function($) {
	$.fn.autogrow = function() {
		return this.each(function() {
			var textarea = this;
			$(textarea).on("focus keyup input blur", function() {
				$(textarea).css('height', 'auto').css('height', $(textarea)[0].scrollHeight + 2 + 'px');
			});
		});
	};

})(jQuery);

function fixedHeader() {

	var scrollPos = $(window).scrollTop();

	// $("main").css({
	// 	marginTop: $("header").outerHeight()
	// });

	if (scrollPos > 0) {

		if (!$("header").hasClass("header-fixed")) {

			$("header").addClass("header-fixed");

		}


	} else {

		if ($("header").hasClass("header-fixed")) {

			$("header").removeClass("header-fixed");

		}

	}

}

function childSelects() {

	$("select[data-parent]").each(function () {

		var childSelect = $(this),
			parentSelect = $($(this).data("parent"));


		var childContainer = childSelect.closest(".child-select-container");

		if (!parentSelect.val() || parentSelect.val() == "") {

			childSelect.prop("disabled", true).selectpicker("refresh");

			childContainer.hide();

		} else {

			childSelect.prop("disabled", false).selectpicker("refresh");

			childContainer.show();

		}




	});

}

function stickyBlocks() {

	var stickyPic = $(".sticky-pic"),
		stickyStart = $(".sticky-start"),
		stickyStop = $(".sticky-stop"),
		topOffset = 30;

	if (stickyPic.length) {

		$(window).on("resize scroll touchmove", function () {

			var scrollPos = $(window).scrollTop();

			if (scrollPos > stickyStart.offset().top) {

				stickyPic.addClass("fixed");

			} else {

				stickyPic.removeClass("fixed");

			}

			if (scrollPos > (stickyStop.offset().top + stickyStop.outerHeight() - stickyPic.height()) + 0) {

				stickyPic.css({

					marginTop: (stickyStop.offset().top + stickyStop.outerHeight() - stickyPic.height()) - scrollPos + 0

				});

			} else {

				stickyPic.css({
					marginTop: 0
				});

			}

		});

	}


	var stickyElements = $(".sticky-block"),
		topOffset = 30,
		topOffsetProgram = 0;

	$(window).on("resize scroll touchmove", function () {

		stickyElements.each(function () {

			$(this).data("orig-width", $(this).outerWidth());

			$(this).closest(".sticky-wrapper").css({
				minHeight: $(this).outerHeight()
			});


			if ($("header").hasClass("header-fixed")) {

				var headerHeight = $("header").outerHeight();

			} else {

				var headerHeight = 0;

			}

			var el = $(this),
				elHeight = $(this).outerHeight(),
				elWrapper = $(this).closest(".sticky-wrapper"),
				wrapperHeight = elWrapper.outerHeight(),
				scrollPos = $(window).scrollTop();

			if (scrollPos > (elWrapper.offset().top - headerHeight - topOffset) && elHeight < ($(window).height() - topOffset*2 - headerHeight) && elHeight < wrapperHeight) {

				el.addClass("fixed").css({

					top: headerHeight + topOffset,
					width: el.data("orig-width")

				});

				if (scrollPos > (elWrapper.offset().top + wrapperHeight - elHeight - headerHeight - topOffset)) {

					el.css({

						marginTop: (elWrapper.offset().top + wrapperHeight - elHeight - headerHeight - topOffset) - scrollPos

					});

				} else {

					el.css({
						marginTop: 0
					});

				}

			} else {

				el.removeClass("fixed").css({

					width: "auto"

				})

			}



		});

		$(".program-nav").each(function () {

			$(this).data("orig-width", $(this).outerWidth());

			$(this).closest(".page-wrapper").css({
				minHeight: $(this).outerHeight()
			});


			if ($("header").hasClass("header-fixed")) {

				var headerHeight = $("header").outerHeight();

			} else {

				var headerHeight = 0;

			}

			var el = $(this),
				elHeight = $(this).outerHeight(),
				elWrapper = $(this).closest(".page-wrapper"),
				wrapperHeight = elWrapper.outerHeight(),
				scrollPos = $(window).scrollTop();

			if (scrollPos > (elWrapper.offset().top - headerHeight - topOffsetProgram) && elHeight < ($(window).height() - topOffsetProgram*2 - headerHeight) && elHeight < wrapperHeight) {

				$(".program-nav-wrapper").css({
					paddingTop: el.outerHeight()
				});

				el.addClass("fixed").css({

					top: headerHeight + topOffsetProgram,
					width: el.data("orig-width")

				});


				if (scrollPos > (elWrapper.offset().top + wrapperHeight - elHeight - headerHeight - topOffsetProgram)) {

					el.css({

						marginTop: (elWrapper.offset().top + wrapperHeight - elHeight - headerHeight - topOffsetProgram) - scrollPos

					});

				} else {

					el.css({
						marginTop: 0
					});

				}

			} else {

				$(".program-nav-wrapper").css({
					paddingTop: 0
				});

				el.removeClass("fixed").css({

					width: "auto"

				});

			}



		});

	});

}

function anchorsMenu() {

	$(".anchors-menu a, a[href='#quiz']").click(function () {

		var curLink = $(this);

		if ($("header").hasClass("header-fixed")) {

			var headerHeight = $("header").outerHeight() + 20;

		} else {

			var headerHeight = $("header").outerHeight() + 20;

		}

		if ($("a[name='" + curLink.attr("href").replace("#","") + "']").length) {

			$("html, body").animate({

				scrollTop: $("a[name='" + curLink.attr("href").replace("#","") + "']").offset().top - headerHeight

			},1000);

		}

	});

}

function quiz() {

	// $(".poll-step-slider").slick({
	// 	fade: true,
	// 	swipe: false,
	// 	arrows: false,
	// 	rows: 0
	// });

	// $(".poll-form-step input[type=radio]").change(function () {
	//
	// 	if ($(this).is(":checked")) {
	//
	// 		$(this).closest(".poll-form-step").find(".poll-step-slider").slick("slickGoTo", $(this).closest(".form-radio").prevAll().length)
	//
	// 	}
	//
	// });

	$(".poll-form [type=submit]").attr("disabled", true);

	$(".form-checkboxes-required input[type=checkbox]").each(function () {

		if (!$(this).closest(".form-checkboxes-required").find(":checked").length) {

			$(this).closest(".form-checkboxes-required").addClass("error");

		} else {

			$(this).closest(".form-checkboxes-required").removeClass("error");

		}

	});

	$(".form-checkboxes-required input[type=checkbox]").change(function () {

		if (!$(this).closest(".form-checkboxes-required").find(":checked").length) {

			$(this).closest(".form-checkboxes-required").addClass("error");

		} else {

			$(this).closest(".form-checkboxes-required").removeClass("error");

		}

	});

	setActiveSteps();

	var pollFormSteps = $(".poll-form-step");

	var btnBack = $(".poll-form-nav .btn-back");
	var btnFwd = $(".poll-form-nav .btn-forward");
	var btnSubmit = $(".poll-form [type=submit]");

	pollFormSteps.hide();

	pollFormSteps.first().addClass("current").show();

	btnFwd.click(function () {

		if ($(".poll-form-step.current").find("input").length) {
			$(".poll-form-step.current").find("input").valid();
		}

		if ($(".poll-form-step.current").find("textarea").length) {
			$(".poll-form-step.current").find("textarea").valid();
		}


		if ($(".poll-form-step.current").nextAll(".active").length == 1) {

			// btnFwd.hide();
			// btnSubmit.show();

		}

		if ($(".poll-form-step.current").nextAll(".active").length && !$(".poll-form-step.current .error").length) {

			var curStep = $(".poll-form-step.current");

			curStep.removeClass("current").hide();

			curStep.nextAll(".active").first().fadeIn(500).addClass("current");

			if ($(".poll-form-step.current [type=submit]").length) {

				$(".poll-form-step.current [type=submit]").attr("disabled", false);

			}

			$(".poll-wrapper .btn-back").attr("disabled",false);

			quizDots();

		}


	});

	btnBack.click(function () {

		if ($(".poll-form-step.current").prevAll(".active").length) {

			if ($(".poll-form-step.current").prevAll(".active").length == 1) {

				$(".poll-wrapper .btn-back").attr("disabled",true);

			}

			var curStep = $(".poll-form-step.current");

			curStep.removeClass("current").hide();

			curStep.prevAll(".active").first().fadeIn(500).addClass("current");

			// btnFwd.show();
			// btnSubmit.hide();

			quizDots();

		}

	});

	$(".form-group-other input").focus(function () {

		if (!$(this).closest(".form-radio-text").find(".form-radio input").is(":checked")) {

			$(this).closest(".form-radio-text").find(".form-radio input").click().change();

		}


	});

	$(".poll-form input[type=checkbox], .poll-form input[type=radio]").change(function () {

		setActiveSteps();

		// if ($(this).closest(".form-radio").next(".form-group-other").length) {
		//
		// 	if ($(this).is(":checked")) {
		// 		$(this).closest(".form-radio").next(".form-group-other").fadeIn(250);
		// 	} else {
		// 		$(this).closest(".form-radio").next(".form-group-other").fadeOut(250);
		// 	}
		//
		// }

	});

	$("#pollForm").submit(function() {
		if ($(this).valid()) {
			var form = $(this);

			var quizResult = '';

			$(".poll-form-step.active").not(".last").find(".poll-question").each(function () {

				var stepTitle = "<h4>" + $(this).find(".h3").html() + "</h4>";

				var stepValue = '';

				$(this).find("input[type=checkbox], input[type=radio]").each(function () {

					if ($(this).is(":checked")) {

						stepValue += '<div>' + $(this).next("label").html() + '</div>';

						if ($(this).closest(".form-radio-text").length) {
							stepValue += '<div>' + $(this).closest(".form-radio-text").find("input[type=text]").val() + '</div>';
						}

					}

				});

				if (!$(this).find("input[type=checkbox], input[type=radio]").length) {

					if ($(this).find("input[type=text]").length) {

						stepValue += '<div>' + $(this).find("input[type=text]").val() + '</div>';

					}

					if ($(this).find("textarea").length) {

						stepValue += '<div>' + $(this).find("textarea").val() + '</div>';

					}

				}

				quizResult += stepTitle + stepValue;

			});

			var dataForm = $(this).serializeArray(); // convert form to array
			dataForm.push({name: 'subject', value: "Цифровой акселератор - результат квиза"});
			dataForm.push({name: 'email', value: $("#poll_email").val()});
			dataForm.push({name: 'name', value: $("#poll_company_name").val()});
			dataForm.push({name: 'company', value: $("#poll_company").val()});
			dataForm.push({name: 'phone', value: $("#poll_phone").val()});
			dataForm.push({name: 'quizresult', value: quizResult});

			$.ajax({
				type: "POST",
				url: baseUrl + "quiz.php",
				data: $.param(dataForm)
			}).done(function() {

				formSuccess(form);

			});
			return false;
		}
	});

}

function quizDots() {

	var curIndex = $(".poll-form-step.current").prevAll(".active").length;

	$("ul.poll-dots li").removeClass("active");

	$("ul.poll-dots li").filter(function () {

		return $(this).prevAll().length == curIndex;

	}).addClass("active");

}

function setActiveSteps() {

	$(".poll-form-step").each(function () {


		var quizStep = $(this);

		if (!quizStep.data("parent") || $("#" + quizStep.data("parent")).is(":checked")) {

			quizStep.addClass("active");

		} else {

			quizStep.removeClass("active");

		}

	});

}

function getHashVars() {

	var hashString = window.location.hash;

	hashString = hashString.replace("#", "");

	var hashArray = hashString.split("&");

	var hashVars = new Array();


	for (var i in hashArray) {

		hashVar = hashArray[i].split("=");

		hashVars[hashVar[0]] = hashVar[1];

	}

	return hashVars;

}

function setHashVar(name, val) {

	var hVars = getHashVars();

	if (val) {

		hVars[name] = val;

	} else if (hVars[name]) {

		delete hVars[name];
		delete hVars[name];

	}


	history.pushState('', document.title, window.location.pathname);

	var hashString = "#";

	for (var key in hVars) {

		if (key) {

			hashString += key + "=" + hVars[key] + "&";

		}


	}

	history.pushState({}, null, hashString.substring(0, hashString.length - 1));

}

function initSliders() {

	$(".slider-countable").each(function () {

		$(this).on("init", function () {

			if (!$(this).closest(".slider-wrapper").find(".slider-count").length) {

				var curSlider = $(this),
					visibleSlides = $(this).find(".slick-slide.slick-active").length,
					curSlide = $(this).find(".slick-slide.slick-current").data("slick-index") / visibleSlides + 1,
					totalSlides = Math.round($(this).find(".slick-slide").not(".slick-cloned").length / visibleSlides);

				curSlider.closest(".slider-wrapper").append('<div class="slider-count"><span class="slider-count-cur">' + curSlide + '</span><span class="slider-count-sep">/</span><span class="slider-count-total">' + totalSlides + '</span></div>');

				if (totalSlides == 1) {

					curSlider.closest(".slider-wrapper").find(".slider-count").hide();

				}

			}

		});

		$(this).on("beforeChange", function(event, slick, currentSlide, nextSlide){

			var curSlider = $(this),
				visibleSlides = $(this).find(".slick-slide.slick-active").length,
				curSlide = nextSlide / visibleSlides + 1,
				totalSlides = $(this).find(".slick-slide").not(".slick-cloned").length / visibleSlides;

			curSlider.closest(".slider-wrapper").find(".slider-count-cur").html(curSlide);

			// curSlider.closest(".slider-wrapper").find(".slider-count-progress-bar").css({
			// 	width: curSlide*100/totalSlides + "%"
			// });

		});

	});

	$(".photo-slider").on("init afterChange", function () {

		photoSlider($(this));

	});

	$(".photo-slider").each(function () {

		if (!$(this).hasClass("slick-initialized")) {

			$(this).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				fade: true,
				dots: false,
				rows: 0,
				adaptiveHeight: true,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							arrows: false,
							dots: true,
							fade: false
						}
					}
				]
			});

		}

	});

	$(".product-slider").each(function () {

		if (!$(this).hasClass("slick-initialized")) {

			$(this).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				fade: true,
				dots: true,
				rows: 0,
				adaptiveHeight: true,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							fade: false
						}
					}
				]
			});

		}

	});

	$(".catalog-slider").each(function () {

		if (!$(this).hasClass("slick-initialized")) {

			$(this).slick({
				slidesToShow: 3,
				slidesToScroll: 3,
				dots: false,
				rows: 0,
				adaptiveHeight: true,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							dots: true
						}
					}
				]
			});

		}

	});

	$(".reviews-slider").each(function () {

		if (!$(this).hasClass("slick-initialized")) {

			$(this).slick({
				slidesToShow: 6,
				slidesToScroll: 6,
				fade: false,
				dots: false,
				rows: 0,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 5,
							slidesToScroll: 5
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					}
				]
			});

		}

	});

	$(".profile-slider").each(function () {

		if (!$(this).hasClass("slick-initialized")) {

			$(this).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				fade: true,
				dots: false,
				rows: 0,
				arrows: false,
				swipe: false
			});

		}

	});

	$(".brands-slider").each(function () {

		if (!$(this).hasClass("slick-initialized")) {

			$(this).slick({
				slidesToShow: 3,
				slidesToScroll: 3,
				dots: false,
				rows: 0,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					}
				]
			});

		}

	});

	$(".clients-slider").each(function () {

		if (!$(this).hasClass("slick-initialized")) {

			$(this).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,
				rows: 0,
				fade: true
			});

		}

	});



	$(".projects-slider").each(function () {

		if (!$(this).hasClass("slick-initialized")) {

			$(this).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,
				rows: 0,
				speed: 500,
				infinite: false
			});

		}

	});

}

function scrollToActive() {

	if ($("#mobile-indicator").css("display") == "block") {

		$(".modal.show .ajax-modal-menu-wrapper").stop().animate({
			scrollLeft: $(".modal.show .ajax-modal-menu a.active").closest("li").offset().left + $(".modal.show .ajax-modal-menu-wrapper").scrollLeft() - 15
		}, 200);

	}

}

function calc() {

	if ($("#calc_object").val() && $("#calc_prepare").val() && $("#calc_coating").val()) {

		var areaVal = $("#calc_area").val().replace(/\s/g, '');

		if (areaVal < 5000) {

			var areaIndex = 0;

		}

		if (areaVal >= 5000) {

			var areaIndex = 1;

		}

		if (areaVal >= 10000) {

			var areaIndex = 2;

		}

		if (areaVal >= 20000) {

			var areaIndex = 3;

		}

		if (areaVal >= 50000) {

			var areaIndex = 4;

		}


		var prepareArr = $("#calc_prepare option:selected").attr("data-prices").split(",");
		var coatingArr = $("#calc_coating option:selected").attr("data-prices").split(",");


		var meterPrice = prepareArr[areaIndex]*1 + coatingArr[areaIndex]*1;
		console.log(meterPrice)
		var totalPrice = meterPrice * $("#calc_area").val().replace(/\s/g, '');

		$(".calc-meter-price .num").html(numFormat.to(meterPrice));
		$(".calc-total-price .num").html(numFormat.to(totalPrice));

		$(".calc-result-button .btn").removeClass("disabled");

		//$(".calc-result").fadeIn(250);

	} else {

		//$(".calc-result").fadeOut(250);

	}

}

function  fixedPopupMenu() {


	if ($(".ajax-modal-menu-wrapper").height() <= $(window).height()) {

		$(".ajax-modal-menu-wrapper").css({
			marginTop: $(".serv-modal").scrollTop()
		})

	} else {

		$(".ajax-modal-menu-wrapper").css({
			marginTop: 0
		})

	}

}

function photoSlider(slider) {

	slider.closest(".photo-slider-over-wrapper").children(".photo-slider-caption").remove();

	slider.closest(".photo-slider-over-wrapper").append(slider.find(".slick-current .photo-slider-caption").clone());

	slider.append()

	// slider.css({
	// 	marginBottom: slider.find(".slick-current .photo-slider-caption").outerHeight()
	// });


}