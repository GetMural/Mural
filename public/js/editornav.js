var $ = jQuery;
// handle nav change event
document.addEventListener('DOMContentLoaded', function () {

	$('.js-Nav a').on('click', function (e) {
		var link = $(this).attr('href');

		e.preventDefault();
		e.stopPropagation();

		$('#item-editor').load(link);
	});

    var el = document.getElementById('sortable-items');
    var sortableItems = Sortable.create(el, {
        onUpdate: function (e) {
            // TODO: send new ordered list of items to the server to be saved
            console.log('Items have been updated', e.to);
        }
    });

});
