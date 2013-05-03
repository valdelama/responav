$.fn.responav = function(options) {

	var settings = $.extend({
		breakpoint : 720,
		trigger : true
	}, options);

	var menu = $(this);
	var hasTrigger = false;

	$(window).on('resize.responav', function () {
		var browserWidth = $(window).width();
		if (browserWidth < settings.breakpoint) {
			$('body').addClass('responav-active');
			menu.addClass('responav-menu');
			if (!hasTrigger && settings.trigger) {
				$('.responav-inner').prepend('<button class="responav-trigger" id="responav-trigger"></button>');
				hasTrigger = true;
			}
		} else {
			$('body').removeClass('responav-active');
			menu.removeClass('responav-menu');
			if (hasTrigger) {
				$('#responav-trigger').remove();
				hasTrigger = false;
			}
		}
	}).trigger('resize');

	$(document).on('click.responav touchstart.responav', '#responav-trigger', function(event) {
		$('body').toggleClass('responav-open');
		$(document).one(event.type, function() {
			$('body').removeClass('responav-open');
		});
		return false;
	});

	menu.on("click.responav touchstart.responav", function(e) {
		e.stopPropagation();
	});

	return this;
};