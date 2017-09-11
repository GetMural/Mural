var $ = jQuery;
// handle nav change event
$('.js-nav').on('change', function () {
	var target = $(this).find(':selected');
	var link = target.attr('value');
	var bodyElement = document.getElementsByClassName('js-Load');
	$(bodyElement).load(link);
});
