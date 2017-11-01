var $ = jQuery;

function instantiateRemove () {
	$('.js-Remove').each(function () {
		console.log($(this));
		$(this).on('click', function (e) {
			e.preventDefault();
			if ($(this).parent().parent().hasClass('temp')) {
				$(this).parent().parent().remove();
			} else {
				$(this).parent().remove();
			}
		});
	});
};
instantiateRemove();

$('.js-AddSlide').on('click', function (e) {
	e.preventDefault();
	var textEl = document.createElement('div');
	var textBox = '/editor/fragment/verticalslide';
	$(textEl).load(textBox, function () {
		$(textEl).appendTo('.js-ContentDynamic');
		instantiateRemove();
	});
});
